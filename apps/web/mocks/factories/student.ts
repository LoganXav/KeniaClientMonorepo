import { StudentType, UserWithRelationsType, ClassType, GuardianType, SubjectGradingType, SubjectsRegisteredType } from "@/types";
import { MOCK_TENANT_ID, getStudentId, getEnrollmentDate } from "../constants";
import { createUser } from "./user";

/**
 * Factory function to create mock student data
 */
export function createStudent(
  id: number,
  admissionNo: string,
  firstName: string,
  lastName: string,
  email: string,
  classId: number,
  classDivisionId: number,
  classData?: ClassType,
  userOverrides?: Partial<UserWithRelationsType>,
  guardians: GuardianType[] = [],
  subjectGrades: SubjectGradingType[] = [],
  subjectsRegistered: SubjectsRegisteredType[] = []
): StudentType {
  const user = createUser(id, firstName, lastName, email, "STUDENT", userOverrides);
  
  return {
    admissionNo,
    id,
    studentId: getStudentId(id),
    userId: id,
    user: user as StudentType["user"],
    enrollmentDate: getEnrollmentDate(),
    class: classData || ({} as ClassType),
    guardians,
    tenantId: MOCK_TENANT_ID,
    tenant: {} as StudentType["tenant"],
    classDivisionId,
    subjectGrades,
    subjectsRegistered,
  };
}
