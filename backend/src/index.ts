console.clear();
import express, { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import cors from "cors";
import { routes } from "./config/routes";
import { RouteEngine, AppError, Response as AppResponse } from "./core";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use((err: Error, req: Request, res: Response, next: NextFunction): void => {
  if (err instanceof AppError) {
    res.status(err.statusCode).json(AppResponse.error(err.message, err.errors));
  } else {
    console.error(err);
    res.status(500).json(AppResponse.error("Internal server error"));
  }
});

const routeEngine = new RouteEngine(routes);

routeEngine.initialize().then((router) => {
  app.use("/api", router);
});

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI || "", {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
    const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });
