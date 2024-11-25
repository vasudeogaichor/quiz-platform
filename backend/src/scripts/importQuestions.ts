import mongoose from "mongoose";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import Question from "../models/Question";
import { questions } from "./questions";


const importQuestions = async () => {
  try {
    await mongoose.connect("{{MONGO_URI}}");

    await Question.insertMany(questions);

    console.log("Questions imported successfully!");
    mongoose.connection.close();
  } catch (error) {
    console.error("Error importing questions:", error);
    mongoose.connection.close();
  }
};

importQuestions();
