# Stage 1 — build frontend
FROM node:18-alpine AS frontend-build
WORKDIR /app/frontend
COPY colorify-frontend/package*.json ./
RUN npm ci
COPY colorify-frontend/ .
RUN npm run build

# Stage 2 — build backend (uses JDK 21 to match pom.xml)
FROM maven:3.9.4-eclipse-temurin-21 AS backend-build
WORKDIR /app
COPY pom.xml .
# copy backend sources
COPY src ./src
# copy built frontend into backend static resources so Spring Boot serves it
COPY --from=frontend-build /app/frontend/build ./src/main/resources/static
RUN mvn -B -DskipTests package

# Stage 3 — runtime
FROM eclipse-temurin:21-jre AS runtime
WORKDIR /app
COPY --from=backend-build /app/target/*.jar app.jar
ENV JAVA_OPTS=""
EXPOSE 8080
ENTRYPOINT ["sh","-c","java $JAVA_OPTS -jar /app/app.jar"]