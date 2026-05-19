import mongoose, { Schema, Document } from "mongoose";
import { z } from "zod";

// Zod schemas for validation
export const insertMessageSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  message: z.string().min(1),
});

export type InsertMessage = z.infer<typeof insertMessageSchema>;

// Mongoose schema
const messageSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    message: { type: String, required: true },
  },
  { timestamps: true },
);

// Types
export interface Message extends Document {
  _id: mongoose.Types.ObjectId;
  name: string;
  email: string;
  message: string;
  createdAt: Date;
  updatedAt: Date;
}

// Model
export const MessageModel = mongoose.model<Message>("Message", messageSchema);
