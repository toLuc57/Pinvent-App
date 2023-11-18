# Sử dụng hình ảnh Node chính thức từ Docker Hub
FROM node:14 as react

# Thiết lập thư mục làm việc trong container
WORKDIR /usr/src/app

# Sao chép package.json và package-lock.json vào thư mục làm việc
COPY package*.json ./

# Cài đặt dependencies
RUN npm install

# Sao chép toàn bộ nội dung của thư mục frontend vào thư mục làm việc
COPY . .

# Mở cổng mà frontend sẽ chạy
EXPOSE 83

# Khởi chạy ứng dụng frontend
CMD ["npm", "start"]
