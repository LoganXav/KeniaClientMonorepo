/**
 * Shared constants for mock data
 * Ensures consistency across all mock modules
 */

export const MOCK_TENANT_ID = 1;
export const MOCK_TENANT_NAME = "Demo School";

// Staff IDs and names
export const MOCK_STAFF = {
  ADMIN: { id: 1, firstName: "Yasser", lastName: "ElBahr", email: "admin@example.com", jobTitle: "Administrator" },
  TEACHER_1: { id: 2, firstName: "Jane", lastName: "Smith", email: "teacher@example.com", jobTitle: "Mathematics Teacher" },
  TEACHER_2: { id: 3, firstName: "Michael", lastName: "Johnson", email: "michael.johnson@example.com", jobTitle: "English Teacher" },
  TEACHER_3: { id: 4, firstName: "Sarah", lastName: "Williams", email: "sarah.williams@example.com", jobTitle: "Physics Teacher" },
  TEACHER_4: { id: 5, firstName: "David", lastName: "Brown", email: "david.brown@example.com", jobTitle: "Chemistry Teacher" },
} as const;

// Student IDs and names - Expanded to 25 students across all classes
export const MOCK_STUDENTS = [
  // SS 1 students (classId: 1)
  { id: 1, admissionNo: "ADM001", firstName: "Alice", lastName: "Johnson", email: "alice.johnson@example.com", classId: 1, classDivisionId: 1 },
  { id: 2, admissionNo: "ADM002", firstName: "Bob", lastName: "Williams", email: "bob.williams@example.com", classId: 1, classDivisionId: 1 },
  { id: 3, admissionNo: "ADM003", firstName: "Charlie", lastName: "Brown", email: "charlie.brown@example.com", classId: 1, classDivisionId: 2 },
  { id: 10, admissionNo: "ADM010", firstName: "Jack", lastName: "Thomas", email: "jack.thomas@example.com", classId: 1, classDivisionId: 3 },
  { id: 11, admissionNo: "ADM011", firstName: "Kate", lastName: "Martinez", email: "kate.martinez@example.com", classId: 1, classDivisionId: 1 },
  { id: 12, admissionNo: "ADM012", firstName: "Liam", lastName: "Garcia", email: "liam.garcia@example.com", classId: 1, classDivisionId: 2 },
  // SS 2 students (classId: 2)
  { id: 4, admissionNo: "ADM004", firstName: "Diana", lastName: "Davis", email: "diana.davis@example.com", classId: 2, classDivisionId: 1 },
  { id: 5, admissionNo: "ADM005", firstName: "Eve", lastName: "Miller", email: "eve.miller@example.com", classId: 2, classDivisionId: 2 },
  { id: 6, admissionNo: "ADM006", firstName: "Frank", lastName: "Wilson", email: "frank.wilson@example.com", classId: 2, classDivisionId: 3 },
  { id: 13, admissionNo: "ADM013", firstName: "Maya", lastName: "Rodriguez", email: "maya.rodriguez@example.com", classId: 2, classDivisionId: 1 },
  { id: 14, admissionNo: "ADM014", firstName: "Noah", lastName: "Lee", email: "noah.lee@example.com", classId: 2, classDivisionId: 2 },
  { id: 15, admissionNo: "ADM015", firstName: "Olivia", lastName: "White", email: "olivia.white@example.com", classId: 2, classDivisionId: 3 },
  // SS 3 students (classId: 3)
  { id: 7, admissionNo: "ADM007", firstName: "Grace", lastName: "Moore", email: "grace.moore@example.com", classId: 3, classDivisionId: 1 },
  { id: 8, admissionNo: "ADM008", firstName: "Henry", lastName: "Taylor", email: "henry.taylor@example.com", classId: 3, classDivisionId: 2 },
  { id: 9, admissionNo: "ADM009", firstName: "Ivy", lastName: "Anderson", email: "ivy.anderson@example.com", classId: 3, classDivisionId: 3 },
  { id: 16, admissionNo: "ADM016", firstName: "Peter", lastName: "Harris", email: "peter.harris@example.com", classId: 3, classDivisionId: 1 },
  { id: 17, admissionNo: "ADM017", firstName: "Quinn", lastName: "Clark", email: "quinn.clark@example.com", classId: 3, classDivisionId: 2 },
  // JSS 1 students (classId: 4)
  { id: 18, admissionNo: "ADM018", firstName: "Rachel", lastName: "Lewis", email: "rachel.lewis@example.com", classId: 4, classDivisionId: 1 },
  { id: 19, admissionNo: "ADM019", firstName: "Samuel", lastName: "Walker", email: "samuel.walker@example.com", classId: 4, classDivisionId: 2 },
  { id: 20, admissionNo: "ADM020", firstName: "Tina", lastName: "Hall", email: "tina.hall@example.com", classId: 4, classDivisionId: 3 },
  { id: 21, admissionNo: "ADM021", firstName: "Uma", lastName: "Allen", email: "uma.allen@example.com", classId: 4, classDivisionId: 1 },
  // JSS 2 students (classId: 5)
  { id: 22, admissionNo: "ADM022", firstName: "Victor", lastName: "Young", email: "victor.young@example.com", classId: 5, classDivisionId: 1 },
  { id: 23, admissionNo: "ADM023", firstName: "Wendy", lastName: "King", email: "wendy.king@example.com", classId: 5, classDivisionId: 2 },
  { id: 24, admissionNo: "ADM024", firstName: "Xavier", lastName: "Wright", email: "xavier.wright@example.com", classId: 5, classDivisionId: 3 },
  // JSS 3 students (classId: 6)
  { id: 25, admissionNo: "ADM025", firstName: "Yara", lastName: "Lopez", email: "yara.lopez@example.com", classId: 6, classDivisionId: 1 },
  { id: 26, admissionNo: "ADM026", firstName: "Zach", lastName: "Hill", email: "zach.hill@example.com", classId: 6, classDivisionId: 2 },
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
  { id: 10, name: "A", classId: 4, classDivisionTeacherId: MOCK_STAFF.TEACHER_1.id },
  { id: 11, name: "B", classId: 4, classDivisionTeacherId: MOCK_STAFF.TEACHER_2.id },
  { id: 12, name: "C", classId: 4, classDivisionTeacherId: MOCK_STAFF.TEACHER_3.id },
  { id: 13, name: "A", classId: 5, classDivisionTeacherId: MOCK_STAFF.TEACHER_2.id },
  { id: 14, name: "B", classId: 5, classDivisionTeacherId: MOCK_STAFF.TEACHER_3.id },
  { id: 15, name: "C", classId: 5, classDivisionTeacherId: MOCK_STAFF.TEACHER_4.id },
  { id: 16, name: "A", classId: 6, classDivisionTeacherId: MOCK_STAFF.TEACHER_3.id },
  { id: 17, name: "B", classId: 6, classDivisionTeacherId: MOCK_STAFF.TEACHER_4.id },
  { id: 18, name: "C", classId: 6, classDivisionTeacherId: MOCK_STAFF.TEACHER_1.id },
] as const;

