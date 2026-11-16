#!/usr/bin/env bash
# Rebuilds lib/java-ops-probe.jar. The jar is committed, so users never need a JDK for it;
# only run this when probe/src changes.
#
# The compile classpath is spring-context only, for the ApplicationListener interface.
# 5.3 is a Java 8 class file, which keeps --release 8 usable and stays binary compatible
# with the 4.x / 5.x / 6.x runtimes the plugin may meet.
set -euo pipefail
cd "$(dirname "$0")/.."

SPRING_CONTEXT="${SPRING_CONTEXT:-$HOME/.m2/repository/org/springframework/spring-context/5.3.31/spring-context-5.3.31.jar}"
if [ ! -f "$SPRING_CONTEXT" ]; then
  echo "spring-context jar not found: $SPRING_CONTEXT" >&2
  echo "set SPRING_CONTEXT to any spring-context 4.x/5.x jar" >&2
  exit 1
fi

rm -rf probe/build
mkdir -p probe/build
javac --release 8 -Xlint:-options -cp "$SPRING_CONTEXT" -d probe/build \
  probe/src/javaops/probe/StartupListener.java
cp -r probe/src/META-INF probe/build/
jar cf lib/java-ops-probe.jar -C probe/build .
rm -rf probe/build
echo "built lib/java-ops-probe.jar"
