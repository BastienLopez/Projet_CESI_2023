import { Router } from 'express';
import { StudentRepository } from '../../application/student.repository';
import { Code } from '../../domain/Code/Code';
import { Notifier } from '../../application/notifier.provider';
import { CreateStudentUsecase } from '../../application/usecases/commands/create-new-student.usecase';
import { DeleteStudentUsecase } from '../../application/usecases/commands/delete-student.usecase';


const express = require('express');
const router: Router = new express.Router();

export function StudentSubRouter(
	studentRepository: StudentRepository,
	notifier: Notifier
) {
	router.post('/create', async (req, res) => {
		const createStudent = new CreateStudentUsecase(
			studentRepository,
			notifier
		);

		try {
			await createStudent.handle({
				code: req.body.code,
				firstName: req.body.firstname,
				lastName: req.body.lastname,
			});
			res.status(201).send();
		} catch (error: any) {
			res.status(400).send(error.Message);
		}
	});
	router.delete('/', async (req, res) => {
		const deleteStudent = new DeleteStudentUsecase(
			studentRepository,
			notifier
		);

		try {
			await deleteStudent.handle({
				code: req.body.code,
			});

			res.status(201).send({
				message: 'Student deleted successfully',
			});
		} catch (error: any) {
			console.log(error);
			res.status(400).send(error.message);
		}
	});

	router.get('/:code', async (req, res) => {
		try {
			const code = req.params.code;
			if (code == null) {
				res.status(400).send({
					message: 'Code is required',
				});
			}
			const student = await studentRepository.findByCode(code as unknown as Code);
			if (student != null) {
				res.status(200).send(student);
			} else {
				res.status(404).send({
					message: 'Student not found',
				});
			}
		} catch (error: any) {
			res.status(500).send({
				message: error.message,
			});
		}
	});

	return router;
}

