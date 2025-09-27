import express from "express";
import router from "./routes/appRoutes";

export const app = express();
app.use(express.json());
app.use(router);
