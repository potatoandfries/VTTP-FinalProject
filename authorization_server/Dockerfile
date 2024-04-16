FROM maven:3.6-adoptopenjdk-11 AS build

WORKDIR /app

COPY pom.xml .
COPY src src
COPY target target

RUN mvn package -Dmaven.test.skip=true

FROM adoptopenjdk:11-jre-hotspot

WORKDIR /app

COPY --from=build /app/target/server-0.0.1-SNAPSHOT.jar app.jar

ENTRYPOINT java -jar app.jar