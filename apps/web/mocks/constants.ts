/**
 * Shared constants for mock data
 * Ensures consistency across all mock modules
 */

export const MOCK_TENANT_ID = 1;
export const MOCK_TENANT_NAME = "Demo School";

// Staff IDs and names
export const MOCK_STAFF = {
  ADMIN: { id: 1, firstName: "John", lastName: "Doe", email: "admin@example.com", jobTitle: "Administrator" },
  TEACHER_1: { id: 2, firstName: "Jane", lastName: "Smith", email: "teacher@example.com", jobTitle: "Mathematics Teacher" },
  TEACHER_2: { id: 3, firstName: "Michael", lastName: "Johnson", email: "michael.johnson@example.com", jobTitle: "English Teacher" },
  TEACHER_3: { id: 4, firstName: "Sarah", lastName: "Williams", email: "sarah.williams@example.com", jobTitle: "Physics Teacher" },
  TEACHER_4: { id: 5, firstName: "David", lastName: "Brown", email: "david.brown@example.com", jobTitle: "Chemistry Teacher" },
} as const;

// Student IDs and names
export const MOCK_STUDENTS = [
  { id: 1, admissionNo: "ADM001", firstName: "Alice", lastName: "Johnson", email: "alice.johnson@example.com", classId: 1, classDivisionId: 1 },
  { id: 2, admissionNo: "ADM002", firstName: "Bob", lastName: "Williams", email: "bob.williams@example.com", classId: 1, classDivisionId: 1 },
  { id: 3, admissionNo: "ADM003", firstName: "Charlie", lastName: "Brown", email: "charlie.brown@example.com", classId: 1, classDivisionId: 2 },
  { id: 4, admissionNo: "ADM004", firstName: "Diana", lastName: "Davis", email: "diana.davis@example.com", classId: 2, classDivisionId: 1 },
  { id: 5, admissionNo: "ADM005", firstName: "Eve", lastName: "Miller", email: "eve.miller@example.com", classId: 2, classDivisionId: 2 },
  { id: 6, admissionNo: "ADM006", firstName: "Frank", lastName: "Wilson", email: "frank.wilson@example.com", classId: 2, classDivisionId: 3 },
  { id: 7, admissionNo: "ADM007", firstName: "Grace", lastName: "Moore", email: "grace.moore@example.com", classId: 3, classDivisionId: 1 },
  { id: 8, admissionNo: "ADM008", firstName: "Henry", lastName: "Taylor", email: "henry.taylor@example.com", classId: 3, classDivisionId: 2 },
  { id: 9, admissionNo: "ADM009", firstName: "Ivy", lastName: "Anderson", email: "ivy.anderson@example.com", classId: 3, classDivisionId: 3 },
  { id: 10, admissionNo: "ADM010", firstName: "Jack", lastName: "Thomas", email: "jack.thomas@example.com", classId: 1, classDivisionId: 3 },
] as const;

// Class IDs and names
export const MOCK_CLASSES = [
  { id: 1, name: "SS 1", classTeacherId: MOCK_STAFF.TEACHER_1.id },
  { id: 2, name: "SS 2", classTeacherId: MOCK_STAFF.TEACHER_2.id },
  { id: 3, name: "SS 3", classTeacherId: MOCK_STAFF.TEACHER_3.id },
  { id: 4, name: "JSS 1", classTeacherId: MOCK_STAFF.TEACHER_1.id },
  { id: 5, name: "JSS 2", classTeacherId: MOCK_STAFF.TEACHER_2.id },
  { id: 6, name: "JSS 3", classTeacherId: MOCK_STAFF.TEACHER_3.id },
] as const;

// Class Division IDs - divisions per class (A, B, C)
export const MOCK_CLASS_DIVISIONS = [
  { id: 1, name: "A", classId: 1, classDivisionTeacherId: MOCK_STAFF.ADMIN.id },
  { id: 2, name: "B", classId: 1, classDivisionTeacherId: MOCK_STAFF.TEACHER_1.id },
  { id: 3, name: "C", classId: 1, classDivisionTeacherId: MOCK_STAFF.TEACHER_2.id },
  { id: 4, name: "A", classId: 2, classDivisionTeacherId: MOCK_STAFF.TEACHER_2.id },
  { id: 5, name: "B", classId: 2, classDivisionTeacherId: MOCK_STAFF.TEACHER_3.id },
  { id: 6, name: "C", classId: 2, classDivisionTeacherId: MOCK_STAFF.TEACHER_4.id },
  { id: 7, name: "A", classId: 3, classDivisionTeacherId: MOCK_STAFF.TEACHER_3.id },
  { id: 8, name: "B", classId: 3, classDivisionTeacherId: MOCK_STAFF.TEACHER_4.id },
  { id: 9, name: "C", classId: 3, classDivisionTeacherId: MOCK_STAFF.ADMIN.id },
] as const;

// Subject IDs and names
export const MOCK_SUBJECTS = [
  { id: 1, name: "Mathematics", description: "Mathematics subject", classId: 1 },
  { id: 2, name: "English", description: "English Language", classId: 1 },
  { id: 3, name: "Physics", description: "Physics subject", classId: 2 },
  { id: 4, name: "Chemistry", description: "Chemistry subject", classId: 2 },
  { id: 5, name: "Biology", description: "Biology subject", classId: 2 },
  { id: 6, name: "Geography", description: "Geography subject", classId: 3 },
] as const;

// Role IDs and names
export const MOCK_ROLES = [
  { id: 1, name: "Administrator", isAdmin: true, description: "Full system access" },
  { id: 2, name: "Teacher", isAdmin: false, description: "Teaching staff role" },
  { id: 3, name: "Principal", isAdmin: false, description: "School principal role" },
] as const;

// Calendar/Term IDs
export const MOCK_CALENDAR = {
  id: 1,
  year: 2024,
  terms: [
    { id: 1, name: "First Term", startDate: "2024-09-01", endDate: "2024-12-15" },
    { id: 2, name: "Second Term", startDate: "2025-01-08", endDate: "2025-04-15" },
    { id: 3, name: "Third Term", startDate: "2025-05-01", endDate: "2025-07-15" },
  ],
} as const;

// Shared dates
export const getTodayISO = () => new Date().toISOString().split("T")[0];
export const getEnrollmentDate = () => new Date().toISOString();
export const getStartDate = () => new Date().toISOString();

// Phone number generator
export const getPhoneNumber = (id: number) => `+234${800000000 + id}`;

// NIN generator
export const getNIN = (id: number) => `NIN${id.toString().padStart(10, "0")}`;

// Student ID generator
export const getStudentId = (id: number) => `STU${id.toString().padStart(6, "0")}`;
