# Sử dụng hình ảnh MongoDB chính thức từ Docker Hub
FROM mongo:latest as mongo

# Thiết lập thư mục làm việc trong container
WORKDIR /usr/src/mongo

# MongoDB sẽ lắng nghe trên cổng mặc định (27017)

# ----------------------------------------

# Sử dụng hình ảnh Node chính thức từ Docker Hub
FROM node:14 as express

# Thiết lập thư mục làm việc trong container
WORKDIR /usr/src/app

# Sao chép package.json và package-lock.json vào thư mục làm việc
COPY backend/package*.json ./

# Cài đặt dependencies
RUN npm install

# Sao chép toàn bộ nội dung của thư mục backend vào thư mục làm việc
COPY backend/ .

# Mở cổng mà backend sẽ lắng nghe
EXPOSE 3001

# Khởi chạy ứng dụng backend
CMD ["npm", "start"]
