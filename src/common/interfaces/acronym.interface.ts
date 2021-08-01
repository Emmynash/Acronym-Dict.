import mongoose from "mongoose";

export interface IAcronym extends mongoose.Document {
  acronym: string;
  definition: string;
}
