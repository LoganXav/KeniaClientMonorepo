import { createClassDivision } from "../factories/class-division";
import { ClassDivisionType } from "@/types";
import { MOCK_CLASS_DIVISIONS } from "../constants";
import { mockClassList } from "./classes";
import { mockStaffList } from "./staff";

/**
 * Mock class divisions list
 */
export const mockClassDivisionList: ClassDivisionType[] = MOCK_CLASS_DIVISIONS.map((div) => {
  const classObj = mockClassList.find((c) => c.id === div.classId);
  const teacher = mockStaffList.find((s) => s.id === div.classDivisionTeacherId);
  
  return createClassDivision(
    div.id,
    div.name,
    div.classId,
    div.classDivisionTeacherId,
    classObj,
    teacher
  );
});
