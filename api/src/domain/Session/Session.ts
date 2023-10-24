import { Referer } from '../Person/Referer';
import { Promotion } from '../Promotion/Promotion';
import { Room } from '../Room/Room';
import { ConventionStatus, SessionStatus, UUID } from '../types';
import { Subject } from './Subject';
import validator from 'validator';

export class Session {
	private _referer: Referer | null = null;
	private _rooms: Room[] = [];
	private _subject: Subject | null = null;
	private _comment: string = '';
	private _conventionStatus: ConventionStatus = ConventionStatus.NOT_SEND;
	private _sessionStatus: SessionStatus = SessionStatus.PENDING;

	constructor(
		private readonly _id: UUID,
		private _startDate: Date,
		private _endDate: Date,
		private readonly _promo: Promotion
	) {
		if (!validator.isUUID(_id)) {
			throw new Error('Id must be a valid UUID');
		}

		this.validateDates(_startDate, _endDate);

		if (_promo === undefined || _promo === null) {
			throw new Error('Promotion must be defined');
		}
	}

	private validateDates(startDate: Date, endDate: Date) {
		if (startDate === undefined || startDate === null) {
			throw new Error('Start date must be defined');
		}

		if (endDate === undefined || endDate === null) {
			throw new Error('End date must be defined');
		}

		if (startDate < new Date()) {
			throw new Error('Start date must be in the future');
		}

		if (startDate > endDate) {
			throw new Error('Start date must be before end date');
		}

		if (endDate === startDate) {
			throw new Error('Start date must be different from end date');
		}
	}

	id(): UUID {
		return this._id;
	}

	referer(): Referer | null {
		return this._referer;
	}

	rooms(): Room[] {
		return this._rooms;
	}

	addRoom(room: Room) {
		this._rooms.push(room);
	}

	comment(): string {
		return this._comment;
	}

	endDate(): Date {
		return this._endDate;
	}

	promo(): Promotion {
		return this._promo;
	}

	startDate(): Date {
		return this._startDate;
	}

	subject(): Subject | null {
		return this._subject;
	}

	conventionStatus(): ConventionStatus {
		return this._conventionStatus;
	}

	sessionStatus(): SessionStatus {
		return this._sessionStatus;
	}

	setComment(comment: string) {
		this._comment = comment;
	}

	reschedule(startDate: Date, endDate: Date) {
		this.validateDates(startDate, endDate);

		this._startDate = startDate;
		this._endDate = endDate;
		this._sessionStatus = SessionStatus.PENDING;
	}

	setSubject(subject: Subject) {
		this._subject = subject;
	}

	setconventionStatus(conventionStatus: ConventionStatus) {
		this.changeConventionStatus(conventionStatus);
	}

	private changeConventionStatus(conventionStatus: ConventionStatus) {
		switch (conventionStatus) {
			case ConventionStatus.NOT_SEND: {
				this._conventionStatus = conventionStatus;
				break;
			}
			case ConventionStatus.SEND: {
				if (this.conventionStatus() !== ConventionStatus.NOT_SEND) {
					throw new Error('Convention status must be not send before send');
				}
				this._conventionStatus = conventionStatus;
				break;
			}
			case ConventionStatus.RETURNED: {
				if (this.conventionStatus() !== ConventionStatus.SEND) {
					throw new Error('Convention status must be send before returned');
				}
				this._conventionStatus = conventionStatus;
				break;
			}
		}
	}

	proposeReferer(referer: Referer) {
		if (this.referer() !== null) {
			throw new Error('Session already have a referer');
		}

		if (this.subject() === null) {
			throw new Error('Session must have a subject to be proposed');
		}

		this._referer = referer;
		this.changeSessionStatus(SessionStatus.PROPOSED);
	}

	acceptSession() {
		if (this.referer() === null) {
			throw new Error('Session must have a referer');
		}

		this.changeSessionStatus(SessionStatus.ACCEPTED);
	}

	refuseSession() {
		if (this.referer() === null) {
			throw new Error('Session must have a referer');
		}

		this.changeSessionStatus(SessionStatus.REFUSED);
		this._comment = this.referer()?.fullname() + ' a refusé la session';
		this._referer = null;
	}

	finishSession() {
		this.changeSessionStatus(SessionStatus.FINISHED);
	}

	confirm() {
		if (this._referer === null) {
			throw new Error(
				'Session must have a referer before session status be confirmed'
			);
		}

		if (this._subject === null) {
			throw new Error('Session must have a subject ');
		}

		if (!this._referer.subjectsAproved().includes(this._subject)) {
			throw new Error('Referer must have this subject aproved');
		}

		if (this._sessionStatus !== SessionStatus.ACCEPTED) {
			throw new Error('Session status must be accepted before confirmed');
		}

		if (!this.hasEnoughCapacity()) {
			throw new Error('Not enough room capacity');
		}

		this._conventionStatus = ConventionStatus.SEND;
		this._sessionStatus = SessionStatus.CONFIRMED;
	}

	private hasEnoughCapacity(): boolean {
		let capacity = 0;
		this._rooms.forEach((room) => {
			capacity += room.capacity();
		});
		if (this._promo.students.length > capacity) {
			return false
		}

		return true
	}

	private changeSessionStatus(sessionStatus: SessionStatus) {
		if (this.sessionStatus() === SessionStatus.FINISHED) {
			throw new Error('Session cannot be changed because it is finished');
		}

		this._sessionStatus = sessionStatus;

		switch (sessionStatus) {
			case SessionStatus.PENDING: {
				this._sessionStatus = sessionStatus;
				break;
			}

			case SessionStatus.PROPOSED: {
				if (
					this.sessionStatus() !== SessionStatus.PENDING ||
					this.sessionStatus() !== SessionStatus.REFUSED
				) {
					throw new Error('Session status must be pending or Refused');
				}
				this._sessionStatus = sessionStatus;
				break;
			}

			case SessionStatus.ACCEPTED: {
				if (this.sessionStatus() !== SessionStatus.PROPOSED) {
					throw new Error('Session status must be proposed before accepted');
				}
				this._sessionStatus = sessionStatus;
				break;
			}

			case SessionStatus.REFUSED: {
				if (
					this.sessionStatus() !== SessionStatus.PROPOSED ||
					this.sessionStatus() !== SessionStatus.ACCEPTED
				) {
					throw new Error(
						'Session status must be proposed or accepted before refused'
					);
				}
				this._sessionStatus = sessionStatus;
				break;
			}

			case SessionStatus.CANCELLED: {
				//todo prevenir lintervenat ?
				this._sessionStatus = sessionStatus;
				break;
			}

			case SessionStatus.FINISHED: {
				if (new Date() > this._endDate) {
					throw new Error('End date must be in the past');
				}
				if (this.sessionStatus() !== SessionStatus.CONFIRMED) {
					throw new Error('Session status must be confirmed before finished');
				}
				this._sessionStatus = sessionStatus;
				break;
			}
		}
	}
}
