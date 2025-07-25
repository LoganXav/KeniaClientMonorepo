import { CalendarType, ClassDivisionType, ClassType, StudentType, TermType } from "@/types";

export type SubjectGradingTemplateOptions = {
  termOptions: TermType[];
  classOptions: ClassType[];
  studentOptions: StudentType[];
  calendarOptions: CalendarType[];
  classDivisionOptions: ClassDivisionType[];
};
