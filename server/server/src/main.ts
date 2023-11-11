import express, { Request, Response, NextFunction } from 'express';

import { respRest, crespRest } from './rest/rest_producer'
import { logger } from './logging/central_log';

import { cf } from './config/config';

// parser middle-ware settings
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import { Socket } from 'socket.io';

// create app
const app = express();
const server = require('http').createServer(app);

// database
const socket: Socket = require('socket.io')(server);
import session from 'express-session';
const MysqlStore = require('express-mysql-session')(session);

const options = {
    host: cf.database.host,
    port: cf.database.port,
    user: cf.database.user,
    password: cf.database.password,
    database: "session",
};

// session storage configuration
// declare module 'express-session' {
//     export interface SessionData {
//         uid: string,
//         privilege: number,
//     }
// }

// session configuration
const sessionMiddleware = session({
    secret: cf.session.secret,
    resave: false,
    saveUninitialized: false,
    //FIXME: use redis instead of mysql
    store: new MysqlStore(options),
    rolling: true,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7,
        httpOnly: true,
        //TODO: add secure option
    }
});

socket.on('connection', (socket: Socket) => {
    logger.info('Socket connected');
    console.log('Socket connected');
    socket.on('disconnect', () => {
        logger.info('Socket disconnected');
    });
});

// set middle-ware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(sessionMiddleware);

// log all requests
app.use('*', (req: Request, res: Response, next: NextFunction) => {
    logger.debug(`Request to '${req.url}' over ${req.method}`);
    next();
});

// routers
// app.use('/test', require('./routers/test_router'));
// app.use('/board', require('./routers/board_router'))

app.use('/signup', require('./routers/sign_up_router'));
// app.use('/login', require('./routers/sign_in_router'));
// app.use('/logout', require('./routers/logout_router'));
// app.use('/user', require('./routers/userInfo_router'));
// app.use('/post', require('./routers/post_router'));
// app.use('/comment', require('./routers/comment_router'));
// app.use('/reaction', require('./routers/reaction_router'));
// app.use('/report', require('./routers/report_router'));
// app.use('/test', require('./routers/test_router'));
// app.use('/board', require('./routers/board_router'))

// index file
app.get('/', (req: Request, res: Response) => {
    let q = req.query.query;
    res.sendFile(__dirname + '/client/index.html');
});

// 404 handler for GET request
app.get('*', (res: Response) => {
    res.status(404).send('404 Not Found');
});

// 404 handler for POST request
app.post('*', (res: Response) => {
    res.header('Content-Type', 'application/json');
    res.status(404).send(crespRest(404));
});

// LISTEN START!
server.listen(80, () => {
    logger.info(`Server started on port ${80}`)
});
