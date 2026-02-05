import { GetRequestReturnType } from "@/config/base-query";
import { SubjectType } from "@/types";

/**
 * Mock response for GET subject/list (subjects taught by staff)
 * Includes subjectRegistration for workspace students tab (students per subject).
 */

export const mockGetSubjectListResponse: GetRequestReturnType<SubjectType[]> = {
  data: [
    {
      id: 1,
      name: "Mathematics",
      description: "Core Mathematics",
      classId: 1,
      tenantId: 1,
      class: { id: 1, name: "SS 1", classTeacherId: 1, classTeacher: {} as any, students: [], subjects: [], tenantId: 1, tenant: {} as any },
      staffs: [],
      subjectRegistration: [
        {
          id: 1,
          name: "Mathematics",
          description: "",
          subjectId: 1,
          subject: {} as SubjectType,
          student: {
            id: 1,
            admissionNo: "STU001",
            studentId: "S001",
            userId: 1,
            user: { id: 1, firstName: "Alice", lastName: "Johnson", phoneNumber: "", email: "", password: "", hasVerified: true, isFirstTimeLogin: false, lastLoginDate: "", userType: "STUDENT", tenantId: 1, tenant: {} as any, createdAt: "", gender: "Female" } as any,
            enrollmentDate: new Date().toISOString(),
            class: { id: 1, name: "SS 1", classTeacherId: 1, classTeacher: {} as any, students: [], subjects: [], tenantId: 1, tenant: {} as any },
            guardians: [],
            tenantId: 1,
            tenant: {} as any,
            classDivisionId: 1,
            subjectGrades: [],
            subjectsRegistered: [],
          } as any,
        },
        {
          id: 2,
          name: "Mathematics",
          description: "",
          subjectId: 1,
          subject: {} as SubjectType,
          student: {
            id: 2,
            admissionNo: "STU002",
            studentId: "S002",
            userId: 2,
            user: { id: 2, firstName: "Bob", lastName: "Williams", phoneNumber: "", email: "", password: "", hasVerified: true, isFirstTimeLogin: false, lastLoginDate: "", userType: "STUDENT", tenantId: 1, tenant: {} as any, createdAt: "", gender: "Male" } as any,
            enrollmentDate: new Date().toISOString(),
            class: { id: 1, name: "SS 1", classTeacherId: 1, classTeacher: {} as any, students: [], subjects: [], tenantId: 1, tenant: {} as any },
            guardians: [],
            tenantId: 1,
            tenant: {} as any,
            classDivisionId: 1,
            subjectGrades: [],
            subjectsRegistered: [],
          } as any,
        },
      ],
      gradingStructure: {} as SubjectType["gradingStructure"],
      tenant: {} as SubjectType["tenant"],
    },
    {
      id: 2,
      name: "English",
      description: "English Language",
      classId: 1,
      tenantId: 1,
      class: { id: 1, name: "SS 1", classTeacherId: 1, classTeacher: {} as any, students: [], subjects: [], tenantId: 1, tenant: {} as any },
      staffs: [],
      subjectRegistration: [
        {
          id: 3,
          name: "English",
          description: "",
          subjectId: 2,
          subject: {} as SubjectType,
          student: {
            id: 1,
            admissionNo: "STU001",
            studentId: "S001",
            userId: 1,
            user: { id: 1, firstName: "Alice", lastName: "Johnson", phoneNumber: "", email: "", password: "", hasVerified: true, isFirstTimeLogin: false, lastLoginDate: "", userType: "STUDENT", tenantId: 1, tenant: {} as any, createdAt: "", gender: "Female" } as any,
            enrollmentDate: new Date().toISOString(),
            class: { id: 1, name: "SS 1", classTeacherId: 1, classTeacher: {} as any, students: [], subjects: [], tenantId: 1, tenant: {} as any },
            guardians: [],
            tenantId: 1,
            tenant: {} as any,
            classDivisionId: 1,
            subjectGrades: [],
            subjectsRegistered: [],
          } as any,
        },
      ],
      gradingStructure: {} as SubjectType["gradingStructure"],
      tenant: {} as SubjectType["tenant"],
    },
  ],
  message: "Resource fetched successfully",
  statusCode: 200,
};
