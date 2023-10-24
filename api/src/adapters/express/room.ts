import { Router } from 'express';
import { RoomRepository } from '../../application/room.repository';
import { CreateRoomUsecase } from '../../application/usecases/commands/create-room.usecase';
import { DeleteRoomUsecase } from '../../application/usecases/commands/delete-room.usecase';
import { UpdateRoomUsecase } from '../../application/usecases/commands/update-room.usecase';
import { RetrieveRoomUseCase } from '../../application/usecases/queries/retrieve-room.usecases';
//import { RetrieveRoomsUsecase } from '../../application/usecases/queries/retrieve-rooms-usecase';

const express = require('express');
const router: Router = new express.Router();

export function RoomSubRouter(roomRepository: RoomRepository) {
	router.post('/', async (req, res) => {

		const createRoom = new CreateRoomUsecase(roomRepository);

		try {	
			await createRoom.handle({
			
				ref: req.body.ref,
				capacity: req.body.capacity,
				roomType: req.body.roomType,
			});
			res.status(201).send();
		} catch (error: any) {
			console.log(error);
			res.status(400).send(error.message);
		}
	});
	router.delete('/', async (req, res) => {
		const deleteRoom = new DeleteRoomUsecase(
			roomRepository,
			//notifier
		);

		try {
			await deleteRoom.handle({
				ref: req.body.ref,
			});
	
			res.status(201).send({
				message: 'Room deleted successfully',
			});
		} catch (error: any) {
			console.log(error);
			res.status(400).send(error.message);
		}
	});
	router.put('/', async (req, res) => {
		console.log("salut")
		console.log(req.body)
		const updateRoom = new UpdateRoomUsecase(roomRepository);
		try {
			await updateRoom.handle({
				ref: req.body.ref,
				capacity: req.body.capacity,
				roomType: req.body.roomType,
			});
			res.status(200).send();
		} catch (error: any) {
			console.log(error);
			res.status(405).send(error.message);
		}
	});
	// router.delete('/', async (req, res) => {
	// 	const deleteRoom = new DeleteRoomUsecase(
	// 		roomRepository,
	// 		//notifier
	// 	);

	// 	try {
	// 		await deleteRoom.handle({
	// 			ref: req.body.ref,
	// 		});

	// 		res.status(201).send({
	// 			message: 'Room deleted successfully',
	// 		});
	// 	} catch (error: any) {
	// 		console.log(error);
	// 		res.status(400).send(error.message);
	// 	}
	// });
	router.get('/', async (req, res) => {
		console.log('get');
		const retrieveRoomUseCase = new RetrieveRoomUseCase(roomRepository);
		try {
			await retrieveRoomUseCase.handle(req.body.ref);
			console.log(retrieveRoomUseCase);
			const room = roomRepository.findByRef(req.body.ref);
			room.then((p) => res.send(p));
		} catch (error: any) {
			res.status(400).send(error.message);
			console.log(error);
		}
	});

	// router.get('/all', async (_req, res) => {
	// 	try {
	// 		const room = roomRepository.getAllRooms();
	// 		room.then((p) => res.send(p));
	// 	} catch (error: any) {
	// 		res.status(400).send(error.message);
	// 		console.log('personne', error);
	// 	}
	// });
		//by route params
		router.get('/ref/:ref', async (req, res) => {
			const retrieveRoomUseCase = new RetrieveRoomUseCase(roomRepository);
			try {
				await retrieveRoomUseCase.handle (req.params.ref as unknown as string );
				console.log(retrieveRoomUseCase);
				const room = roomRepository.findByRef(
					req.params.ref as unknown as string					
				);
				room.then((p) => res.send(p));
			} catch (error: any) {
				res.status(400).send(error.message);
				console.log('room', error);
			}
		});
		router.get('room/all/page/:nbPage/:nbPerPage/:nameFilter', async (req, res) => {
			try {
				const room = roomRepository.getAllRooms(
					req.params.nbPage as unknown as number,
					req.params.nbPerPage as unknown as number,
					req.params.nameFilter as unknown as string
				);
				room.then((p) => res.send(p));
			} catch (error: any) {
				console.error(error);
				res.status(400).send({ error: 'une erreur est survenu' });
			}
		});


		router.get(
			'room/all/page/:nbPage/type/:roleFilter/:nbPerPage/:nameFilter',
			async (req, res) => {
				try {
					const room = roomRepository.getFilteredRoom(
						req.params.nbPage as unknown as number,
						req.params.roleFilter as unknown as string,
						req.params.nbPerPage as unknown as number,
						req.params.nameFilter as unknown as string
					);
					room.then((p) => res.send(p));
				} catch (error: any) {
					console.error(error);
					res.status(400).send({ error: 'une erreur est survenu' });
				}
			}
		);
	return router;
}
