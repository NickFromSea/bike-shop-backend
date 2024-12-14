const express = require("express");
const router = express.Router();
const BikeController = require("./BikeController");
const BikeModel = require("./BikeModels");
 const { Router } = require("express");




// // Получить все мотоциклы
 router.get('/api/bikes/', BikeController.getMotorcycles);

//  router.delete('/deleteMotorcycles', BikeController.deleteMotorcycles);



// Пометка как проданный
 router.put('/api/bikes/:id/sold', BikeController.markAsSold);
 router.put("/api/bikes/:id/price", BikeController.updatePrice);

module.exports = router;
