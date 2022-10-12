import { Query, Resolver, Mutation, Args, ResolveField, Parent } from "@nestjs/graphql";
import { StudentService } from "src/student/student.service";
import { assignStudentsToLessonInput } from "./assign-student-to-lesson.input";
import { Lesson } from "./lesson.entity";
import { CreateLessonInput } from "./lesson.input";
import { LessonService } from "./lesson.service";
import { LessonType } from "./lesson.type";

@Resolver(of => LessonType)
export class LessonResolver {
  constructor(
    private lessonService: LessonService,
    private studentService: StudentService
  ) { }

  @Query(returns => [LessonType])
  allLesson() {
    return this.lessonService.lessons();
  }

  @Query(returns => LessonType)
  lesson(
    @Args('id') id: string,
  ) {
    return this.lessonService.lesson(id);
  }

  @Mutation(retuns => LessonType)
  createLesson(
    @Args('createLessonInput') createLessonInput: CreateLessonInput
  ) {
    return this.lessonService.createLesson(createLessonInput);
  }

  @Mutation(returns => LessonType)
  assignStudentsToLesson(
    @Args('assignStudentsToLessonInput') assignStudentsToLessonInput: assignStudentsToLessonInput,
  ) {
    const { lessonId, studentIds } = assignStudentsToLessonInput;
    return this.lessonService.assignStudentsToLesson(lessonId, studentIds);
  }

  @ResolveField()
  async students(@Parent() lesson: Lesson) {
    return this.studentService.getManyStudents(lesson.students);
  }
}