const { Hotel } = require("../model/Hotel");
const { Room } = require("../model/Room");

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
  const { min, max, ...others } = req.query;
  try {
    const hotels = await Hotel.find({
      ...others,
      cheapestPrice: { $gt: min | 1, $lt: max || 99999 },
    }).limit(req.query.limit);
    res.status(200).json(hotels);
  } catch (err) {
    next(err);
  }
};

// COUNT BY CITY
module.exports.countByCity = async (req, res, next) => {
  const cities = req.query.cities.split(",");
  try {
    const list = await Promise.all(
      cities.map((city) => {
        return Hotel.countDocuments({ city: city });
      })
    );
    res.status(200).json(list);
  } catch (err) {
    next(err);
  }
};

// COUNT BY TYPE
module.exports.countByType = async (req, res, next) => {
  try {
    const hotelCount = await Hotel.countDocuments({ type: "hotel" });
    const apartmentCount = await Hotel.countDocuments({ type: "apartment" });
    const resortCount = await Hotel.countDocuments({ type: "resort" });
    const villaCount = await Hotel.countDocuments({ type: "villa" });
    const cabinCount = await Hotel.countDocuments({ type: "cabin" });

    res.status(200).json([
      { type: "Hotel", count: hotelCount },
      { type: "apartments", count: apartmentCount },
      { type: "resorts", count: resortCount },
      { type: "villas", count: villaCount },
      { type: "cabins", count: cabinCount },
    ]);
  } catch (err) {
    next(err);
  }
};

// GET HOTEL ROOMS
module.exports.getHotelRooms = async (req, res, next) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    const list = await Promise.all(
      hotel.rooms.map((room) => {
        return Room.findById(room);
      })
    );
    res.status(200).json(list);
  } catch (err) {
    next(err);
  }
};
