import { logger } from "../logging/central_log";
import { respRest } from "../rest/rest_producer";
import { FileUploadBuilder } from "../util/file_upload";
import { Request, Response, NextFunction } from "express";

const uploadRouter = require('express').Router();
const fileUploadBuilder = new FileUploadBuilder();

uploadRouter.post('/image', fileUploadBuilder.setType("img").upload().single("file"), (req: Request, res: Response, next: NextFunction) => {
    logger.info(req.file);
    res.status(200).send(respRest(200, "File uploaded"));
});

uploadRouter.post('/video', fileUploadBuilder.setType("video").upload().single("file"), (req: Request, res: Response, next: NextFunction) => {
    logger.info(req.file);
    res.status(200).send(respRest(200, "File uploaded"));
});

uploadRouter.post('/audio', fileUploadBuilder.setType("audio").upload().single("file"), (req: Request, res: Response, next: NextFunction) => {
    logger.info(req.file);
    res.status(200).send(respRest(200, "File uploaded"));
});

module.exports = uploadRouter;
