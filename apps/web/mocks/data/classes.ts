import { createClass } from "../factories/class";
import { ClassType } from "@/types";
import { MOCK_CLASSES } from "../constants";

/**
 * Mock classes list
 * Note: classTeacher references will be populated when staff data is created
 * Students array will be populated via initializeDataRelationships() in data/index.ts
 */
export const mockClassList: ClassType[] = MOCK_CLASSES.map((cls) =>
  createClass(cls.id, cls.name, cls.classTeacherId)
);
