import { Request, Response } from "express";
import { request } from "https";

const axios = require('axios');

const cheerio = require('cheerio');

export let getData = async (req: Request, res: Response) => {
    const url: string = req.originalUrl;
    let Url = url.slice(1, 50);
    const newUrl = Url.substring(0, Url.lastIndexOf("/"))

    let email: string;
    let favicon: string;
    
    interface data {
        email: String,
        favicon: String
    }

    await axios.get(Url).then((html: any) => {

        const $ = cheerio.load(html.data);

        const emailRex = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}/

        $('a,p').each(function (i: number, e: string) {
            //I could continue here so that the cycle went still deep
            if (emailRex.test($(e).text()) === true) {
                email = $(e).text();
            }
        })
    }).catch((err: string) => {
        console.log(err);
    })

    await axios.get(newUrl + "/favicon.ico")
        .then(function (response: string) {
            let employee: data = {
                email: email || "",
                favicon: newUrl + '/favicon.ico' || ""
            }
            res.json(employee);
        })
        .catch(function (error: string) {
            console.log(error);
            // axios.get('https://s2.googleusercontent.com/s2/favicons?domain_url=' + Url);
            // here we can send a logo anyway
        })
}