import { StudentType, SubjectType, SubjectsRegisteredType, TimetableType } from "@/types";

/**
 * Helper functions for accessing mock data relationships
 * Ensures consistent data access across mock modules
 * Uses lazy imports to avoid circular dependencies
 */

/**
 * Get mock student list (lazy import to avoid circular dependency)
 */
function getMockStudentList(): StudentType[] {
  const { mockStudentList } = require("./data");
  return mockStudentList;
}

/**
 * Get mock subject list (lazy import to avoid circular dependency)
 */
function getMockSubjectList(): SubjectType[] {
  const { mockSubjectList } = require("./data");
  return mockSubjectList;
}

/**
 * Get all students belonging to a specific class division
 */
export function getStudentsByClassDivisionId(classDivisionId: number): StudentType[] {
  return getMockStudentList().filter((student) => student.classDivisionId === classDivisionId);
}

/**
 * Get all students belonging to a specific class
 */
export function getStudentsByClassId(classId: number): StudentType[] {
  return getMockStudentList().filter((student) => student.class.id === classId);
}

/**
 * Get all subjects belonging to a specific class
 */
export function getSubjectsByClassId(classId: number): SubjectType[] {
  return getMockSubjectList().filter((subject) => subject.classId === classId);
}

/**
 * Get subject registrations for a specific student
 */
export function getSubjectRegistrationsByStudentId(studentId: number): SubjectsRegisteredType[] {
  const student = getMockStudentList().find((s) => s.id === studentId);
  return student?.subjectsRegistered || [];
}

/**
 * Get timetables for a specific class division
 */
export function getTimetablesByClassDivisionId(classDivisionId: number): TimetableType[] {
  // Import here to avoid circular dependency
  try {
    const { mockTimetableList } = require("./data/timetables");
    return mockTimetableList?.filter((timetable: TimetableType) => timetable.classDivisionId === classDivisionId) || [];
  } catch {
    return [];
  }
}

/**
 * Create subject registration for a student
 * Note: This function is now in students.ts to avoid circular dependency
 * Use it directly from students.ts if needed
 */
export function createSubjectRegistration(
  id: number,
  studentId: number,
  subjectId: number,
  calendarId: number,
  classId: number,
  classDivisionId?: number
): SubjectsRegisteredType {
  const student = getMockStudentList().find((s) => s.id === studentId);
  const subject = getMockSubjectList().find((s) => s.id === subjectId);
  
  if (!student || !subject) {
    throw new Error(`Student or subject not found: studentId=${studentId}, subjectId=${subjectId}`);
  }

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
 * Get subjects that a student should be registered for based on their class
 */
export function getSubjectsForStudentClass(classId: number): SubjectType[] {
  return getSubjectsByClassId(classId);
}
