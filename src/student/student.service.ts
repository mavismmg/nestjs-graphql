import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateStudentInput } from './create-student.input';
import { Student } from './student.entity';
import { v4 as uuid } from 'uuid';
import { MongoRepository } from 'typeorm';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student)
    private studentRepository: MongoRepository<Student>,
  ) { }

  async students(): Promise<Student[]> {
    return this.studentRepository.find();
  }

  async student(id: string): Promise<Student> {
    return this.studentRepository.findOne({
      where: {
        id,
      }
    });
  }

  async createStudent(createStudentInput: CreateStudentInput): Promise<Student> {
    const { firstName, lastName } = createStudentInput;
    const student = this.studentRepository.create({
      id: uuid(),
      firstName,
      lastName,
    });
    return this.studentRepository.save(student);
  }

  async getManyStudents(studentIds: string[]): Promise<Student[]> {
    return this.studentRepository.findBy({
      where: {
        id: {
          $in: [...studentIds],
        }
      },
    });
  }
}
