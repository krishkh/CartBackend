import express from "express";
import "dotenv/config";
import cors from "cors";
import connectDB from "./config/database.js";
import Item from "./models/item.model.js";
import { z } from "zod";

const app = express();
app.use(cors());
app.use(express.json());

const port = process.env.PORT;
const itemZod = z.object({
  itemNumber: z.number(),
  itemName: z.string(),
  itemPrice: z.number(),
  description: z.string(),
  category: z.string(),
});

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
app.get("/items", async (req, res, next) => {
  try {
    const data = await Item.find({});
    res.send(data);
  } catch (error) {
    next(error); // Pass the error to the error-handling middleware
  }
});

// This is to post a specific item
app.post("/item", async (req, res, next) => {
  const data = req.body;
  const response = itemZod.safeParse(data);
  if (!response.success) {
    return res.status(400).json(response.error);
  }
  try {
    const savedItem = await addItem(data);
    res.status(201).json(savedItem);
  } catch (error) {
    next(error); // Pass the error to the error-handling middleware
  }
});

// This is to post a list of items
app.post("/items", async (req, res, next) => {
  const listOfItems = req.body;

  // Validate each item in the list
  const response = z.array(itemZod).safeParse(item);
  if (!response.success) {
    return res.status(400).json(response.error);
  }

  try {
    const savedItems = await Promise.all(listOfItems.map(addItem));
    res.status(201).json(savedItems);
  } catch (error) {
    next(error); // Pass the error to the error-handling middleware
  }
});

// Global Error-Handling Middleware
app.use((err, req, res, next) => {
  console.error("An error occurred:", err);
  if (!res.headersSent) {
    res.status(500).json({ message: "Internal Server Error" });
  } else {
    next(err);
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
