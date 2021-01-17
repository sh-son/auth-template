import 'dotenv/config'

import "reflect-metadata";
import { createConnection } from "typeorm";
import express from "express";
import helmet from "helmet";
import cors from "cors";
import routes from "./routes";
import morgan from "morgan";
import { stream } from "./config/winston";
import errorHandler from "strong-error-handler";

const port = process.env.PORT || 3000;

const app = express();
app.use(morgan("combined", { stream }));
app.use(cors());
app.use(helmet());
app.use(express.json({limit: '100kb'}));
app.use(express.urlencoded({ extended: true }));
app.use("/", routes);

app.listen(port, () => {
    createConnection()
    .then(async connection => {
        console.log(connection);
    });
})

app.use(errorHandler({
    debug: process.env.NODE_ENV === 'development',
    log: true
}));

