const { Hotel } = require("../model/Hotel");

// Create Hotel
module.exports.CreateHotel = async (req, res, next) => {
  const newHotel = Hotel(req.body);

  try {
    const savedHotel = await newHotel.save();
    return res.status(200).send(savedHotel);
  } catch (error) {
    return next(error);
  }
};

// Update Hotel
module.exports.UpdateHotel = async (req, res, next) => {
  try {
    const updateHotel = await Hotel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });
    return res.status(200).send(updateHotel);
  } catch (error) {
    return next(error);
  }
};

// Delete Hotel
module.exports.DeleteHotel = async (req, res, next) => {
  try {
    await Hotel.findByIdAndDelete(req.params.id);
    return res.status(200).json({ message: "Hotel has been deleted?" });
  } catch (error) {
    return next(error);
  }
};

// Get Hotel By Id
module.exports.GetHotelById = async (req, res, next) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    return res.status(200).json(hotel);
  } catch (error) {
    return next(error);
  }
};

// Get All Hotel
module.exports.GetHotel = async (req, res, next) => {
  try {
    const hotels = await Hotel.find();
    return res.status(200).json(hotels);
  } catch (error) {
    return next(error);
  }
};
