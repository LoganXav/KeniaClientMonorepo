import {
  createAtRiskStudent,
  createSubjectFailure,
  createTeacherImpact,
} from "../factories/analytics";
import { mockStudentList } from "./students";
import { mockSubjectList } from "./subjects";
import { mockStaffList } from "./staff";
import { mockClassList } from "./classes";
import { AtRiskStudent, SubjectFailure, TeacherImpact } from "@/app/@protected/(staff-portal)/analytics/_types/analytics-types";
import { MOCK_CLASSES } from "../constants";

/**
 * Mock at-risk students data
 * Expanded to 20 students across all classes, sorted by risk score (highest first)
 */
export const mockAtRiskStudents: AtRiskStudent[] = [
  // SS 1 students
  createAtRiskStudent(
    mockStudentList[0]?.id || 1,
    `${mockStudentList[0]?.user.firstName || "Alice"} ${mockStudentList[0]?.user.lastName || "Johnson"}`,
    mockStudentList[0]?.class?.name || "SS 1",
    52,
    38,
    92,
    "Low attendance (52%) + declining scores (38%)",
    mockStudentList[0]?.classId || 1
  ),
  createAtRiskStudent(
    mockStudentList[2]?.id || 3,
    `${mockStudentList[2]?.user.firstName || "Charlie"} ${mockStudentList[2]?.user.lastName || "Brown"}`,
    mockStudentList[2]?.class?.name || "SS 1",
    48,
    42,
    88,
    "Very low attendance (48%) + below average scores",
    mockStudentList[2]?.classId || 1
  ),
  createAtRiskStudent(
    mockStudentList[1]?.id || 2,
    `${mockStudentList[1]?.user.firstName || "Bob"} ${mockStudentList[1]?.user.lastName || "Williams"}`,
    mockStudentList[1]?.class?.name || "SS 1",
    62,
    48,
    82,
    "Declining performance trend + attendance issues",
    mockStudentList[1]?.classId || 1
  ),
  createAtRiskStudent(
    mockStudentList[9]?.id || 10,
    `${mockStudentList[9]?.user.firstName || "Jack"} ${mockStudentList[9]?.user.lastName || "Thomas"}`,
    mockStudentList[9]?.class?.name || "SS 1",
    58,
    50,
    78,
    "Below average attendance and scores",
    mockStudentList[9]?.classId || 1
  ),
  createAtRiskStudent(
    mockStudentList[10]?.id || 11,
    `${mockStudentList[10]?.user.firstName || "Kate"} ${mockStudentList[10]?.user.lastName || "Martinez"}`,
    mockStudentList[10]?.class?.name || "SS 1",
    65,
    55,
    75,
    "Attendance concerns + inconsistent performance",
    mockStudentList[10]?.classId || 1
  ),
  // SS 2 students
  createAtRiskStudent(
    mockStudentList[5]?.id || 6,
    `${mockStudentList[5]?.user.firstName || "Frank"} ${mockStudentList[5]?.user.lastName || "Wilson"}`,
    mockStudentList[5]?.class?.name || "SS 2",
    55,
    45,
    85,
    "Low attendance + multiple failed subjects",
    mockStudentList[5]?.classId || 2
  ),
  createAtRiskStudent(
    mockStudentList[3]?.id || 4,
    `${mockStudentList[3]?.user.firstName || "Diana"} ${mockStudentList[3]?.user.lastName || "Davis"}`,
    mockStudentList[3]?.class?.name || "SS 2",
    65,
    52,
    75,
    "Attendance improving but scores still low",
    mockStudentList[3]?.classId || 2
  ),
  createAtRiskStudent(
    mockStudentList[4]?.id || 5,
    `${mockStudentList[4]?.user.firstName || "Eve"} ${mockStudentList[4]?.user.lastName || "Miller"}`,
    mockStudentList[4]?.class?.name || "SS 2",
    68,
    58,
    70,
    "Scores improving but attendance concerns",
    mockStudentList[4]?.classId || 2
  ),
  createAtRiskStudent(
    mockStudentList[12]?.id || 13,
    `${mockStudentList[12]?.user.firstName || "Maya"} ${mockStudentList[12]?.user.lastName || "Rodriguez"}`,
    mockStudentList[12]?.class?.name || "SS 2",
    60,
    50,
    72,
    "Moderate risk - needs support",
    mockStudentList[12]?.classId || 2
  ),
  createAtRiskStudent(
    mockStudentList[13]?.id || 14,
    `${mockStudentList[13]?.user.firstName || "Noah"} ${mockStudentList[13]?.user.lastName || "Lee"}`,
    mockStudentList[13]?.class?.name || "SS 2",
    70,
    60,
    68,
    "Borderline performance",
    mockStudentList[13]?.classId || 2
  ),
  createAtRiskStudent(
    mockStudentList[14]?.id || 15,
    `${mockStudentList[14]?.user.firstName || "Olivia"} ${mockStudentList[14]?.user.lastName || "White"}`,
    mockStudentList[14]?.class?.name || "SS 2",
    72,
    62,
    65,
    "Low risk but monitoring needed",
    mockStudentList[14]?.classId || 2
  ),
  // SS 3 students
  createAtRiskStudent(
    mockStudentList[6]?.id || 7,
    `${mockStudentList[6]?.user.firstName || "Grace"} ${mockStudentList[6]?.user.lastName || "Moore"}`,
    mockStudentList[6]?.class?.name || "SS 3",
    70,
    55,
    72,
    "Moderate risk - needs monitoring",
    mockStudentList[6]?.classId || 3
  ),
  createAtRiskStudent(
    mockStudentList[7]?.id || 8,
    `${mockStudentList[7]?.user.firstName || "Henry"} ${mockStudentList[7]?.user.lastName || "Taylor"}`,
    mockStudentList[7]?.class?.name || "SS 3",
    72,
    60,
    68,
    "Borderline performance - intervention recommended",
    mockStudentList[7]?.classId || 3
  ),
  createAtRiskStudent(
    mockStudentList[8]?.id || 9,
    `${mockStudentList[8]?.user.firstName || "Ivy"} ${mockStudentList[8]?.user.lastName || "Anderson"}`,
    mockStudentList[8]?.class?.name || "SS 3",
    75,
    62,
    65,
    "Low risk but requires attention",
    mockStudentList[8]?.classId || 3
  ),
  createAtRiskStudent(
    mockStudentList[15]?.id || 16,
    `${mockStudentList[15]?.user.firstName || "Peter"} ${mockStudentList[15]?.user.lastName || "Harris"}`,
    mockStudentList[15]?.class?.name || "SS 3",
    68,
    58,
    70,
    "Performance declining",
    mockStudentList[15]?.classId || 3
  ),
  createAtRiskStudent(
    mockStudentList[16]?.id || 17,
    `${mockStudentList[16]?.user.firstName || "Quinn"} ${mockStudentList[16]?.user.lastName || "Clark"}`,
    mockStudentList[16]?.class?.name || "SS 3",
    73,
    63,
    66,
    "Needs academic support",
    mockStudentList[16]?.classId || 3
  ),
  // JSS 1 students
  createAtRiskStudent(
    mockStudentList[17]?.id || 18,
    `${mockStudentList[17]?.user.firstName || "Rachel"} ${mockStudentList[17]?.user.lastName || "Lewis"}`,
    mockStudentList[17]?.class?.name || "JSS 1",
    66,
    56,
    74,
    "Transition challenges",
    mockStudentList[17]?.classId || 4
  ),
  createAtRiskStudent(
    mockStudentList[18]?.id || 19,
    `${mockStudentList[18]?.user.firstName || "Samuel"} ${mockStudentList[18]?.user.lastName || "Walker"}`,
    mockStudentList[18]?.class?.name || "JSS 1",
    64,
    54,
    76,
    "Low engagement",
    mockStudentList[18]?.classId || 4
  ),
  // JSS 2 students
  createAtRiskStudent(
    mockStudentList[21]?.id || 22,
    `${mockStudentList[21]?.user.firstName || "Victor"} ${mockStudentList[21]?.user.lastName || "Young"}`,
    mockStudentList[21]?.class?.name || "JSS 2",
    69,
    59,
    71,
    "Academic support needed",
    mockStudentList[21]?.classId || 5
  ),
  // JSS 3 students
  createAtRiskStudent(
    mockStudentList[24]?.id || 25,
    `${mockStudentList[24]?.user.firstName || "Yara"} ${mockStudentList[24]?.user.lastName || "Lopez"}`,
    mockStudentList[24]?.class?.name || "JSS 3",
    71,
    61,
    69,
    "Preparing for SS transition",
    mockStudentList[24]?.classId || 6
  ),
].sort((a, b) => b.riskScore - a.riskScore); // Sort by risk score descending

