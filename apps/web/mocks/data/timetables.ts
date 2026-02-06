import { TimetablePeriodType, TimetableType, PeriodType } from "@/types";
import { mockClassDivisionList } from "./class-divisions";
import { mockSubjectList } from "./subjects";
import { MOCK_CLASS_DIVISIONS, MOCK_CALENDAR } from "../constants";

/**
 * Mock timetable periods data (for display purposes)
 */
export const mockTimetablePeriodList: TimetablePeriodType[] = [
  { start: "08:00", end: "09:00", title: "Mathematics" },
  { start: "09:15", end: "10:15", title: "English" },
  { start: "10:30", end: "11:30", title: "Physics" },
  { start: "11:45", end: "12:45", title: "Chemistry" },
  { start: "13:00", end: "14:00", title: "Break" },
  { start: "14:15", end: "15:15", title: "Biology" },
  { start: "15:30", end: "16:30", title: "Geography" },
];

/**
 * Create periods for a timetable based on class subjects
 */
function createPeriodsForTimetable(
  timetableId: number,
  classId: number,
  dayIndex: number
): PeriodType[] {
  const classSubjects = mockSubjectList.filter((subject) => subject.classId === classId);
  const periods: PeriodType[] = [];
  const timeSlots = [
    { start: "08:00", end: "09:00" },
    { start: "09:15", end: "10:15" },
    { start: "10:30", end: "11:30" },
    { start: "11:45", end: "12:45" },
    { start: "13:00", end: "14:00" }, // Break
    { start: "14:15", end: "15:15" },
    { start: "15:30", end: "16:30" },
  ];

  let periodId = timetableId * 100;
  let subjectIndex = 0;

  timeSlots.forEach((slot, index) => {
    const isBreak = index === 4; // Middle slot is break
    
    if (isBreak) {
      periods.push({
        id: periodId++,
        startTime: slot.start,
        endTime: slot.end,
        subjectId: 0,
        subject: {} as any,
        isBreak: true,
        breakType: "Longbreak",
        timetableId,
        timetable: {} as any,
        tenantId: 1,
      });
    } else if (subjectIndex < classSubjects.length) {
      const subject = classSubjects[subjectIndex];
      // Rotate subjects based on day to create variety
      const actualSubjectIndex = (subjectIndex + dayIndex) % classSubjects.length;
      const actualSubject = classSubjects[actualSubjectIndex];
      
      periods.push({
        id: periodId++,
        startTime: slot.start,
        endTime: slot.end,
        subjectId: actualSubject.id,
        subject: actualSubject,
        isBreak: false,
        breakType: null,
        timetableId,
        timetable: {} as any,
        tenantId: 1,
      });
      subjectIndex++;
    }
  });

  return periods;
}

/**
 * Create timetables for each class division
 * Each class division has timetables for each day of the week
 */
const weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

export const mockTimetableList: TimetableType[] = mockClassDivisionList.flatMap((division) => {
  const classId = division.classId;
  
  return weekdays.map((day, dayIndex) => {
    const timetableId = division.id * 10 + dayIndex + 1;
    const periods = createPeriodsForTimetable(timetableId, classId, dayIndex);
    
    return {
      id: timetableId,
      day,
      classDivisionId: division.id,
      periods,
    };
  });
});

/**
 * Mock single timetable (for backward compatibility)
 * Returns Monday timetable for first class division
 */
export const mockTimetable: TimetableType = mockTimetableList[0] || {
  id: 1,
  day: "Monday",
  classDivisionId: 1,
  periods: [],
};
