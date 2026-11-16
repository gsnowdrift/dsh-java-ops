package javaops.probe;


import org.springframework.context.ApplicationEvent;
import org.springframework.context.ApplicationListener;

/**
 * Prints a marker line when Spring Boot has finished starting (or has failed), so the launcher
 * knows the moment instead of guessing from log patterns.
 *
 * Registered through META-INF/spring.factories, which SpringApplication loads before the context
 * exists, so this listener sees both ApplicationReadyEvent and ApplicationFailedEvent. Compiled
 * against spring-context 5.3 for the interface only: the type is binary compatible with 4.x
 * through 6.x, and nothing else from Spring is referenced.
 */
public final class StartupListener implements ApplicationListener<ApplicationEvent> {

    private static final String READY = "org.springframework.boot.context.event.ApplicationReadyEvent";
    private static final String FAILED = "org.springframework.boot.context.event.ApplicationFailedEvent";
    private static final String PREFIX = "[java-ops-probe]";

    // the same event reaches us as a SpringApplication listener and as a context listener,
    // and each context publishes its own; dedupe on type + context so a later failure still prints
    private static volatile boolean failedReported;

    @Override
    public void onApplicationEvent(ApplicationEvent event) {
        String type = event.getClass().getName();
        if (!READY.equals(type) && !FAILED.equals(type)) return;
        if (FAILED.equals(type)) {
            // the failure event can arrive from several contexts; the first one carries the cause
            if (!failedReported) {
                failedReported = true;
                emit("failed " + reason(event));
            }
            return;
        }
        if (!servingTraffic(event)) return;
        emit("event ready pid=" + pid() + " ctx=" + contextId(event));
    }

    private static void emit(String message) {
        System.out.println(PREFIX + " " + message);
        System.out.flush();
    }

    /**
     * A Spring Cloud bootstrap context publishes ApplicationReadyEvent seconds before the web
     * server exists. Web contexts therefore only count once their server object is present;
     * contexts that are not web at all (batch jobs) cannot be checked and always count.
     */
    private static boolean servingTraffic(ApplicationEvent event) {
        try {
            Object context = event.getClass().getMethod("getApplicationContext").invoke(event);
            if (context == null) return true;
            java.lang.reflect.Method server = null;
            for (Class<?> type = context.getClass(); type != null && server == null; type = type.getSuperclass()) {
                try {
                    server = type.getMethod("getWebServer");
                } catch (NoSuchMethodException ignored) {
                    // not a servlet web context; keep walking up
                }
            }
            if (server == null) return true;
            return server.invoke(context) != null;
        } catch (Throwable ignored) {
            return true;
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
