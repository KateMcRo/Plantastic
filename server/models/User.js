import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";

// create our User model
const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 4,
    maxlength: 20,
    trim: true, // Trim leading and trailing white spaces
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+@.+\..+/, "Must match an email address!"],
    trim: true, // Trim leading and trailing white spaces
  },
  password: {
    type: String,
    required: true,
  },
  plants: [
    {
      type: Schema.Types.ObjectId,
      ref: "Plant",
      index: true,
    },
  ],
  plantsWithNotis: [
    {
      type: Schema.Types.ObjectId,
      ref: "Plant",
      index: true,
    },
  ],
});

// set up pre-save middleware to create password
userSchema.pre("save", async function (next) {
  if (this.isNew || this.isModified("password")) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

// compare the incoming password with the hashed password
userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

const User = mongoose.model("User", userSchema);

export default User;
