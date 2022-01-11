import express from "express";
import path from "path";
import redis from "redis";
import sgMail from "@sendgrid/mail";

import { promisify } from "util";

import { PrismaClient } from ".prisma/client";
import { initializeUserApi } from "./src/endpoints/user";
import { initializeGroupApi } from "./src/endpoints/group/group";
import { initializeCollectionApi } from "./src/endpoints/collection";
import { initializeLibraryApi } from "./src/endpoints/library";
import { initializeAccountApi } from "./src/endpoints/account";

const prisma = new PrismaClient();
const redisClient = redis.createClient();
const redisGet = promisify(redisClient.get).bind(redisClient);
const redisSet = promisify(redisClient.set).bind(redisClient);
const redisDelete = promisify(redisClient.del).bind(redisClient);

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

console.log("sg: ", process.env.SENDGRID_API_KEY);

const app = express();
var cors = require("cors");

require("dotenv").config();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded());
app.use(express.static("public"));

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", process.env.ACCESS_CONTROL_ALLOW_ORIGIN);
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Headers", "Origin,X-Requested-With,Content-Type,Accept,content-type,application/json");
  next();
});

// Serve static files
app.use(express.static(path.join(__dirname, "client/build")));

app.get(`/api`, async (req, res) => {
  res.json({ up: true });
});

redisClient.on('connect', function () {
  console.log('Connected to Redis!');
});

initializeUserApi(app, prisma, redisGet, redisSet, redisDelete, sgMail);
initializeGroupApi(app, prisma, redisGet, redisSet, redisDelete);
initializeCollectionApi(app, prisma);
initializeLibraryApi(app, prisma);
initializeAccountApi(app, prisma, redisGet, redisSet, redisDelete, sgMail);

// Redirect back to index.html if urls do not match
if (process.env.NODE_ENV === 'production') {
  app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, "client/build", "index.html"));
  });
}

const PORT = process.env.PORT || 9000;
const server = app.listen(PORT, () =>
  console.log(
    `🚀 Server ready at: http://localhost:${PORT}\n⭐️ See sample requests: http://pris.ly/e/ts/rest-express#3-using-the-rest-api`
  )
);
