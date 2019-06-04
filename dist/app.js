"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const scrapingController = require("./controller/scraping");
const app = express();
app.set("port", process.env.PORT || 3000);
app.post('/https://hexometer.com/contact', scrapingController.getData);
//here I have defined the router as it is alone
exports.default = app;
//# sourceMappingURL=app.js.map