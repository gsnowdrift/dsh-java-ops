package javaops.probe;

import java.util.Locale;

import org.springframework.context.ApplicationEvent;
import org.springframework.context.ApplicationListener;

/**
 * Prints a marker line when the Spring Boot application really starts serving, and when it
 * fails, so the launcher knows the exact moment instead of guessing from log patterns.
 *
 * Registered through META-INF/spring.factories, which SpringApplication loads before the context
 * exists, so this listener sees every lifecycle event. Compiled against spring-context 5.3 for the
 * interface only: the type is binary compatible with 4.x through 6.x, and nothing else from Spring
 * is referenced - the event classes and the web server are read through reflection.
 */
public final class StartupListener implements ApplicationListener<ApplicationEvent> {

    private static final String READY = "org.springframework.boot.context.event.ApplicationReadyEvent";
    private static final String FAILED = "org.springframework.boot.context.event.ApplicationFailedEvent";
    private static final String PREFIX = "[java-ops-probe]";

    // the failure event can arrive from several contexts; the first one carries the cause
    private static volatile boolean failedReported;

    @Override
    public void onApplicationEvent(ApplicationEvent event) {
        String type = event.getClass().getName();
        if (FAILED.equals(type)) {
            if (!failedReported) {
                failedReported = true;
                emit("failed " + reason(event));
            }
            return;
        }
        // servlet and reactive apps publish subclasses, so match on the suffix
        if (type.endsWith("WebServerInitializedEvent")) {
            int port = webServerPort(event);
            if (port > 0) emit("listening port=" + port);
            return;
        }
        if (READY.equals(type)) {
            emit("event ready pid=" + pid() + " ctx=" + contextId(event));
        }
    }

    private static void emit(String message) {
        System.out.println(PREFIX + " " + message);
        System.out.flush();
    }

    /**
     * WebServerInitializedEvent fires once the connector is bound, which is the first moment a
     * request can be answered - exactly what "started" means for the caller. The port is inside
     * the WebServer object, so it is read reflectively to stay version independent.
     */
    private static int webServerPort(ApplicationEvent event) {
        try {
            Object server = event.getClass().getMethod("getWebServer").invoke(event);
            if (server == null) return -1;
            Object port = server.getClass().getMethod("getPort").invoke(server);
            return port instanceof Number ? ((Number) port).intValue() : -1;
        } catch (Throwable ignored) {
            return -1;
        }
    }

    private static String contextId(ApplicationEvent event) {
        try {
            Object context = event.getClass().getMethod("getApplicationContext").invoke(event);
            if (context == null) return "";
            Object id = context.getClass().getMethod("getId").invoke(context);
            return id == null ? "" : String.valueOf(id);
        } catch (Throwable ignored) {
            return "";
        }
    }

    private static String pid() {
        try {
            String name = java.lang.management.ManagementFactory.getRuntimeMXBean().getName();
            int at = name.indexOf('@');
            return at > 0 ? name.substring(0, at) : name;
        } catch (Throwable ignored) {
            return "?";
        }
    }

    private static String reason(ApplicationEvent event) {
        try {
            Object value = event.getClass().getMethod("getException").invoke(event);
            if (value instanceof Throwable) {
                Throwable error = (Throwable) value;
                String message = error.getMessage();
                return error.getClass().getName() + (message == null ? "" : ": " + firstLine(message));
            }
        } catch (Throwable ignored) {
            // the event shape differs between Boot versions; the marker is still useful
        }
        return "unknown";
    }

    private static String firstLine(String text) {
        int cut = text.indexOf('\n');
        String head = cut < 0 ? text : text.substring(0, cut);
        return head.endsWith("\r") ? head.substring(0, head.length() - 1) : head;
    }
}
