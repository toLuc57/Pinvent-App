# PINVENT-APP

Project: STUDY ON HIGH-UTILITY ITEMSET MINING ALGORITHM, BUILDING A WEB APPLICATION TO MANAGE ITEMS AT A CONVENIENCE STORE. 

Below is an example directory structure and content for the README.md file of my learning project. The goal of this project is learning and practice, so some sections may be adjusted based on my specific requirements.

--

ĐỀ TÀI: TÌM HIỂU THUẬT TOÁN KHAI THÁC TẬP HỮU ÍCH CAO, XÂY DỰNG ỨNG DỤNG WEB QUẢN LÝ CÁC MẶT HÀNG TẠI CỬA HÀNG TIỆN LỢI.

Dưới đây là một ví dụ cấu trúc thư mục mẫu và nội dung cho tệp README.md của project học tập của tôi. Mục tiêu của dự án này là học và thực hành, vì vậy một số phần có thể được điều chỉnh dựa trên yêu cầu cụ thể của tôi.

## Table of contents

1. [PINVENT-APP](#pinvent-app)

    1.1 Project 
    
2. [Prerequisites](#prerequisites)

    2.1. Docker and Docker Compose Requirements

    2.2. Node.js and npm Requirements

    2.3. Check Network Ports

    2.4. Path to the UP-Growth Algorithm

    2.5. Library and Dependency Requirements

    2.6. References and Documentation
    
3. [Sample Directory Structure](#sample-directory-structure)

4. [Installation](#installation)

5. [Usage](#usage)

    5.1 Client (ReactJS)

    5.2 Server (Express and MongoDB)

6. [References](#references)

7. [Author](#author)

8. [License](#license)

## Prerequisites
1. Docker and Docker Compose Requirements:

    Make sure you have Docker and Docker Compose installed before running the project.

2. Node.js and npm Requirements:

    Node.js and npm are required to build and run the ReactJS and Express (NodeJS) Server source code.
    Install Node.js and npm

3. Check Network Ports:

    Ensure that the network ports used in the Docker Compose file (e.g., 3000, 5000, 27017) do not conflict with other services on your machine.

4. Path to the UP-Growth Algorithm:

    If you are using the UP-Growth algorithm by Philippe Fournier-Viger, make sure you have the path to the algorithm's source code in your project.

5. Library and Dependency Requirements:

    Check and ensure that you have installed all the necessary libraries and dependencies for your source code. This can be managed through the package.json files of ReactJS and NodeJS.

6. References and Documentation:

    Provide links to documentation or references that users can consult for more details or problem-solving.
    Based on the specific requirements of the project, you can adjust the prerequisites to reflect your environment. Also, ensure that the prerequisites are described clearly and comprehensibly for your project.

## Sample Directory Structure

The sample directory structure:

```
pinvent-app/
|-- frontend/
|   |-- Dockerfile           # Dockerfile for ReactJS Client
|   |-- package.json
|   |-- package-lock.json
|   |-- public/
|   |-- src/
|   |-- ... other client-related files
|
|-- backend/
|   |-- Dockerfile           # Dockerfile for Express (NodeJS) Server and MongoDB
|   |-- package.json
|   |-- package-lock.json
|   |-- routes/
|   |-- models/
|   |-- ... other server-related files
|
|-- docker-compose.yml       # Docker Compose file
|-- README.md                # README.md file
```

## Installation

Instructions for installing and running the project locally.

```bash
# Clone the repository from GitHub
$ git clone https://github.com/toLuc57/Pinvent-App

# Navigate to the project directory
$ cd Pinvent-App

# Create the .env file
$ touch .env
# Open the .env file with a text editor and add the environment variables:
$ cat .env
MONGO_URI=<your_value>
JWT_SECRET=<your_value>
EMAIL_HOST=<your_value>
EMAIL_USER=<your_value>
EMAIL_PASS=<your_value>
FRONTEND_URL=http://localhost:3000
REACT_APP_BACKEND_URL=http://localhost:5000

# Run Docker Compose to start all services
$ docker-compose up
```

# Usage

Describe how to use my project and how to check if the services are running. Typically, it will be like this, but I do not recommend you to use Docker or Docker Compose. Still, if you are not familiar, then use them:

```bash
# Build and run the services
$ docker-compose up

# Or to run it in daemon mode (background)
$ docker-compose up -d
```

## Client (ReactJS)
Access the ReactJS application at http://localhost:3000

## Server (Express and MongoDB)
Access the Express server at http://localhost:5000


## References
Reference to the UP-Growth algorithm by Philippe Fournier-Viger: [PDF](https://www.philippe-fournier-viger.com/spmf/up-growth.pdf)

## Author

## License

## Điều kiện tiên quyết

1. Yêu cầu Docker và Docker Compose:

    Đảm bảo bạn đã cài đặt Docker và Docker Compose trước khi chạy dự án.

2. Yêu Cầu Node.js và npm:

    Cần có Node.js và npm để xây dựng và chạy mã nguồn ReactJS và Express (NodeJS) Server.
    Cài đặt Node.js và npm

3. Kiểm Tra Cổng Mạng:

    Chắc chắn rằng các cổng mạng sử dụng trong Docker Compose file (ví dụ: 3000, 5000, 27017) không bị xung đột với các dịch vụ khác trên máy của bạn.

4. Đường Dẫn Đến Thuật Toán UP-Growth:

    Nếu bạn đang sử dụng thuật toán UP-Growth của Philippe Fournier-Viger, hãy chắc chắn rằng bạn có đường dẫn đến mã nguồn của thuật toán trong dự án của bạn.

5. Yêu Cầu Thư Viện và Phụ Thuộc:

    Kiểm tra và đảm bảo rằng bạn đã cài đặt tất cả các thư viện và phụ thuộc cần thiết cho mã nguồn của bạn. Điều này có thể được quản lý thông qua các tệp package.json của ReactJS và NodeJS.

6. Tham Khảo và Tài Liệu:

    Cung cấp liên kết đến tài liệu hoặc tham khảo mà bạn có thể tham khảo để biết thêm chi tiết hoặc giải quyết vấn đề.
    Dựa vào yêu cầu cụ thể của dự án, bạn có thể điều chỉnh điều kiện tiên quyết để phản ánh đúng yêu cầu và môi trường của bạn. Đồng thời, đảm bảo rằng điều kiện tiên quyết được mô tả một cách rõ ràng và dễ hiểu cho bạn dự án.

## Cấu trúc thư mục mẫu

```
pinvent-app/
|-- frontend/
|   |-- Dockerfile           # Dockerfile cho ReactJS Client
|   |-- package.json
|   |-- package-lock.json
|   |-- public/
|   |-- src/
|   |-- ... other client-related files
|
|-- backend/
|   |-- Dockerfile           # Dockerfile cho Express (NodeJS) Server và MongoDB
|   |-- package.json
|   |-- package-lock.json
|   |-- routes/
|   |-- models/
|   |-- ... other server-related files
|
|-- docker-compose.yml       # Docker Compose file
|-- README.md                # Tệp README.md

```

## Cài Đặt

Hướng dẫn cài đặt và chạy dự án trên máy cục bộ.

```bash
# Clone repository từ GitHub
$ git clone https://github.com/toLuc57/Pinvent-App

# Di chuyển vào thư mục dự án
$ cd Pinvent-App

# Tạo tệp `.env`
$ touch .env

$ cat .env
MONGO_URI=<giá_trị_của_bạn>
JWT_SECRET=<giá_trị_của_bạn>
EMAIL_HOST=<giá_trị_của_bạn>
EMAIL_USER=<giá_trị_của_bạn>
EMAIL_PASS=<giá_trị_của_bạn>
FRONTEND_URL=http://localhost:3000
REACT_APP_BACKEND_URL=http://localhost:5000

# Chạy Docker Compose để khởi chạy tất cả các dịch vụ
$ docker-compose up
```

## Sử Dụng

Mô tả cách sử dụng dự án của tôi và cách kiểm tra các dịch vụ đã chạy. Thường sẽ vậy, tuy nhiên tôi không khuyến khích bạn sử dụng Docker hay Docker compose, nhưng nếu bạn là người không am hiểu lắm thì sử dụng chúng: 

```bash
# Xây dựng và chạy các dịch vụ
$ docker-compose up

# Hoặc để chạy nó ở chế độ daemon (nền)
$ docker-compose up -d
```

### Client (ReactJS)

Truy cập ứng dụng ReactJS tại http://localhost:3000

### Server (Express và MongoDB)

Truy cập server Express tại http://localhost:5000


## Tham Khảo

Tham khảo thuật toán UP-Growth Philippe Fournier-Viger: [PDF](https://www.philippe-fournier-viger.com/spmf/up-growth.pdf)
