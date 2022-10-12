import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Lesson } from './lesson.entity';
import { v4 as uuid } from 'uuid';
import { CreateLessonInput } from './lesson.input';
import { Repository } from 'typeorm';

@Injectable()
export class LessonService {
  constructor(
    @InjectRepository(Lesson)
    private lessonRepository: Repository<Lesson>,
  ) { }

  async lessons(): Promise<Lesson[]> {
    return this.lessonRepository.find();
  }

  async lesson(id: string): Promise<Lesson> {
    return this.lessonRepository.findOne({
      where: {
        id,
      }
    });
  }

  async createLesson(createLessonInput: CreateLessonInput): Promise<Lesson> {
    const { name, startDate, endDate, students } = createLessonInput;
    const lesson = this.lessonRepository.create({
      id: uuid(),
      name,
      startDate,
      endDate,
      students,
    });
    return this.lessonRepository.save(lesson);
  }

  async assignStudentsToLesson(lessonId: string, studentIds: string[]): Promise<Lesson> {
    const lesson = this.lessonRepository.findOne({
      where: {
        id: lessonId,
      }
    });
    (await lesson).students = [...(await lesson).students, ...studentIds];
    return await this.lessonRepository.save(await lesson);
  }
}
