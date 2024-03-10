import { logger } from "../logging/central_log";
import { respRest } from "../rest/rest_producer";
import { FileUploadBuilder } from "../util/file_upload";
import { Request, Response, NextFunction } from "express";

const uploadRouter = require('express').Router();

uploadRouter.post('/image', new FileUploadBuilder().setType("image").upload().single("file"), (req: Request, res: Response, next: NextFunction) => {
    logger.info(req.file?.filename);
    res.status(200).send(respRest(200, { "filename": req.file?.filename }));
});

uploadRouter.post('/video', new FileUploadBuilder().setType("video").upload().single("file"), (req: Request, res: Response, next: NextFunction) => {
    logger.info(req.file);
    res.status(200).send(respRest(200, "File uploaded"));
});

uploadRouter.post('/audio', new FileUploadBuilder().setType("audio").upload().single("file"), (req: Request, res: Response, next: NextFunction) => {
    logger.info(req.file);
    res.status(200).send(respRest(200, "File uploaded"));
});

module.exports = uploadRouter;
