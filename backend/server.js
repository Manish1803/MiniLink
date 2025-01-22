const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const app = require("./app");

const PORT = process.env.PORT || 3001;

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");
  } catch (error) {
    console.error("connection error", error);
    process.exit(1);
  }
};
connectDB();

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
