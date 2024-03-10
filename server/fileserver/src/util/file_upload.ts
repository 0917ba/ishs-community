import { Request } from "express";
import multer, { FileFilterCallback, diskStorage } from "multer";
import fs from "fs";
import { UUID } from "./uuid_generator";

type FileType = {
    [key: string]: string[],
    image: string[],
    video: string[],
    audio: string[]
}

export class FileUploadBuilder {

    type: string | null;
    filterList: string[];
    fileType: FileType = {
        image: ["png", "jpeg", "gif", "webp", "jpg"],
        video: ["mp4", "webm"],
        audio: ["mp3", "wav"]
    }

    constructor() {
        this.type = null;
        this.filterList = [];
        try {
            fs.readdirSync("./uploads");
        } catch (err) {
            fs.mkdirSync("./uploads");
            fs.mkdirSync("./uploads/image");
            fs.mkdirSync("./uploads/video");
            fs.mkdirSync("./uploads/audio");
        }
    }

    setType(type: string) {
        this.type = type;
        if (Object.keys(this.fileType).includes(this.type)) {
            this.filterList = this.fileType[this.type];
        }
        return this;
    }

    setFilterList(filterList: string[]) {
        this.filterList = filterList;
    }
    
    filter() {
        const fileFilter = (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
            if (this.filterList.includes(file.mimetype.split("/")[1])) {
                cb(null, true);
            } else {
                cb(null, false);
            }
        }
        return fileFilter;
    }

    storage() {
        const storage = diskStorage({
            destination: (req, file, cb) => {
                cb(null, `./uploads/${this.type}/`);
            },
            filename: (req, file, cb) => {
                cb(null, new UUID().generateUUID() + "." + this.filterList[0]);
            },
        });
        return storage;
    }

    upload() {
        const upload = multer({
            storage: this.storage(),
            fileFilter: this.filter()
        });
        return upload;
    }
}