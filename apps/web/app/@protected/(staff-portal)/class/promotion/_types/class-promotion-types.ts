import { CalendarType, ClassDivisionType, ClassType, StudentType } from "@/types";

export type ClassPromotionTemplateOptions = {
  classOptions: ClassType[];
  classDivisionOptions: ClassDivisionType[];
  promotionClassDivisionOptions: ClassDivisionType[];
  calendarOptions: CalendarType[];
  studentOptions: StudentType[];
  promotionDecisionOptions: string[];
};
