import bcrypt from 'bcrypt';
import { Router } from 'express';
import fs from 'fs';
import jwt from 'jsonwebtoken';
import { PersonRepository } from '../../application/person.repository';
import { RetrievePersonUseCase } from '../../application/usecases/queries/retrieve-person.usecase';

const express = require('express');
const router: Router = new express.Router();

export function AuthSubRouter(personRepository: PersonRepository) {
	router.post('/login', async (req, res) => {
		try {
			const retrievePerson = new RetrievePersonUseCase(personRepository);
			const person = await retrievePerson.handle(req.body.login);

			if (!person) {
				return res.status(400).send('Invalid code');
			}

			if (!bcrypt.compareSync(req.body.password, person.password())) {
				return res.status(401).send('Invalid password');
			}

			const privateKey = fs.readFileSync('./config/private_key.pem', 'utf8');
			console.log(privateKey);
			return res.status(200).send({
				access_token: jwt.sign(
					{
						code: person.code(),
					},
					privateKey,
					{
						algorithm: 'RS256',
						expiresIn: '365d',
					}
				),
			});
		} catch (error: any) {
			console.log(error);
			return res.status(400).send(error.message);
		}
	});

	return router;
}
