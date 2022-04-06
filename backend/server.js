import path from "path";
import express from "express";
import colors from "colors";
import morgan from "morgan";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import userRoutes from "./routes/userRoutes.js";
import questionRoutes from "./routes/questionRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";

dotenv.config();
connectDB();


const app = express();

// We are only running it in Development but not in Production
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// we need for req.body for parse, allow us to accept json data in the body
app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/questions", questionRoutes);
app.use("/api/upload", uploadRoutes);

const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

app.get("/", (req, res) => {
  res.send("API is running...!!");
});

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5005;

app.listen(
  PORT,
  console.log(
    `Server Running in ${String(process.env.NODE_ENV)} mode on Port ${PORT}`.yellow.bold
  )
);
