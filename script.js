import express from "express";
import "dotenv/config";
import cors from "cors";
import connectDB from "./config/database.js";
import Item from "./models/item.model.js";

const app = express();
app.use(cors());
app.use(express.json());
const port = process.env.PORT;

// Connect to the db
connectDB();

// Function to add an item
const addItem = async (data) => {
  const { itemNumber, itemName, itemPrice, description, category } = data;
  const newItem = new Item({
    itemNumber,
    itemName,
    itemPrice,
    description,
    category,
  });
  const savedItem = await newItem.save();
  return savedItem;
};

// All the routes

// This is to get a list of items
app.get("/items", async (req, res) => {
  const data = await Item.find({});
  res.send(data);
});

// This is to post a specific item
app.post("/item", async (req, res) => {
  const data = req.body;
  try {
    const savedItem = await addItem(data);
    res.status(201).json(savedItem);
  } catch (error) {
    res.status(500).json({ message: "Server error while creating item." });
    console.error("Error creating item:", error);
  }
});

// This is to post a list of items
app.post("/items", async (req, res) => {
  const listOfItems = req.body;
  try {
    const savedItems = await Promise.all(listOfItems.map(addItem));
    res.status(201).json(savedItems);
  } catch (error) {
    res.status(500).json({ message: "Server error while creating items." });
    console.error("Error creating items:", error);
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
