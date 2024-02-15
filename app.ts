import createError from 'http-errors';
import express, {Request, Response, NextFunction} from "express";
import WebSocket, {WebSocketServer} from 'ws';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import cors from 'cors';

const app = express();
const sockserver = new WebSocketServer({port: Number(process.env.WSPORT)});
let webSocketConnections: WebSocket[] = [];

sockserver.on('connection', (socket: WebSocket) => {
    webSocketConnections?.push(socket);
    console.log('New client connected!')
    socket.on('close', () => {
        console.log('Client has disconnected')
    })
    socket.on('error', () => {
        console.log('a websocket error has occurred');
    })
})

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'node_modules/bootstrap')))
app.use(cors());


app.get('/', (req: Request, res: Response) => {
    res.render("index.ejs", {WSPORT: process.env.WSPORT});
})

app.post('/', (req: Request, res: Response) => {
    console.log(req.body);
    if (webSocketConnections) {
        for (const webSocketConnection of webSocketConnections) {
            webSocketConnection.send(JSON.stringify(req.body), (err) => {
                console.log(err?.stack);
            });
        }
    }
    res.sendStatus(200);
})


// catch 404 and forward to error handler
app.use(function (req: Request, res: Response, next: NextFunction) {
    next(createError(404));
});

// error handler
app.use(function (err: any, req: Request, res: Response, next: NextFunction) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    // render the error page
    res.status(err.status || 500);
    res.send("ok");
});

export default app;
