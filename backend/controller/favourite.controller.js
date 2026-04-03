import FavouriteTable from "../model/favourite.model.js";

// ADD TO FAVOURITE
export const addFavouriteController = async (req, res) => {
  try {
    const userId = req.loggedInUserId;
    const propertyId = req.params.propertyId;

    const exists = await FavouriteTable.findOne({ userId, propertyId });
    if (exists) {
      return res.status(400).send({ message: "Already in favourites" });
    }
    const favourite = await FavouriteTable.create({ userId, propertyId });
    return res.status(201).send({ message: "Added", favourite });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};
// GET MY FAVOURITES
export const getFavouriteController = async (req, res) => {
  try {
    const userId = req.loggedInUserId;

    const favourites = await FavouriteTable.find({ userId });

    return res.status(200).send({
      message: "Favourites fetched",
      favourites,
    });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

export const deleteFavouriteController = async (req, res) => {
  try {
    const userId = req.loggedInUserId;
    const favId = req.params.favId;

    const deleted = await FavouriteTable.findOneAndDelete({
      _id: favId,
      userId,
    });

    if (!deleted) {
      return res.status(404).send({ message: "Favourite does not exist" });
    }

    return res.status(200).send({ message: "Removed from favourites" });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};
