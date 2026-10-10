FROM gradle:9-jdk21 AS builder

WORKDIR /app

COPY apps/property-market-analysis/market/build.gradle apps/property-market-analysis/market/settings.gradle ./

COPY apps/property-market-analysis/market/src ./src

RUN gradle clean bootJar --no-daemon

FROM eclipse-temurin:21-jre

WORKDIR /app

COPY --from=builder /app/build/libs/*.jar app.jar

EXPOSE 8020

ENTRYPOINT ["java", "-jar", "app.jar"]
