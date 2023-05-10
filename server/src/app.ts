import express, { Application } from 'express';
import cors from 'cors';
import compression from 'compression';
import helmet from 'helmet';
import https from 'https';
import initDatabase from './database/init.model';
import config from './config/global.config';
import authRouter from './routes/auth.route';
import userRouter from './routes/user.route';
import log from './tools/log';

initDatabase().then(() => {
    const app: Application = express();
    const router: express.Router = express.Router();

    router.use('/api/auth', authRouter);
    router.use('/api/user', userRouter);
    router.get('/', ((req, res) => {
        res.json('You shall not pass!');
    }));

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(compression());
    app.use(helmet());
    app.use(cors({ credentials: true, origin: true }));
    app.use('/', router);



    app.listen(config.port, () => {
        log(`Express service is now online at port:${config.port}.`);
    });

    // if (config.ssl) {
    //     https.createServer({
    //         key: 'privateKey',
    //         cert: 'certificate',
    //     }, app).listen(config.sslPort, () => {
    //         log(`Express service is now online at port:${config.sslPort}. (SSL: ON)`);
    //     });
    // } else {
    //     app.listen(config.port, () => {
    //         log(`Express service is now online at port:${config.port}.`);
    //     });
    // }
}).catch((err) => {
    console.log(err);
});
