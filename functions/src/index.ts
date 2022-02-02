import * as functions from "firebase-functions";
import express from "express";
import cors from "cors";
import studentRoutes from "./routes/students";

//import routes

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

const app = express();
app.use(cors());
app.use(express.json());
//routes
app.use("/", studentRoutes);

//use this command instead of localhost:3000 will allow us to listen/connect to firebase.
export const api = functions.https.onRequest(app);



