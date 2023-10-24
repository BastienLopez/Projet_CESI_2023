import { NextFunction, Request, Response } from 'express';
import fs from 'fs';
import jwt from 'jsonwebtoken';

export function authMiddleware(
	req: Request,
	res: Response,
	next: NextFunction
) {
	try {
		const token = req.headers.authorization?.split(' ')[1];

		if (!token) {
			return res.status(401).send({ error: 'Token JWT invalide.' });
		}

		//const publicKey = fs.readFileSync('./config/public_key.pem', 'utf8');

		if (
			!jwt.verify(token, process.env.JWT_PUBLIC_KEY || 'secret', {
				algorithms: ['RS256'],
			})
		) {
			return res.status(401).send({ error: 'Token JWT invalide.' });
		}

		return next();
	} catch (error: any) {
		res.status(400).send({ error: error.message });
	}
}
