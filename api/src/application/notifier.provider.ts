import { Session } from "../domain/Session/Session";

export interface Notifier {
	notify(targets: string[], subject: string, content: string): Promise<void>;
	notifySessionConfirmed(session: Session): Promise<void>;
}
