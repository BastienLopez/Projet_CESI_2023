import nodemailer from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import { Notifier } from "../../application/notifier.provider";
import { Session } from "../../domain/Session/Session";

export class SMTP implements Notifier {
	private transporter: nodemailer.Transporter<SMTPTransport.SentMessageInfo>;

	constructor(
		host: string,
		port: number,
		user: string,
		pwd: string,
		private _from: string
	) {
		this.transporter = nodemailer.createTransport({
			host: host,
			port: port,
			secure: false,
			auth: {
				user: user,
				pass: pwd,
			},
		});
	}
	
	notifySessionConfirmed(session: Session): Promise<void> {
		throw new Error('Method not implemented.');
	}

	async notify(
		targets: string[],
		subject: string,
		content: string
	): Promise<void> {
		try {
			let info = await this.transporter.sendMail({
				from: this._from,
				to: targets.join(','),
				subject: subject,
				html: content,
			});

			console.log('Message sent: %s', info.messageId);
		} catch (error) {
			console.log('Error while sending email', error);

			throw new Error('Error while sending email');
		}
	}
}