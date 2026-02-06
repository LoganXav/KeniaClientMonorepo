import { SubjectType, ClassType, StaffType, SubjectsRegisteredType, SubjectGradingStructureType, SchoolType } from "@/types";
import { MOCK_TENANT_ID } from "../constants";

/**
 * Factory function to create mock subject data
 */
export function createSubject(
  id: number,
  name: string,
  description: string,
  classId: number,
  classData?: ClassType,
  staffs: StaffType[] = [],
  subjectRegistration: SubjectsRegisteredType[] = [],
  gradingStructure?: SubjectGradingStructureType
): SubjectType {
  return {
    id,
    name,
    description,
    classId,
    class: classData || ({} as ClassType),
    staffs,
    subjectRegistration,
    gradingStructure: gradingStructure || ({} as SubjectGradingStructureType),
    tenantId: MOCK_TENANT_ID,
    tenant: {} as SchoolType,
  };
}
