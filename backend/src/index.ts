console.clear();
import express, { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import cors from "cors";
import { routes } from "./config/routes";
import { RouteEngine, AppError, Response as AppResponse } from "./core";
import dotenv from "dotenv";
import path from "path";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const routeEngine = new RouteEngine(routes);

app.use((req, res, next) => {
  console.log("path - " + req.path);
  next();
});

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

const frontendPath = path.join(process.cwd(), "../frontend/dist");
// console.log("frontendPath - ", frontendPath);
// app.use(express.static(frontendPath));
app.use("/app", express.static(frontendPath));
app.get("/app/*", (req, res) => {
  res.sendFile(path.join(frontendPath, "index.html"));
});

// app.get("*", (req, res) => {
//   res.sendFile(path.join(frontendPath, "index.html"));
// });

app.get("/health", (req, res) => {
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
