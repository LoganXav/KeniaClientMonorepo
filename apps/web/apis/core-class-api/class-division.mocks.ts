import { GetRequestReturnType } from "@/config/base-query";
import { ClassDivisionType } from "@/types";

/**
 * Mock response for GET classdivision/list (class divisions for class teacher)
 */

export const mockGetClassDivisionListResponse: GetRequestReturnType<ClassDivisionType[]> = {
  data: [
    {
      id: 1,
      name: "A",
      classId: 1,
      classDivisionTeacherId: 1,
      tenantId: 1,
      class: { id: 1, name: "SS 1", classTeacherId: 1, classTeacher: {} as any, students: [], subjects: [], tenantId: 1, tenant: {} as any },
      tenant: {} as ClassDivisionType["tenant"],
      students: [],
      classDivionTeacher: {
        id: 1,
        jobTitle: "Administrator",
        userId: 1,
        user: { firstName: "John", lastName: "Doe" } as any,
        roleId: 1,
        role: null,
        nin: null,
        tin: null,
        cvUrl: null,
        employmentType: "Full-time",
        highestLevelEdu: "Masters",
        group: [],
        classDivisions: [],
        subjects: [],
        tenantId: 1,
        tenant: {} as any,
        startDate: new Date().toISOString(),
      },
    },
    {
      id: 2,
      name: "B",
      classId: 1,
      classDivisionTeacherId: 2,
      tenantId: 1,
      class: { id: 1, name: "SS 1", classTeacherId: 1, classTeacher: {} as any, students: [], subjects: [], tenantId: 1, tenant: {} as any },
      tenant: {} as ClassDivisionType["tenant"],
      students: [],
      classDivionTeacher: {
        id: 2,
        jobTitle: "Assistant Teacher",
        userId: 2,
        user: { firstName: "Jane", lastName: "Smith" } as any,
        roleId: 2,
        role: null,
        nin: null,
        tin: null,
        cvUrl: null,
        employmentType: "Full-time",
        highestLevelEdu: "Bachelors",
        group: [],
        classDivisions: [],
        subjects: [],
        tenantId: 1,
        tenant: {} as any,
        startDate: new Date().toISOString(),
      },
    },
  ],
  message: "Resource fetched successfully",
  statusCode: 200,
};
