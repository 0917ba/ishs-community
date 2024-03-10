import { Request, Response, NextFunction } from "express";
import fs from "fs";
import path from "path";
import { respRest } from "../rest/rest_producer";

const fileRouter = require('express').Router();

fileRouter.get('/image', (req: Request, res: Response, next: NextFunction) => {
    let id = req.query.id;
    if (id == undefined || id == null) res.sendStatus(400).send(respRest(400, "Bad request"));
    let file = findFileByName(String(id), "image");
    if (fs.existsSync("./uploads/image/" + file)) {
        res.sendFile(path.join(__dirname + "../../../uploads/image/" + file));
    } else {
        res.sendStatus(404).send(respRest(404, "File not found"));
    }
});

// fileRouter.get('/video', (req: Request, res: Response, next: NextFunction) => {
//     let id = req.query.id;
//     let index = req.query.index;
//     let file = findFileByName(id + "_" + index);
//     if (fs.existsSync("../../uploads/video/" + file)) {
//         res.sendFile("../../uploads/video/" + file);
//     } else {
//         res.sendStatus(404).send(respRest(404, "File not found"));
//     }
// });

// fileRouter.get('/audio', (req: Request, res: Response, next: NextFunction) => {
//     let id = req.query.id;
//     let index = req.query.index;
//     let file = findFileByName(id + "_" + index);
//     if (fs.existsSync("../../uploads/audio/" + file)) {
//         res.sendFile("../../uploads/audio/" + file);
//     } else {
//         res.sendStatus(404).send(respRest(404, "File not found"));
//     }
// });

const findFileByName = (name: string, type: string) => {
    let files = fs.readdirSync(`./uploads/${type}/`);
    let file = files.find((file) => {
        return file.includes(name);
    });
    console.log(file);
    return file;
}

module.exports = fileRouter;