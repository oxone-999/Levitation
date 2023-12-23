import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

const app = express();

// Body Parser Middleware
app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ limit: "10mb", extended: false }));

// CORS Middleware
app.use(cors());

// Static Files Middleware
app.use(express.static("public"));

export default app;
