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
app.use(express.urlencoded({ extended: true }));

const routeEngine = new RouteEngine(routes);

routeEngine
  .initialize()
  .then((router) => {
    app.use("/api", router);

    app.use(
      (err: Error, req: Request, res: Response, next: NextFunction): void => {
        if (err instanceof AppError) {
          res
            .status(err.statusCode)
            .json(AppResponse.error(err.message, err.errors));
        } else {
          console.error(err);
          res.status(500).json(AppResponse.error("Internal server error"));
        }
      }
    );
  })
  .catch((err) => {
    console.error("Error during route initialization:", err);
  });

app.get("/api/health", (req, res) => {
  res.status(200).json({
    status: "UP",
    message: "Server is running successfully",
    timestamp: new Date().toISOString(),
  });
});

app.use((req, res, next) => {
  console.log(`Request Path: ${req.path}`);
  next();
});

// console.log(process.argv);
// console.log(process.argv[1].includes("/node_modules/.bin/jest"));
if (!process.argv[1].includes("/node_modules/.bin/jest")) {
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
}

export { app };
