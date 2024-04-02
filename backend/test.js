import express from "express";
import { executeQuery } from "./config/queries.js";

const app = express();

app.get("/api/users", async (req, res) => {
  try {
    const sql = "SELECT * FROM books"; // Your raw query
    const users = await executeQuery(sql);
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching users");
  }
});

app.listen(7000, () => {
  console.log("Server running on port 7000");
});
