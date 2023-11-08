import express, { Request, Response, NextFunction } from 'express';

import { respRest, crespRest } from './rest/rest_producer'
import { logger } from './logging/central_log';

import { cf } from './config/config';

const app = express();

app.use('*', (req: Request, res: Response, next: NextFunction) => {
    logger.debug(`Request to '${req.url}' over ${req.method}`);
    next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/upload', require('./routes/upload_router'));
app.use('/file', require('./routes/file_router'));

app.get('/', (req: Request, res: Response, next: NextFunction) => {
    let q = req.query.query;
    res.send(q);
});

app.get('*', (req: Request, res: Response, next: NextFunction) => {
    res.status(404).send('404 Not Found');
});
app.post('*', (req: Request, res: Response, next: NextFunction) => {
    res.header('Content-Type', 'application/json');
    res.status(404).send(crespRest(404));
});

app.listen(cf.server.port, () => {
    logger.info(`Server started on port ${cf.server.port}`)
});
