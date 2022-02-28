const mongoose = require("mongoose");

// const connect_to_mongo_server = async () => {
//   try {
//     await mongoose.connect("mongodb://localhost/Shopping-Online", {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//       useCreateIndex: true,
//       useFindAndModify: false,
//     });
//     console.log("MongoDB is connected");
//   } catch (error) {
//     console.log("Server Error");
//   }
// };

const connect_to_mongo_server = async () => {
  try {
    await mongoose.connect(
      process.env.MONGODB_URI || "mongodb://localhost/your-app-name",
      { useNewUrlParser: true, useUnifiedTopology: true }
    );
    console.log("MongoDB is connected");
  } catch (error) {
    console.log("Server Error");
  }
};

module.exports = connect_to_mongo_server;
