// import * as bcrypt from 'bcrypt';
import { sendVerificationCodeViaSMS } from "../../services/sms-sender";
import Users from "../../models/Users";
import { string, any, array } from "joi";
import * as jwt from "jsonwebtoken";
// import { IUser } from '../../schemas/user/model';
// import UserSchema   from '../../schemas/user';
// import { ILoginBody, ISendSmsBody, IVerifyBody, IChangePasswordBody } from './model';
import { getResponse, IResponseModel, getErrorResponse } from '../mainModels';
// import {checktoken} from '../jwtValidation';
import mainConfig from '../../env';
import Category from "../../models/Category";
import { posix } from "path";

class HomeServices {

    public addCategory = async (img: any, name: string, ) => {
        const category = new Category({ img: img.filename, name: name, position: 1 })
        category.save();
        // if (img.mimetype === "image/png" ||
        //     img.mimetype === "image/jpg" ||
        //     img.mimetype === "image/jpeg") {
        //     Category.find({}).exec((err: any, res: any) => {

        //         var inc;

        //         for (let i = 0; i < res.length; i++) {
        //             inc = res[i].position;
        //         }

        //         const category = new Category({ img: img.filename, name: name, position: inc + 1 })
        //         category.save();
        //     })
        //     return getResponse(true, "image added")
        // }
        // else {
        //     return getResponse(false, "incorrect image");

        // }
    }
    public getCategory = async () => {
        const getCategory = Category.find({});
        return getCategory;
    }
    // public putCategory = async (name: string) => {
    // const getCategory = Category.findOne({name: name});
    // return getCategory;
    // }
    public sortCategory = async (start: number, end: number) => {
        // const newArr = new Category({name: })
        let res = await Category.find({})
        const arr = res;
        arr.splice(end - 1, 0, arr.splice(start - 1, 1)[0]);
        await Category.deleteMany({});
        await Category.insertMany(arr).then((res) => {
            console.log(res);
        });
        // for(let i = 0; i < res.length; i++){
        //     res[i].sa
        // }
        // const arr = [];
        // arr.push(res);
        // console.log(res);
        // const resUpdate = Category.deleteMany({});
        // console.log();
        // for(let i = 0; i < res.length; i++){
        // res[i].save();
        // }
        // console.log(res);
        // const arr = res;
        // const resUpdate = Category.deleteMany({});
        // resUpdate.exec((err: any, res: any) => {
        // for(let i = 0; i < res.length; i++){
        // const addNewCategorie = new Category({name: res[i].name, img: res[0][i].img, position: res[i].position});
        // addNewCategorie.save();
        // }
        // const addNewCategories = new Category({ res });
        // addNewCategories.save();
        // })

        // console.log();
        return getResponse(true, "Categories");
        //    await resUpdate.sav;
        // const resUpdate = Category.updateMany({}, {res}, { multi: true });
        // return resUpdate;

        // const arr = res;
        // arr.push(res);

        // for (let j = 0; j < arr.length - 1; ++j) {

        //     if (arr[j].position < arr[j + 1].position) {


        //         let tmp = res[j].position;
        //         res[j].position = res[j + 1].position;
        //         // await res[j].save();
        //         res[j + 1].position = tmp;
        //         arr[j].position = res[j].position;

        //         // arr.push(res[j]);
        //         // await res[j].save();
        //         // await res[j + 1].save();
        //     }
        // }
        // const sorting = await Category.find({}).sort({ position: 1 });
        // sortingdb();
        // async function sortingdb(){
        //     for (let i = 0; i < sorting.length; i++) {
        //        await sorting[i].save()
        //     }
        // }
        // console.log(sorting);
        // console.log('norm');
        // const resCategory = await Category.find();
        // console.log(res);
        // return getResponse(true, "sorted", res);
    }

    public addPromotion = async (file: any, name: string) => {
        // console.log(file.mimetype);
        // if (file.mimetype === "image/png" ||
        //     file.mimetype === "image/jpg" ||
        //     file.mimetype === "image/jpeg") {
        //     const category = new Category({ name: name, img: file.filename, position: 4 });
        //     await category.save();
        //     return getResponse(true, "image added")
        // }
        // else {
        //     return getResponse(false, "incorrect image");
        // }

    }
}

export default new HomeServices();