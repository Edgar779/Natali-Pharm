"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios = require('axios');
const cheerio = require('cheerio');
exports.getData = (req, res) => __awaiter(this, void 0, void 0, function* () {
    const url = req.originalUrl;
    let Url = url.slice(1, 50);
    const newUrl = Url.substring(0, Url.lastIndexOf("/"));
    let email;
    let favicon;
    yield axios.get(Url).then((html) => {
        const $ = cheerio.load(html.data);
        const emailRex = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}/;
        $('a,p').each(function (i, e) {
            //I could continue here so that the cycle went still deep
            if (emailRex.test($(e).text()) === true) {
                email = $(e).text();
            }
        });
    }).catch((err) => {
        console.log(err);
    });
    yield axios.get(newUrl + "/favicon.ico")
        .then(function (response) {
        let employee = {
            email: email || "",
            favicon: newUrl + '/favicon.ico' || ""
        };
        res.json(employee);
    })
        .catch(function (error) {
        console.log(error);
        // axios.get('https://s2.googleusercontent.com/s2/favicons?domain_url=' + Url);
        // here we can send a logo anyway
    });
});
//# sourceMappingURL=scraping.js.map