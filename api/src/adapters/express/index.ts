import express, { Router } from 'express';
import morgan from 'morgan';
import { authMiddleware } from '../../middlewares/auth.middleware';

export async function expressAdapter(
	port: string,
	intervenantRouter: Router,
	promotionRouter: Router,
	roomRouter: Router,
	personRouter: Router,
	studentRouter: Router,
	authRouter: Router
) {
	const cors = require('cors');
	const app = express();
	app.use(express.json());
	app.use(cors());
	app.use(morgan('dev'));

	app.use(function (_req, res, next) {
		res.header('Access-Control-Allow-Origin', '*');
		res.header(
			'Access-Control-Allow-Headers',
			'Origin, X-Requested-With, Content-Type, Accept'
		);
		next();
	});

	app.use('/intervenants', authMiddleware, intervenantRouter);
	app.use('/promotions', authMiddleware, promotionRouter);
	app.use('/rooms', /*authMiddleware,*/ roomRouter);
	app.use('/intervenant', authMiddleware, intervenantRouter);
	app.use('/person', /*authMiddleware,*/ personRouter);
	app.use('/student', authMiddleware, studentRouter);
	app.use('/auth', authRouter);

	app.listen(port, () => {
		console.log(`App listening on port ${port}!`);
	});
}
