const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");
const routes = require("./utils/BikeRoutes");
const bikes = require('./resources/BikeStock');
const path = require("path");
const BikeModel = require("./utils/BikeModels");

// Middleware
const port = process.env.PORT || 5000;
app.use(express.json());
app.use(cors());

 app.use(
  "/pictures",
  express.static(path.join(__dirname, "resources", "pictures"))
 );

// MongoDB Connection
mongoose
 .connect(process.env.MONGODB_LINK)
 .then(() => console.log("MongoDB connected"))
 .catch((err) => console.error(err));


const addBikesToDB = async () => {
 try {
  // Собираем уникальные мотоциклы
  const uniqueBikes = [];

  for (const bike of bikes) {
   const existingBike = await BikeModel.findOne({
    make: bike.make,
    model: bike.model,
    year: bike.year,
   });

   if (!existingBike) {
    uniqueBikes.push(bike); // Добавляем мотоцикл, если его нет в базе
   }
  }

  // Вставляем уникальные мотоциклы в базу данных
  if (uniqueBikes.length > 0) {
   await BikeModel.insertMany(uniqueBikes);
   console.log(`Add ${uniqueBikes.length} new motorcycles.`);
  } else {
   console.log("All motorcycles already exist in the database.");
  }
 } catch (err) {
  console.error("Error when adding data to MongoDB:", err);
 }
};

 // Вставка данных при старте сервера
  addBikesToDB();

app.use(routes);

console.log(bikes);

app.listen(port, () => {
 console.log(`Server running on port ${port}`);
});
