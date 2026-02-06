import { createStudent } from "../factories/student";
import { StudentType, SubjectsRegisteredType, SubjectType } from "@/types";
import { MOCK_STUDENTS, MOCK_CALENDAR } from "../constants";
import { mockClassList } from "./classes";
import { mockSubjectList } from "./subjects";

/**
 * Create subject registration for a student
 * Local helper to avoid circular dependency
 */
function createSubjectRegistration(
  id: number,
  studentId: number,
  subject: SubjectType,
  student: StudentType
): SubjectsRegisteredType {
  return {
    id,
    name: subject.name,
    description: subject.description,
    subjectId: subject.id,
    subject: subject,
    student: student,
  };
}

/**
 * Mock students list
 * Uses consistent IDs and relationships
 * Each student is registered for subjects belonging to their class
 */
export const mockStudentList: StudentType[] = MOCK_STUDENTS.map((studentConst) => {
  const classObj = mockClassList.find((c) => c.id === studentConst.classId);
  
  // Get subjects for this student's class
  const classSubjects = mockSubjectList.filter((subject) => subject.classId === studentConst.classId);
  
  // Create student first (without subject registrations)
  const student = createStudent(
    studentConst.id,
    studentConst.admissionNo,
    studentConst.firstName,
    studentConst.lastName,
    studentConst.email,
    studentConst.classId,
    studentConst.classDivisionId,
    classObj,
    undefined, // userOverrides
    [], // guardians
    [], // subjectGrades (will be populated separately if needed)
    [] // subjectsRegistered (will be populated below)
  );
  
  // Create subject registrations for this student
  const subjectsRegistered: SubjectsRegisteredType[] = classSubjects.map((subject, index) =>
    createSubjectRegistration(
      studentConst.id * 100 + index + 1, // Unique ID for each registration
      studentConst.id,
      subject,
      student
    )
  );
  
  // Update student with subject registrations
  student.subjectsRegistered = subjectsRegistered;
  
  return student;
});