/**
 * Mock subject failures data
 * Expanded to 15+ subjects across all classes, sorted by failure rate (highest first)
 */
export const mockSubjectFailures: SubjectFailure[] = [
  // SS 1 subjects
  createSubjectFailure(
    mockSubjectList.find((s) => s.name.toLowerCase().includes("mathematics") && s.classId === 1)?.name || "Mathematics",
    35,
    48,
    45,
    1
  ),
  createSubjectFailure(
    mockSubjectList.find((s) => s.name.toLowerCase().includes("english") && s.classId === 1)?.name || "English Language",
    28,
    52,
    42,
    1
  ),
  createSubjectFailure(
    mockSubjectList.find((s) => s.name.toLowerCase().includes("basic science") && s.classId === 1)?.name || "Basic Science",
    22,
    56,
    38,
    1
  ),
  // SS 2 subjects
  createSubjectFailure(
    mockSubjectList.find((s) => s.name.toLowerCase().includes("physics") && s.classId === 2)?.name || "Physics",
    32,
    50,
    38,
    2
  ),
  createSubjectFailure(
    mockSubjectList.find((s) => s.name.toLowerCase().includes("chemistry") && s.classId === 2)?.name || "Chemistry",
    28,
    53,
    42,
    2
  ),
  createSubjectFailure(
    mockSubjectList.find((s) => s.name.toLowerCase().includes("biology") && s.classId === 2)?.name || "Biology",
    25,
    55,
    35,
    2
  ),
  createSubjectFailure(
    mockSubjectList.find((s) => s.name.toLowerCase().includes("economics") && s.classId === 2)?.name || "Economics",
    20,
    58,
    28,
    2
  ),
  createSubjectFailure(
    mockSubjectList.find((s) => s.name.toLowerCase().includes("literature") && s.classId === 2)?.name || "Literature",
    18,
    60,
    32,
    2
  ),
  // SS 3 subjects
  createSubjectFailure(
    mockSubjectList.find((s) => s.name.toLowerCase().includes("geography") && s.classId === 3)?.name || "Geography",
    15,
    62,
    32,
    3
  ),
  createSubjectFailure(
    mockSubjectList.find((s) => s.name.toLowerCase().includes("history") && s.classId === 3)?.name || "History",
    12,
    65,
    25,
    3
  ),
  createSubjectFailure(
    mockSubjectList.find((s) => s.name.toLowerCase().includes("government") && s.classId === 3)?.name || "Government",
    10,
    68,
    22,
    3
  ),
  createSubjectFailure(
    mockSubjectList.find((s) => s.name.toLowerCase().includes("further mathematics") && s.classId === 3)?.name || "Further Mathematics",
    30,
    45,
    18,
    3
  ),
  // JSS 1 subjects
  createSubjectFailure(
    mockSubjectList.find((s) => s.name.toLowerCase().includes("basic mathematics") && s.classId === 4)?.name || "Basic Mathematics",
    24,
    54,
    28,
    4
  ),
  createSubjectFailure(
    mockSubjectList.find((s) => s.name.toLowerCase().includes("english studies") && s.classId === 4)?.name || "English Studies",
    20,
    57,
    30,
    4
  ),
  // JSS 2 subjects
  createSubjectFailure(
    mockSubjectList.find((s) => s.name.toLowerCase().includes("mathematics") && s.classId === 5)?.name || "Mathematics",
    22,
    55,
    25,
    5
  ),
  createSubjectFailure(
    mockSubjectList.find((s) => s.name.toLowerCase().includes("integrated science") && s.classId === 5)?.name || "Integrated Science",
    19,
    58,
    27,
    5
  ),
  // JSS 3 subjects
  createSubjectFailure(
    mockSubjectList.find((s) => s.name.toLowerCase().includes("mathematics") && s.classId === 6)?.name || "Mathematics",
    20,
    56,
    24,
    6
  ),
  createSubjectFailure(
    mockSubjectList.find((s) => s.name.toLowerCase().includes("computer studies") && s.classId === 6)?.name || "Computer Studies",
    16,
    60,
    20,
    6
  ),
].sort((a, b) => b.failureRate - a.failureRate); // Sort by failure rate descending

