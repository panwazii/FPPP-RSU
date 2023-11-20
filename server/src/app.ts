import express, { Application } from 'express';
import cors from 'cors';
import compression from 'compression';
import helmet from 'helmet';
import initDatabase from './database/init.model';
import config from './config/global.config';
import authRouter from './routes/auth.route';
import adminRouter from './routes/admin.route';
import publicRouter from './routes/public.route';
import userRouter from './routes/user.route';
import utilRouter from './routes/util.route';
import log from './tools/log';

const corsOptions = {
    origin: config.cors.origin
};

initDatabase().then(() => {
    const app: Application = express();
    const router: express.Router = express.Router();

    router.use('/api/auth', authRouter);
    router.use('/api/admin', adminRouter);
    router.use('/api/public', publicRouter);
    router.use('/api/user', userRouter);
    router.use('/api/util', utilRouter);
    router.get('/', ((req, res) => {
        res.json('Hello from server!!!');
    }));

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(compression());
    app.use(helmet());
    app.use(cors(corsOptions));
    app.use('/', router);



    app.listen(config.port, () => {
        log(`Express service is now online at port:${config.port}.`);
    });

}).catch((err) => {
    console.log(err);
});
