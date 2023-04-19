import express from "express";
import morgan from "morgan";
import router from "./src/routes/v1/router.js";
import bodyParser from "body-parser";

const app = express();

app.use(bodyParser.json());
app.use(morgan('dev'));

app.use('/api/v1', router);

app.listen(3000, () => console.log("Server is running on localhost:3000"));
