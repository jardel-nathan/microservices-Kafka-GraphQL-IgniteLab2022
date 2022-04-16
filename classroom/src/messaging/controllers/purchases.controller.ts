import { ConsoleLogger, Controller } from "@nestjs/common";
import { EventPattern, Payload } from "@nestjs/microservices";
import { AnyFilesInterceptor } from "@nestjs/platform-express";
import { CoursesService } from "src/services/courses.service";
import { EnrollmentsService } from "src/services/enrollments.service";
import { StudentsService } from "src/services/students.service";

export interface Customer {
  authUserId: string;
  name?: string;
}

export interface Product {
  id: string;
  title: string;
  slug: string;
}


export interface PurchaseCreatedPayload {
  customer: Customer;
  product: Product;
}

@Controller()
export class PurchasesController {

  constructor(
    private studentsService: StudentsService,
    private coursesService: CoursesService,
    private enrollmentsService: EnrollmentsService,
  ) { }

  @EventPattern('purchases.new-purchase') //* purchasesCreates() will be called when an topic purchases.new-purchase is published  
  async purchaseCreated(
    @Payload('value')
    payload: PurchaseCreatedPayload
  ) {

    console.log(payload.customer)

    let student = await this.studentsService.getStudentByAuthUserId(
      payload.customer.authUserId,
    );

    if (!student) {
      student = await this.studentsService.createStudent({
        authUserId: payload.customer.authUserId,
      });
    }

    let course = await this.coursesService.getCourseBySlug(
      payload.product.slug,
    );

    if (!course) {
      course = await this.coursesService.createCourse({
        title: payload.product.title,
      });
    }

    await this.enrollmentsService.createEnrollment({
      courseId: course.id,
      studentId: student.id,
    });

  }

}
