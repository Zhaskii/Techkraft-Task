import PropertyTable from "../model/property.model.js";

export const addPropertyController = async (req, res) => {
  const newProperty = req.body;

  await PropertyTable.create({ ...newProperty });

  return res.status(201).send({ message: "Product Added Successfully!" });
};

export const getPropertyConrtoller = async (req, res) => {
  try {
    const properties = await PropertyTable.find();
    return res
      .status(200)
      .send({ message: "Favourites retrieved successfully!", properties });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};
