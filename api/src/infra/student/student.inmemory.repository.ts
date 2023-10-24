import { StudentRepository } from "../../application/student.repository";
import { Code } from "../../domain/Code/Code";
import { Student } from "../../domain/Person/Student";
import { CodeType } from "../../domain/types";

export const fakeStudents: Student[] = [
	new Student(
		new Code('2022001', CodeType.PERSON),
		'John',
		'Doe',
	),
	new Student(
		new Code('2022002', CodeType.PERSON),
		'Jane',
		'Doe',

	),
];

export class StudentInmemoryRepository implements StudentRepository {
	constructor(private _Student: Student[] = fakeStudents) {}

	async save(Student: Student): Promise<void> {
		this._Student.push(Student);
	}

	async update(Student: Student): Promise<void> {
		const index = this._Student.findIndex(
			(i) => i.code() === Student.code()
		);
		this._Student[index] = Student;
	}

	async delete(code: Code): Promise<void> {
		this._Student = this._Student.filter((i) => i.code() !== code);
	}

	async findByCode(code: Code): Promise<Student | null> {
		return Promise.resolve(
			this._Student.find((i) => i.code() === code) || null
		);
	}

	async getAll(): Promise<Student[]> {
		return Promise.resolve(this._Student);
	}
}
