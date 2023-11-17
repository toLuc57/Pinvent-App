# Sử dụng hình ảnh Node chính thức từ Docker Hub
FROM node:14 as build

# Thiết lập thư mục làm việc trong container
WORKDIR /usr/src/app

# Sao chép package.json và package-lock.json vào thư mục làm việc
COPY frontend/package*.json ./

# Cài đặt dependencies
RUN npm install

# Sao chép toàn bộ nội dung của thư mục frontend vào thư mục làm việc
COPY frontend/ .

# Build ứng dụng React
RUN npm run build

# Tạo một hình ảnh nginx để chứa ứng dụng build
FROM nginx:alpine

# Sao chép các tệp và thư mục build từ build stage trước
COPY --from=build /usr/src/app/build /usr/share/nginx/html

# Mở cổng mà nginx sẽ lắng nghe
EXPOSE 80
