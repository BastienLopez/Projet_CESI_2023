import { Router } from 'express';
import { IntervenantRepository } from '../../application/intervenant.repository';
import { Notifier } from '../../application/notifier.provider';
import { CreateIntervenentUsecase } from '../../application/usecases/commands/create-intervenant.usecase';
import { RetrieveIntervenantUseCase } from '../../application/usecases/queries/retrieve-intervenat.usecase';

const express = require('express');
const router: Router = new express.Router();

export function IntervenantSubRouter(
	intervenantRepository: IntervenantRepository,
	notifier: Notifier
) {
	router.post('/', async (req, res) => {
		const createIntervenant = new CreateIntervenentUsecase(
			intervenantRepository,
			notifier
		);

		try {
			await createIntervenant.handle({
				code: req.body.code,
				firstName: req.body.firstname,
				lastName: req.body.lastname,
				phone: req.body.phone,
				intervenantType: req.body.intervenant_type,
			});
			res.status(201).send();
		} catch (error: any) {
			console.log(error);
			res.status(400).send(error.message);
		}
	});
	router.get('/:code', async (req, res) => {
		const retrieveIntervenantUseCase = new RetrieveIntervenantUseCase(
			intervenantRepository
		);
		try {
			await retrieveIntervenantUseCase.handle(req.body.code);
		} catch (error: any) {
			res.status(400).send(error.message);
			console.log(error);
		}
		const intervenant = intervenantRepository.findByCode(req.body.code);
		res.send(intervenant);
	});

	return router;
}
