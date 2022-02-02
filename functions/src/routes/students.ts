import express from "express";
import { getClient } from "../db";
import Student from "../models/Students";

const studentRoutes = express.Router();

studentRoutes.get("/students", async (req, res) => {
  //For error handling
  try {
    const client = await getClient();
    const results = await client
      .db()
      .collection<Student>("students")
      .find()
      .toArray();
    console.log(results);
    res.json(results);
  } catch (error) {
    console.error("Error: ", error);
    res.status(500).json({ Message: "Internal Server Error" });
  }
  //once try to catch error move this inside of the try{}.
  // const client = await getClient();
  // const results = await client.db().collection<Student>('students').find().toArray();
  // res.json(results);
});

studentRoutes.post("/students", async (req, res) => {
  const student = req.body as Student;
  try {
    const client = await getClient();
    await client.db().collection<Student>("students").insertOne(student);
    res.status(201).json(student);
  } catch (error) {
    console.error("Error: ", error);
    res.status(500).json({ Message: "Internal Server Error" });
  }
});

export default studentRoutes;
