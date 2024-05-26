require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const fileUpload = require("express-fileupload");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const postRoute = require("./routes/post.route");
const authRoute = require("./routes/auth.router");
const errorMiddleware = require("./middlewares/error.middleware");

const app = express();

app.use(
  cors({
    credentials: true,
    origin: process.env.CLIENT_URL,
  })
);
app.use(express.json());
app.use(cookieParser({}));
app.use(express.static("static"));
app.use(fileUpload({}));

app.use("/api/post", postRoute);
app.use("/api/auth", authRoute);

app.use(errorMiddleware);

const PORT = 8000;

const bootstrap = async () => {
  try {
    await mongoose
      .connect(process.env.DB_URL)
      .then(() => console.log("DB connected"));
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  } catch (error) {
    console.log(`Error connecting with DB ${error}`);
  }
};

bootstrap();
