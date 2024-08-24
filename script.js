import express from "express";
import "dotenv/config";
import cors from "cors";

//this will be the backend of kaizen-cart project

const app = express();
app.use(cors());
const port = process.env.PORT;

//
// the database should be in this manner
//
// interface ItemData {
//     itemNumber: number;
//     itemName: string;
//     itemPrice: number;
//     category: string;
//     description: string; }
//

app.post("/item/create", (req, res) => {
  let data = req.body;
  console.log("data " + data);
  res.send(data);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
