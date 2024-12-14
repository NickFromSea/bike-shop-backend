const BikeModel = require("./BikeModels"); // Импортируем модель мотоцикла


// GET - Получить все мотоциклы
module.exports.getMotorcycles = async (req, res) => {
 try {
  const bikes = await BikeModel.find(); // Получаем все мотоциклы из базы данных
  res.send(bikes); // Отправляем результат в ответ
 } catch (err) {
  res
   .status(500)
   .send({ message: "Ошибка при получении мотоциклов", error: err });
 }
};

//  module.exports.deleteMotorcycles = async (req, res) => {
//   const {make} = req.body;
//   BikeModel.deleteMany({})
//   .then(()=>res.send('deleted all'))
//  };


  exports.markAsSold = (req, res) => {
   const { id } = req.params; // Берем ID из параметра URL
 const { sold } = req.body; // Получаем новое состояние "sold" из запроса
   BikeModel.findByIdAndUpdate(id, { sold }, { new: true })
    .then((updatedBike) => res.json(updatedBike))
    .catch((err) =>
     res.status(400).json({ error: "Error marking bike as sold" })
    );
  };

  exports.updatePrice = (req, res) => {
   const { id } = req.params;
   const { price } = req.body; // Получаем новую цену из запроса

   BikeModel.findByIdAndUpdate(id, { price }, { new: true })
    .then((updatedBike) => res.json(updatedBike)) // Отправляем обновленный объект мотоцикла
    .catch((err) =>
     res.status(400).json({ error: "Error updating bike price", details: err })
    );
  };
