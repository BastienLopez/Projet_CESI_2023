import { Subject } from '../domain/Session/Subject';

export interface SubjectRepository {
	save(subject: Subject): Promise<void>;
	update(subject: Subject): Promise<void>;
	delete(ref: string): Promise<void>;
	findByRef(code: string): Promise<Subject | null>;
}
