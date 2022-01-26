const mongoose = require("mongoose")

mongoose
  .connect("mongodb+srv://" + process.env.DB_USER_PASS + "@cluster0.tntou.mongodb.net/mern-project",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('Connected to mongoDb'))
  .catch((err) => console.log("Failed to connect to MongoDb", err))
