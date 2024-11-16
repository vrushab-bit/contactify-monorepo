import { json, urlencoded } from 'body-parser';
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';

import { clerkMiddleware } from '@clerk/express';
import ContactRouter from './routers/ContactRoutes';

export const createServer = () => {
	const app = express();
	app
		.disable('x-powered-by')
		.use(morgan('dev'))
		.use(urlencoded({ extended: true }))
		.use(json())
		.use(cors())
		.use(clerkMiddleware())
		.use('/api/contact', ContactRouter)
		.get('/health', async (req, res) => {
			res.status(200).send('ok');
		});

	return app;
};
