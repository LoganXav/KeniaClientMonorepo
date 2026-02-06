import { createRole } from "../factories/role";
import { RoleType, PermissionType } from "@/types";
import { MOCK_ROLES, MOCK_TENANT_ID } from "../constants";

/**
 * Mock permissions data - comprehensive list of all permissions
 */
export const mockPermissions: PermissionType[] = [
  // Staff permissions
  { id: 1, name: "STAFF_CREATE", tenantId: MOCK_TENANT_ID },
  { id: 2, name: "STAFF_READ", tenantId: MOCK_TENANT_ID },
  { id: 3, name: "STAFF_UPDATE", tenantId: MOCK_TENANT_ID },
  { id: 4, name: "STAFF_DELETE", tenantId: MOCK_TENANT_ID },
  // Student permissions
  { id: 5, name: "STUDENT_CREATE", tenantId: MOCK_TENANT_ID },
  { id: 6, name: "STUDENT_READ", tenantId: MOCK_TENANT_ID },
  { id: 7, name: "STUDENT_UPDATE", tenantId: MOCK_TENANT_ID },
  { id: 8, name: "STUDENT_DELETE", tenantId: MOCK_TENANT_ID },
  // Student grade permissions
  { id: 9, name: "STUDENT_GRADE_CREATE", tenantId: MOCK_TENANT_ID },
  { id: 10, name: "STUDENT_GRADE_READ", tenantId: MOCK_TENANT_ID },
  { id: 11, name: "STUDENT_GRADE_UPDATE", tenantId: MOCK_TENANT_ID },
  { id: 12, name: "STUDENT_GRADE_DELETE", tenantId: MOCK_TENANT_ID },
  // Student subject registration permissions
  { id: 13, name: "STUDENT_SUBJECT_REGISTRATION_CREATE", tenantId: MOCK_TENANT_ID },
  { id: 14, name: "STUDENT_SUBJECT_REGISTRATION_READ", tenantId: MOCK_TENANT_ID },
  { id: 15, name: "STUDENT_SUBJECT_REGISTRATION_UPDATE", tenantId: MOCK_TENANT_ID },
  { id: 16, name: "STUDENT_SUBJECT_REGISTRATION_DELETE", tenantId: MOCK_TENANT_ID },
  // Class permissions
  { id: 17, name: "CLASS_CREATE", tenantId: MOCK_TENANT_ID },
  { id: 18, name: "CLASS_READ", tenantId: MOCK_TENANT_ID },
  { id: 19, name: "CLASS_UPDATE", tenantId: MOCK_TENANT_ID },
  { id: 20, name: "CLASS_DELETE", tenantId: MOCK_TENANT_ID },
  // Class division permissions
  { id: 21, name: "CLASS_DIVISION_CREATE", tenantId: MOCK_TENANT_ID },
  { id: 22, name: "CLASS_DIVISION_READ", tenantId: MOCK_TENANT_ID },
  { id: 23, name: "CLASS_DIVISION_UPDATE", tenantId: MOCK_TENANT_ID },
  { id: 24, name: "CLASS_DIVISION_DELETE", tenantId: MOCK_TENANT_ID },
  // Class promotion permissions
  { id: 25, name: "CLASS_PROMOTION_CREATE", tenantId: MOCK_TENANT_ID },
  { id: 26, name: "CLASS_PROMOTION_READ", tenantId: MOCK_TENANT_ID },
  { id: 27, name: "CLASS_PROMOTION_UPDATE", tenantId: MOCK_TENANT_ID },
  { id: 28, name: "CLASS_PROMOTION_DELETE", tenantId: MOCK_TENANT_ID },
  // Class term result collation permissions
  { id: 29, name: "CLASS_TERM_RESULT_COLLATION_CREATE", tenantId: MOCK_TENANT_ID },
  { id: 30, name: "CLASS_TERM_RESULT_COLLATION_READ", tenantId: MOCK_TENANT_ID },
  { id: 31, name: "CLASS_TERM_RESULT_COLLATION_UPDATE", tenantId: MOCK_TENANT_ID },
  { id: 32, name: "CLASS_TERM_RESULT_COLLATION_DELETE", tenantId: MOCK_TENANT_ID },
  // Class calendar result collation permissions
  { id: 33, name: "CLASS_CALENDAR_RESULT_COLLATION_CREATE", tenantId: MOCK_TENANT_ID },
  { id: 34, name: "CLASS_CALENDAR_RESULT_COLLATION_READ", tenantId: MOCK_TENANT_ID },
  { id: 35, name: "CLASS_CALENDAR_RESULT_COLLATION_UPDATE", tenantId: MOCK_TENANT_ID },
  { id: 36, name: "CLASS_CALENDAR_RESULT_COLLATION_DELETE", tenantId: MOCK_TENANT_ID },
  // Subject permissions
  { id: 37, name: "SUBJECT_CREATE", tenantId: MOCK_TENANT_ID },
  { id: 38, name: "SUBJECT_READ", tenantId: MOCK_TENANT_ID },
  { id: 39, name: "SUBJECT_UPDATE", tenantId: MOCK_TENANT_ID },
  { id: 40, name: "SUBJECT_DELETE", tenantId: MOCK_TENANT_ID },
  // Subject grade permissions
  { id: 41, name: "SUBJECT_GRADE_CREATE", tenantId: MOCK_TENANT_ID },
  { id: 42, name: "SUBJECT_GRADE_READ", tenantId: MOCK_TENANT_ID },
  { id: 43, name: "SUBJECT_GRADE_UPDATE", tenantId: MOCK_TENANT_ID },
  { id: 44, name: "SUBJECT_GRADE_DELETE", tenantId: MOCK_TENANT_ID },
  // Subject grade breakdown permissions
  { id: 45, name: "SUBJECT_GRADE_BREAKDOWN_CREATE", tenantId: MOCK_TENANT_ID },
  { id: 46, name: "SUBJECT_GRADE_BREAKDOWN_READ", tenantId: MOCK_TENANT_ID },
  { id: 47, name: "SUBJECT_GRADE_BREAKDOWN_UPDATE", tenantId: MOCK_TENANT_ID },
  { id: 48, name: "SUBJECT_GRADE_BREAKDOWN_DELETE", tenantId: MOCK_TENANT_ID },
  // Timetable permissions
  { id: 49, name: "TIMETABLE_CREATE", tenantId: MOCK_TENANT_ID },
  { id: 50, name: "TIMETABLE_READ", tenantId: MOCK_TENANT_ID },
  { id: 51, name: "TIMETABLE_UPDATE", tenantId: MOCK_TENANT_ID },
  { id: 52, name: "TIMETABLE_DELETE", tenantId: MOCK_TENANT_ID },
  // School grading policy permissions
  { id: 53, name: "SCHOOL_GRADING_POLICY_CREATE", tenantId: MOCK_TENANT_ID },
  { id: 54, name: "SCHOOL_GRADING_POLICY_READ", tenantId: MOCK_TENANT_ID },
  { id: 55, name: "SCHOOL_GRADING_POLICY_UPDATE", tenantId: MOCK_TENANT_ID },
  { id: 56, name: "SCHOOL_GRADING_POLICY_DELETE", tenantId: MOCK_TENANT_ID },
  // Period permissions
  { id: 57, name: "PERIOD_CREATE", tenantId: MOCK_TENANT_ID },
  { id: 58, name: "PERIOD_READ", tenantId: MOCK_TENANT_ID },
  { id: 59, name: "PERIOD_UPDATE", tenantId: MOCK_TENANT_ID },
  { id: 60, name: "PERIOD_DELETE", tenantId: MOCK_TENANT_ID },
  // School permissions
  { id: 61, name: "SCHOOL_CREATE", tenantId: MOCK_TENANT_ID },
  { id: 62, name: "SCHOOL_READ", tenantId: MOCK_TENANT_ID },
  { id: 63, name: "SCHOOL_UPDATE", tenantId: MOCK_TENANT_ID },
  { id: 64, name: "SCHOOL_DELETE", tenantId: MOCK_TENANT_ID },
  // School calendar permissions
  { id: 65, name: "SCHOOL_CALENDAR_CREATE", tenantId: MOCK_TENANT_ID },
  { id: 66, name: "SCHOOL_CALENDAR_READ", tenantId: MOCK_TENANT_ID },
  { id: 67, name: "SCHOOL_CALENDAR_UPDATE", tenantId: MOCK_TENANT_ID },
  { id: 68, name: "SCHOOL_CALENDAR_DELETE", tenantId: MOCK_TENANT_ID },
  // School timetable permissions
  { id: 69, name: "SCHOOL_TIMETABLE_CREATE", tenantId: MOCK_TENANT_ID },
  { id: 70, name: "SCHOOL_TIMETABLE_READ", tenantId: MOCK_TENANT_ID },
  { id: 71, name: "SCHOOL_TIMETABLE_UPDATE", tenantId: MOCK_TENANT_ID },
  { id: 72, name: "SCHOOL_TIMETABLE_DELETE", tenantId: MOCK_TENANT_ID },
  // Role permissions
  { id: 73, name: "ROLE_CREATE", tenantId: MOCK_TENANT_ID },
  { id: 74, name: "ROLE_READ", tenantId: MOCK_TENANT_ID },
  { id: 75, name: "ROLE_UPDATE", tenantId: MOCK_TENANT_ID },
  { id: 76, name: "ROLE_DELETE", tenantId: MOCK_TENANT_ID },
];

