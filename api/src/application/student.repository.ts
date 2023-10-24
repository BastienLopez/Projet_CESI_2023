import { Code } from '../domain/Code/Code';
import { Student } from '../domain/Person/Student';
import { StudentPresenter } from './usecases/queries/retrieve-student-usecase';


export interface StudentRepository {
	save(student: Student): Promise<void>;
	update(student: Student): Promise<void>;
	delete(code: Code): Promise<void>;
	findByCode(code: Code): Promise<Student | null>;
}
export interface QueryStudentRepository {
	getAllStudent(): Promise<StudentPresenter[]>;
}