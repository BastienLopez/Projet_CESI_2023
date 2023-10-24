import { Router } from 'express';
import { PersonRepository } from '../../application/person.repository';
import { CreatePersonUsecase } from '../../application/usecases/commands/person/create-person-usecase';
import { DeletePersonUsecase } from '../../application/usecases/commands/person/delete-person-usecase';
import { UpdatePersonUsecase } from '../../application/usecases/commands/person/update-person-usecase';
import { RetrievePersonUseCase } from '../../application/usecases/queries/retrieve-person.usecase';
import { Code } from '../../domain/Code/Code';

const express = require('express');
const router: Router = new express.Router();

export function PersonSubRouter(personRepository: PersonRepository) {
	router.post('/', async (req, res) => {
		const createPerson = new CreatePersonUsecase(personRepository);
		try {
			await createPerson.handle({
				code: req.body.code,
				firstName: req.body.firstName,
				lastName: req.body.lastName,
				personType: req.body.personType,
				personRole: req.body.personRole,
				phone: req.body.phone,
				password: req.body.password,
			});
			res.status(201).send();
		} catch (error: any) {
			console.error(error, 'test', error.name);
			if (error?.name === 'SequelizeUniqueConstraintError')
				res.status(400).send({ error: 'code dejà existant' });
			else res.status(400).send({ error: 'une erreur est survenu' });
		}
	});

	router.put('/', async (req, res) => {
		console.log('put');
		const updatePerson = new UpdatePersonUsecase(personRepository);
		try {
			await updatePerson.handle({
				code: req.body.code,
				firstName: req.body.firstName,
				lastName: req.body.lastName,
				personType: req.body.personType,
				personRole: req.body.personRole,
				phone: req.body.phone,
				password: req.body.password,
			});
			res.status(200).send();
		} catch (error: any) {
			console.error(error);
			res.status(405).send({ error: 'une erreur est survenu' });
		}
	});

	router.delete('/', async (req, res) => {
		const deletePerson = new DeletePersonUsecase(personRepository);
		try {
			await deletePerson.handle({
				code: req.body.code,
				firstName: req.body.firstName,
				lastName: req.body.lastName,
				personType: req.body.personType,
				personRole: req.body.personRole,
				phone: req.body.phone,
				password: req.body.password,
			});
			res.status(200).send();
		} catch (error: any) {
			console.error(error);
			res.status(405).send({ error: 'une erreur est survenu' });
		}
	});

	// by body params
	router.get('/', async (req, res) => {
		console.log('get');
		const retrievePersonUseCase = new RetrievePersonUseCase(personRepository);
		try {
			await retrievePersonUseCase.handle(req.body.code);
			console.log(retrievePersonUseCase);
			const person = personRepository.findByCode(req.body.code);
			person.then((p) => res.send(p));
		} catch (error: any) {
			console.error(error);
			res.status(400).send({ error: 'une erreur est survenu' });
		}
	});

	// by route params
	router.get('/code/:code', async (req, res) => {
		const retrievePersonUseCase = new RetrievePersonUseCase(personRepository);
		try {
			await retrievePersonUseCase.handle(req.params.code as unknown as Code);
			console.log(retrievePersonUseCase);
			const person = personRepository.findByCode(
				req.params.code as unknown as Code
			);
			person.then((p) => res.send(p));
		} catch (error: any) {
			console.error(error);
			res.status(400).send({ error: 'une erreur est survenu' });
		}
	});

	router.get('/all/page/:nbPage/:nbPerPage/:nameFilter', async (req, res) => {
		try {
			const person = personRepository.getAllPersons(
				req.params.nbPage as unknown as number,
				req.params.nbPerPage as unknown as number,
				req.params.nameFilter as unknown as string
			);
			person.then((p) => res.send(p));
		} catch (error: any) {
			console.error(error);
			res.status(400).send({ error: 'une erreur est survenu' });
		}
	});

	router.get(
		'/all/page/:nbPage/role/:roleFilter/:nbPerPage/:nameFilter',
		async (req, res) => {
			try {
				const person = personRepository.getFilteredPeople(
					req.params.nbPage as unknown as number,
					req.params.roleFilter as unknown as string,
					req.params.nbPerPage as unknown as number,
					req.params.nameFilter as unknown as string
				);
				person.then((p) => res.send(p));
			} catch (error: any) {
				console.error(error);
				res.status(400).send({ error: 'une erreur est survenu' });
			}
		}
	);

	return router;
}