/**
 * Mock roles list
 * Administrator gets all permissions, Teacher gets teaching-related permissions, Principal gets management permissions
 */
export const mockRoleList: RoleType[] = [
  createRole(
    MOCK_ROLES[0].id,
    MOCK_ROLES[0].name,
    MOCK_ROLES[0].isAdmin,
    MOCK_ROLES[0].description,
    mockPermissions // Administrator gets all permissions
  ),
  createRole(
    MOCK_ROLES[1].id,
    MOCK_ROLES[1].name,
    MOCK_ROLES[1].isAdmin,
    MOCK_ROLES[1].description,
    [
      // Teacher permissions: read-only for most, create/update for grades and subject registration
      ...mockPermissions.filter((p) => p.name.includes("READ")),
      ...mockPermissions.filter((p) => p.name.includes("STUDENT_GRADE")),
      ...mockPermissions.filter((p) => p.name.includes("STUDENT_SUBJECT_REGISTRATION")),
      ...mockPermissions.filter((p) => p.name.includes("SUBJECT_GRADE")),
      ...mockPermissions.filter((p) => p.name.includes("PERIOD_READ")),
      ...mockPermissions.filter((p) => p.name.includes("TIMETABLE_READ")),
    ]
  ),
  createRole(
    MOCK_ROLES[2].id,
    MOCK_ROLES[2].name,
    MOCK_ROLES[2].isAdmin,
    MOCK_ROLES[2].description,
    [
      // Principal permissions: management permissions but not admin-level
      ...mockPermissions.filter((p) => p.name.includes("READ")),
      ...mockPermissions.filter((p) => p.name.includes("CREATE") && !p.name.includes("SCHOOL") && !p.name.includes("ROLE")),
      ...mockPermissions.filter((p) => p.name.includes("UPDATE") && !p.name.includes("SCHOOL") && !p.name.includes("ROLE")),
      ...mockPermissions.filter((p) => p.name.includes("SCHOOL_READ")),
      ...mockPermissions.filter((p) => p.name.includes("ROLE_READ")),
    ]
  ),
];