// Subject IDs and names - Expanded to cover all classes (at least 2-3 subjects per class)
export const MOCK_SUBJECTS = [
  // SS 1 subjects (classId: 1)
  { id: 1, name: "Mathematics", description: "Mathematics subject", classId: 1 },
  { id: 2, name: "English Language", description: "English Language", classId: 1 },
  { id: 7, name: "Basic Science", description: "Basic Science", classId: 1 },
  { id: 8, name: "Social Studies", description: "Social Studies", classId: 1 },
  // SS 2 subjects (classId: 2)
  { id: 3, name: "Physics", description: "Physics subject", classId: 2 },
  { id: 4, name: "Chemistry", description: "Chemistry subject", classId: 2 },
  { id: 5, name: "Biology", description: "Biology subject", classId: 2 },
  { id: 9, name: "Economics", description: "Economics", classId: 2 },
  { id: 10, name: "Literature", description: "Literature in English", classId: 2 },
  // SS 3 subjects (classId: 3)
  { id: 6, name: "Geography", description: "Geography subject", classId: 3 },
  { id: 11, name: "History", description: "History", classId: 3 },
  { id: 12, name: "Government", description: "Government", classId: 3 },
  { id: 13, name: "Further Mathematics", description: "Further Mathematics", classId: 3 },
  // JSS 1 subjects (classId: 4)
  { id: 14, name: "Basic Mathematics", description: "Basic Mathematics", classId: 4 },
  { id: 15, name: "English Studies", description: "English Studies", classId: 4 },
  { id: 16, name: "Basic Technology", description: "Basic Technology", classId: 4 },
  { id: 17, name: "Agricultural Science", description: "Agricultural Science", classId: 4 },
  // JSS 2 subjects (classId: 5)
  { id: 18, name: "Mathematics", description: "Mathematics", classId: 5 },
  { id: 19, name: "English Language", description: "English Language", classId: 5 },
  { id: 20, name: "Integrated Science", description: "Integrated Science", classId: 5 },
  { id: 21, name: "Business Studies", description: "Business Studies", classId: 5 },
  // JSS 3 subjects (classId: 6)
  { id: 22, name: "Mathematics", description: "Mathematics", classId: 6 },
  { id: 23, name: "English Language", description: "English Language", classId: 6 },
  { id: 24, name: "Computer Studies", description: "Computer Studies", classId: 6 },
  { id: 25, name: "Civic Education", description: "Civic Education", classId: 6 },
] as const;

// Role IDs and names
export const MOCK_ROLES = [
  { id: 1, name: "Administrator", isAdmin: true, description: "Full system access" },
  { id: 2, name: "Teacher", isAdmin: false, description: "Teaching staff role" },
  { id: 3, name: "ICT & Role Manager", isAdmin: false, description: "ICT & Role Manager role" },
  { id: 4, name: "Records & Registry Clerk", isAdmin: false, description: "Records & Registry Clerk role" },
  
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
