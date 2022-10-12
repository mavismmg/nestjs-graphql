import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { CreateStudentInput } from "./create-student.input";
import { StudentService } from "./student.service";
import { StudentType } from "./student.type";

@Resolver(of => StudentType)
export class StudentResolver {
  constructor(private studentService: StudentService) { }

  @Query(returns => [StudentType])
  allStudent() {
    return this.studentService.students();
  }

  @Query(returns => StudentType)
  student(
    @Args('id') id: string,
  ) {
    return this.studentService.student(id);
  }

  @Mutation(returns => StudentType)
  createStudent(
    @Args('createStudentInput') createStudentInput: CreateStudentInput,
  ) {
    return this.studentService.createStudent(createStudentInput);
  }
}