require("express-async-errors");

const cors = require("cors");
const express = require("express");
const http = require("http");
const socketIO = require("socket.io");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const multer = require("multer");
const path = require("path");
const dotenv = require("dotenv");
dotenv.config();

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const connectDB = require("./db/connect.js")
const studentRoutes = require('./routes/studentRoutes');
const courseRoutes = require('./routes/courseRoutes');
const enrollmentRoutes = require('./routes/enrollmentRoutes');
// const userRouter = require("./routes/userroutes.js");



// Middleware
// const notFoundMiddleware = require("./middleware/not-found.js");
// const errorHandlerMiddleware = require("./middleware/error-handler.js");




const views = path.join(__dirname, 'view');

app.get('/', (req, res) => {
  res.sendFile(`${views}/index.html`);
})
app.use(cors());
app.use(morgan("tiny"));
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(express.static("views"));

app.use(cookieParser(process.env.JWT_SECRET));

app.use('/api/students', studentRoutes);

app.use('/api/courses', courseRoutes);
app.use('/api/enrollments', enrollmentRoutes);
// app.use("/api/v1/users", userRouter);



// app.use(notFoundMiddleware);
// app.use(errorHandlerMiddleware);

const port = process.env.PORT || 7000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO);
    server.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
