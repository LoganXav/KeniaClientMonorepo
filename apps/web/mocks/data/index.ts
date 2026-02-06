export * from "./tenant";
export * from "./roles";
export * from "./classes";
export * from "./subjects";
export * from "./staff";
export * from "./students";
export * from "./class-divisions";
export * from "./calendar";
export * from "./periods";
export * from "./timetables";
export * from "./analytics";

// Initialize relationships after all data is loaded
import { mockClassList } from "./classes";
import { mockClassDivisionList } from "./class-divisions";
import { mockStudentList } from "./students";
import { mockStaffList } from "./staff";
import { mockRoleList } from "./roles";
import { getStudentsByClassId, getStudentsByClassDivisionId } from "../helpers";

// Populate students in classes
mockClassList.forEach((cls) => {
  cls.students = getStudentsByClassId(cls.id);
});

// Populate students in class divisions
mockClassDivisionList.forEach((div) => {
  div.students = getStudentsByClassDivisionId(div.id);
});

// Populate staff in roles
mockRoleList.forEach((role) => {
  role.staff = mockStaffList.filter((staff) => staff.roleId === role.id);
});
