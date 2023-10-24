import { Router } from 'express';
import { Code } from '../../domain/Code/Code';
import { Notifier } from '../../application/notifier.provider';
import { PromotionRepository } from '../../application/promotion.repository';
import { CreatePromotionUsecase } from '../../application/usecases/commands/create-promotion.usecase';
import { DeletePromotionUsecase } from '../../application/usecases/commands/delete-promotion.usecase';

const express = require('express');
const router: Router = new express.Router();

export function PromotionSubRouter(
	promotionRepository: PromotionRepository,
	notifier: Notifier
) {
	router.post('/', async (req, res) => {
		const createPromotion = new CreatePromotionUsecase(
			promotionRepository,
			notifier
		);

		try {
			await createPromotion.handle({
				code: req.body.code,
				alias: req.body.alias,
				startDate: req.body.start_date,
				endDate: req.body.end_date,
				level: req.body.level,
				pilot: req.body.pilot,
				sector: req.body.sector,
				students: req.body.students,
			});
			/**
			{"code":"PROMO-1","alias":"Promo 1","start_date":"2021-01-01","end_date":"2021-12-31","level":"1","pilot":"Pilot 1","sector":"Sector 1","students":["student1","student2"]}
			 */
			res.status(201).send({
				message: 'Promotion created successfully',
			});
		} catch (error: any) {
			console.error(error);
			res.status(400).send(error.message);
		}
	});

	router.delete('/', async (req, res) => {
		const deletePromotion = new DeletePromotionUsecase(
			promotionRepository,
			notifier
		);

		try {
			await deletePromotion.handle({
				code: req.body.code,
			});

			res.status(201).send({
				message: 'Promotion deleted successfully',
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
			const promo = await promotionRepository.findByCode(
				code as unknown as Code
			);
			if (promo != null) {
				res.status(200).send(promo);
			} else {
				res.status(404).send({
					message: 'Promo not found',
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
