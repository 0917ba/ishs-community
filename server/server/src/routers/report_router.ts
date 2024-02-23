import { NextFunction, Request, Response } from "express";
import { QueryChecker } from "../util/query_checker";
import { respRest } from "../rest/rest_producer";
import { reportDatabase } from "../database/report_repository";
import { ReportStatus } from "../util/report_status";
import { now } from "../util/time_templete";
import { postDatabase } from "../database/post_repository";
import { commentDatabase } from "../database/comment_repository";
import { ContentStatus } from "../util/content_status";
import { ReportType } from "../util/report_type";

const reportRouter = require('express').Router();

reportRouter.post('/', (req: Request, res: Response, next: NextFunction) => {
    let type: string = req.body.type; // 나중에 enum으로 바꿔야 함.
    let authorId: string = req.body.authorId;
    let targetId: string = req.body.targetId;
    let content: string = req.body.content;
    let checker = new QueryChecker();
    if (checker.notNull(type, authorId, targetId, content)) {
        reportDatabase.createReport(type, authorId, targetId, content, now(), ReportStatus.PENDING);
        res.status(200).send(respRest(200, 0));
    } else {
        res.status(400).send(respRest(400, 1));
    }
});

reportRouter.post('/execute', async (req: Request, res: Response, next: NextFunction) => {
    let uid: string = req.body.uid;
    let status: string = req.body.status; // 나중에 enum으로 바꿔야 함.
    let checker = new QueryChecker();
    if (checker.notNull(uid, status)) {
        reportDatabase.updateReportStatus(uid, status);
        if (status == ReportStatus.ACCEPTED) {
            let report = await reportDatabase.getReportByUid(uid);
            if (report.getType() == ReportType.POST) {
                postDatabase.setpostStatus(report.getTargetId(), ContentStatus.REPORTED);
            } else if (report.getType() == ReportType.COMMENT) {
                commentDatabase.setStatus(report.getTargetId(), ContentStatus.REPORTED);
            }
        }
        reportDatabase.deleteReport(uid);
        res.status(200).send(respRest(200, 0));
    } else {
        res.status(400).send(respRest(400, 1));
    }
});

reportRouter.get('/:uid', async (req: Request, res: Response, next: NextFunction) => {
    let uid = req.params.uid;
    let checker = new QueryChecker();
    if (checker.notNull(uid)) {
        let report = await reportDatabase.getReportByUid(uid);
        res.status(200).send(respRest(200, report.toObject()));
    } else {
        res.status(400).send(respRest(400, 1));
    }
});

reportRouter.get('/list', async (req: Request, res: Response, next: NextFunction) => {
    let start = req.query.start;
    let end = req.query.end;

    let checker = new QueryChecker();
    if (checker.notNull(start, end)) {
        let reports = await reportDatabase.getReportsInAscendingOrder(Number(start), Number(end))
        let result: any[] = [];
        reports.forEach((report) => {
            result.push(report.toObject());
        });
        res.status(200).send(respRest(200, result));
    } else {
        res.status(400).send(respRest(400, 1));
    }
});

module.exports = reportRouter;