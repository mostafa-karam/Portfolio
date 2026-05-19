import { type InsertMessage, type Message, MessageModel } from "@shared/schema";

export interface IStorage {
  createMessage(message: InsertMessage): Promise<Message>;
}

export class DatabaseStorage implements IStorage {
  async createMessage(insertMessage: InsertMessage): Promise<Message> {
    const message = new MessageModel(insertMessage);
    return await message.save();
  }
}

export const storage = new DatabaseStorage();
