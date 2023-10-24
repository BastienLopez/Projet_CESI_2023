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
		return this.notify(
			[session.referer()!.email()],
			`Session ${session.subject()} confirmed`,
			'Session confirmed'
		);
	}
}
