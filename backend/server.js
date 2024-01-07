const dotenv = require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const userRoute = require("./routes/userRoute");
const productRoute = require("./routes/productRoute");
const contactRoute = require("./routes/contactRoute");
const transactionRoute = require("./routes/transactionRoute");
const staffRoute = require("./routes/staffRoute");
const supplierRoute = require("./routes/supplierRoute");
const storeRoute = require("./routes/storeRoute");
const highlyUtilityiIemsetsRoute = require("./routes/highlyUtilityiIemsetsRoute");
const errorHandler = require("./middleWare/errorMiddleware");
const cookieParser = require("cookie-parser");
const path = require("path");
const {uploadUser, uploadProduct} = require("./utils/fileUpload");
const { swaggerUi, swaggerSpec } = require('./swagger'); 

const app = express();

// Set configuration for Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);

// app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.post("/api/upload/users", uploadUser.single("file"), function (req, res) {
  const file = req.file;
  res.status(200).json(file.filename);
});

app.post("/api/upload/products", uploadProduct.single("file"), function (req, res) {
  const file = req.file;
  res.status(200).json(file.filename);
});

// Routes Middleware
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/transactions", transactionRoute);
app.use("/api/staffs", staffRoute);
app.use("/api/stores", storeRoute);
app.use("/api/suppliers", supplierRoute);
app.use("/api/huis", highlyUtilityiIemsetsRoute);
app.use("/api/contactus", contactRoute);

// Routes
app.get("/", (req, res) => {
  res.send("Home Page");
});

// Error Middleware
app.use(errorHandler);
// Connect to DB and start server
const PORT = process.env.PORT || 5000;
mongoose
  .connect( 
    process.env.MONGO_URI 
  // 'mongodb://127.0.0.1/Pinvent-app'
  )
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server Running on port ${PORT}`);
      console.log(`http://localhost:${PORT}/api-docs`);
    });
  })
  .catch((err) => console.log(err));