/**
 * Mock teacher impact data
 * All teachers with proper class assignments based on classTeacherId
 * Teachers sorted by impact (highest first)
 */
export const mockTeacherImpact: TeacherImpact[] = [
  // TEACHER_1 (id: 2) - teaches SS 1 (id: 1) and JSS 1 (id: 4)
  createTeacherImpact(
    mockStaffList[1]?.id || 2,
    `${mockStaffList[1]?.user.firstName || "Jane"} ${mockStaffList[1]?.user.lastName || "Smith"}`,
    "Mathematics",
    28,
    2,
    [1, 4] // SS 1 and JSS 1
  ),
  // TEACHER_2 (id: 3) - teaches SS 2 (id: 2) and JSS 2 (id: 5)
  createTeacherImpact(
    mockStaffList[2]?.id || 3,
    `${mockStaffList[2]?.user.firstName || "Michael"} ${mockStaffList[2]?.user.lastName || "Johnson"}`,
    "English Language",
    26,
    2,
    [2, 5] // SS 2 and JSS 2
  ),
  // TEACHER_3 (id: 4) - teaches SS 3 (id: 3) and JSS 3 (id: 6)
  createTeacherImpact(
    mockStaffList[3]?.id || 4,
    `${mockStaffList[3]?.user.firstName || "Sarah"} ${mockStaffList[3]?.user.lastName || "Williams"}`,
    "Physics",
    24,
    2,
    [3, 6] // SS 3 and JSS 3
  ),
  // TEACHER_4 (id: 5) - teaches Chemistry (assigned to SS 2)
  createTeacherImpact(
    mockStaffList[4]?.id || 5,
    `${mockStaffList[4]?.user.firstName || "David"} ${mockStaffList[4]?.user.lastName || "Brown"}`,
    "Chemistry",
    22,
    1,
    [2] // SS 2
  ),
  // TEACHER_1 also teaches Biology
  createTeacherImpact(
    mockStaffList[1]?.id || 2,
    `${mockStaffList[1]?.user.firstName || "Jane"} ${mockStaffList[1]?.user.lastName || "Smith"}`,
    "Biology",
    20,
    1,
    [2] // SS 2
  ),
  // TEACHER_2 also teaches Literature
  createTeacherImpact(
    mockStaffList[2]?.id || 3,
    `${mockStaffList[2]?.user.firstName || "Michael"} ${mockStaffList[2]?.user.lastName || "Johnson"}`,
    "Literature",
    18,
    1,
    [2] // SS 2
  ),
  // TEACHER_3 also teaches Geography
  createTeacherImpact(
    mockStaffList[3]?.id || 4,
    `${mockStaffList[3]?.user.firstName || "Sarah"} ${mockStaffList[3]?.user.lastName || "Williams"}`,
    "Geography",
    16,
    1,
    [3] // SS 3
  ),
].sort((a, b) => b.avgStudentImprovement - a.avgStudentImprovement); // Sort by improvement descending
