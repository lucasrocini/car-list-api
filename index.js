import express from "express";
import winston from "winston";
import marcasRouter from "./routes/marcas.js";
import {promises as fs} from "fs";
//import cors from "cors";
//import swaggerUi from "swagger-ui-express";
//import {swaggerDocument} from "./doc.js"

const {readFile, writeFile} = fs;

global.fileName = "car-list.json";

const {combine, timestamp, label, printf} = winston.format;
const myFormat = printf(({level,message, label, timestamp}) => {
    return `${timestamp} [${label}] ${level}: ${message}`;
});
global.logger = winston.createLogger({
    level: "silly",
    transports: [
        new(winston.transports.Console)(),
        new(winston.transports.File)({filename: "car-list-api.log"}),
    ],
    format: combine(
        label({ label: "car-list-api"}),
        timestamp(),
        myFormat
    )
});

const app = express();
app.use(express.json());
//app.use(cors());
app.use(express.static("public"));
//app.use("/doc", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/marcas", marcasRouter);

app.listen(3000, async () => {
    await readFile("car-list.json");
    logger.info("API Started!");
});
