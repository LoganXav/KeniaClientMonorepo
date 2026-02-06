import { createSubject } from "../factories/subject";
import { SubjectType } from "@/types";
import { MOCK_SUBJECTS } from "../constants";
import { mockClassList } from "./classes";

/**
 * Mock subjects list
 */
export const mockSubjectList: SubjectType[] = MOCK_SUBJECTS.map((subj) => {
  const classObj = mockClassList.find((c) => c.id === subj.classId);
  return createSubject(subj.id, subj.name, subj.description, subj.classId, classObj);
});
