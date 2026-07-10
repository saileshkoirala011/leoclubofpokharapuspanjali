import mongoose, { Schema, type Document, type Types } from "mongoose";

export interface IContact extends Document {
  _id:       Types.ObjectId;
  name:      string;
  email:     string;
  subject:   string;
  message:   string;
  ip:        string | null;
  createdAt: Date;
  updatedAt: Date;
}

const contactSchema = new Schema<IContact>(
  {
    name:    { type: String, required: true, trim: true, maxlength: 100 },
    email:   { type: String, required: true, trim: true, lowercase: true,
               match: [/^\S+@\S+\.\S+$/, "Invalid email"] },
    subject: { type: String, required: true, trim: true, maxlength: 200 },
    message: { type: String, required: true, trim: true, minlength: 5, maxlength: 5000 },
    ip:      { type: String, default: null },
  },
  { timestamps: true }
);

contactSchema.index({ createdAt: -1 });

export const Contact = mongoose.model<IContact>("Contact", contactSchema);
