import express = require("express");
import * as scrapingController from "./controller/scraping";
const app = express();

app.set("port", process.env.PORT || 3000);

app.post('/https://hexometer.com/contact', scrapingController.getData);
//here I have defined the router as it is alone
export default app;
