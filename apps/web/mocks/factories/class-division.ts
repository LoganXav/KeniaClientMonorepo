import { ClassDivisionType, ClassType, StaffType, StudentType, SchoolType } from "@/types";
import { MOCK_TENANT_ID } from "../constants";

/**
 * Factory function to create mock class division data
 */
export function createClassDivision(
  id: number,
  name: string,
  classId: number,
  classDivisionTeacherId: number,
  classData?: ClassType,
  classDivisionTeacher?: StaffType,
  students: StudentType[] = []
): ClassDivisionType {
  return {
    id,
    name,
    classId,
    classDivisionTeacherId,
    class: classData || ({} as ClassType),
    tenantId: MOCK_TENANT_ID,
    tenant: {} as SchoolType,
    students,
    classDivionTeacher: classDivisionTeacher || ({} as StaffType),
  };
}
