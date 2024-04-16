FROM maven:3.6-adoptopenjdk-11 AS build

WORKDIR /build

COPY pom.xml .
COPY src src
COPY .mvn .mvn

RUN mvn package -DskipTests

FROM adoptopenjdk:11-jre-hotspot
WORKDIR /app

COPY --from=build /build/target/*.jar backend-1.0.0.RELEASE.jar





ENV SPRING_JACKSON_DATE_FORMAT="MMMM dd yyyy / HH:mm"



ENTRYPOINT ["java", "-jar", "backend-1.0.0.RELEASE.jar"]