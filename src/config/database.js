require("dotenv").config();
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const { LOCAL_DB_URI } = process.env;

exports.connect = () => {
  mongoose
    .connect("mongodb://127.0.0.1:27017/restify_blogging_app", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Successfully Connected to MongoDB ❤️ ✨");
    })
    .catch((error) => {
      console.log("database connection failed. exiting now...");
      console.error(error);
      process.exit(1);
    });
};
