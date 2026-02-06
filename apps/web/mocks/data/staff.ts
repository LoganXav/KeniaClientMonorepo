import { createStaff } from "../factories/staff";
import { StaffType } from "@/types";
import { MOCK_STAFF, MOCK_ROLES } from "../constants";
import { createRole } from "../factories/role";
import { mockRoleList } from "./roles";

/**
 * Mock staff list
 * Uses consistent IDs and relationships
 */
export const mockStaffList: StaffType[] = [
  createStaff(
    MOCK_STAFF.ADMIN.id,
    MOCK_STAFF.ADMIN.firstName,
    MOCK_STAFF.ADMIN.lastName,
    MOCK_STAFF.ADMIN.email,
    MOCK_STAFF.ADMIN.jobTitle,
    MOCK_ROLES[0].id,
    mockRoleList[0]
  ),
  createStaff(
    MOCK_STAFF.TEACHER_1.id,
    MOCK_STAFF.TEACHER_1.firstName,
    MOCK_STAFF.TEACHER_1.lastName,
    MOCK_STAFF.TEACHER_1.email,
    MOCK_STAFF.TEACHER_1.jobTitle,
    MOCK_ROLES[1].id,
    mockRoleList[1]
  ),
  createStaff(
    MOCK_STAFF.TEACHER_2.id,
    MOCK_STAFF.TEACHER_2.firstName,
    MOCK_STAFF.TEACHER_2.lastName,
    MOCK_STAFF.TEACHER_2.email,
    MOCK_STAFF.TEACHER_2.jobTitle,
    MOCK_ROLES[1].id,
    mockRoleList[1]
  ),
  createStaff(
    MOCK_STAFF.TEACHER_3.id,
    MOCK_STAFF.TEACHER_3.firstName,
    MOCK_STAFF.TEACHER_3.lastName,
    MOCK_STAFF.TEACHER_3.email,
    MOCK_STAFF.TEACHER_3.jobTitle,
    MOCK_ROLES[1].id,
    mockRoleList[1]
  ),
  createStaff(
    MOCK_STAFF.TEACHER_4.id,
    MOCK_STAFF.TEACHER_4.firstName,
    MOCK_STAFF.TEACHER_4.lastName,
    MOCK_STAFF.TEACHER_4.email,
    MOCK_STAFF.TEACHER_4.jobTitle,
    MOCK_ROLES[1].id,
    mockRoleList[1]
  ),
];
