import { GetRequestReturnType, PostRequestReturnType } from "@/config/base-query";
import { ClassDivisionType } from "@/types";
import { mockClassDivisionList, mockClassList, mockStaffList } from "@/mocks/data";
import { buildGetResponse, buildPostResponse } from "@/mocks/responses";
import { createClassDivision } from "@/mocks/factories";

/**
 * Mock response for GET classdivision/list (class divisions for class teacher)
 */
export const mockGetClassDivisionListResponse: GetRequestReturnType<ClassDivisionType[]> = buildGetResponse(
  mockClassDivisionList.slice(0, 2)
);

/**
 * Mock response for GET classdivision/info/:classDivisionId
 * Returns single class division
 */
export const mockGetSingleClassDivisionResponse: GetRequestReturnType<ClassDivisionType> = buildGetResponse(
  mockClassDivisionList[0]
);

/**
 * Mock response for POST classdivision/create
 * Returns created class division
 */
export const mockCreateClassDivisionResponse: PostRequestReturnType<ClassDivisionType> = buildPostResponse(
  createClassDivision(10, "C", 1, 1, mockClassList[0], mockStaffList[0]),
  "Class division created successfully",
  201
);

/**
 * Mock response for POST classdivision/update/:classDivisionId
 * Returns updated class division
 */
export const mockUpdateClassDivisionResponse: PostRequestReturnType<ClassDivisionType> = buildPostResponse(
  {
    ...mockClassDivisionList[0],
    name: "A Updated",
  },
  "Class division updated successfully",
  200
);
