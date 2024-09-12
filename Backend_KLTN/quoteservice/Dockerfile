# Sử dụng Docker Maven image để build ứng dụng
FROM maven:3.8.5-openjdk-11 as builder

# Đặt thư mục làm việc trong container
WORKDIR /app

# Copy file pom.xml và tải về các dependencies trước
COPY pom.xml .
RUN mvn dependency:go-offline

# Copy mã nguồn của dự án vào container
COPY src ./src

# Build project, bỏ qua các bài test để tối ưu thời gian build
RUN mvn clean package -DskipTests

# Sử dụng Docker JDK image để chạy ứng dụng
FROM openjdk:11-jdk-slim

# Đặt thư mục làm việc trong container
WORKDIR /app

# Copy file JAR đã build từ build stage trước
COPY --from=builder /app/target/quoteservice-0.0.1-SNAPSHOT.jar app.jar

# Đặt biến môi trường server port cho ứng dụng Spring Boot
ENV SERVER_PORT=9007

# Expose port của ứng dụng
EXPOSE 9007

# Lệnh để chạy ứng dụng khi container khởi động
ENTRYPOINT ["java", "-jar", "/app.jar"]
