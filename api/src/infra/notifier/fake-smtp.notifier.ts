import { Notifier } from '../../application/notifier.provider';
import { Session } from '../../domain/Session/Session';

export class FakeSMTP implements Notifier {
	constructor() {}

	async notify(
		targets: string[],
		subject: string,
		content: string
	): Promise<void> {
		console.log(
			'Sending email to ' +
				targets.join(',') +
				' with subject ' +
				subject +
				' and content ' +
				content
		);
	}

	notifySessionConfirmed(session: Session): Promise<void> {
		const targets = [session.referer()!.email()]
		const subject = `Session ${session.subject()} confirmed`;

		return this.notify(targets, subject, 'Session confirmed');
	}
}
