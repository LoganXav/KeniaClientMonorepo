import { ClassType, StaffType, StudentType, SubjectType, SchoolType } from "@/types";
import { MOCK_TENANT_ID } from "../constants";

/**
 * Factory function to create mock class data
 */
export function createClass(
  id: number,
  name: string,
  classTeacherId: number,
  classTeacher?: StaffType,
  students: StudentType[] = [],
  subjects: SubjectType[] = []
): ClassType {
  return {
    id,
    name,
    classTeacherId,
    classTeacher: classTeacher || ({} as StaffType),
    students,
    subjects,
    tenantId: MOCK_TENANT_ID,
    tenant: {} as SchoolType,
  };
}
