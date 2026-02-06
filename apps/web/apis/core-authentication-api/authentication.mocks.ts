// @ts-nocheck
import { PostRequestReturnType } from "@/config/base-query";
import { AuthUserType, PermissionType } from "@/types";
import { MOCK_STAFF, MOCK_TENANT_ID, MOCK_ROLES, MOCK_STUDENTS, getPhoneNumber } from "@/mocks/constants";
import { mockStaffList, mockRoleList } from "@/mocks/data";
import { buildPostResponse, buildAuthResponse } from "@/mocks/responses";

/**
 * Mock response types matching backend structure
 */

export interface MockSignUpResponse extends PostRequestReturnType<{ id: number; tenantId: number }> {
  data: { id: number; tenantId: number };
  message: string;
  statusCode?: number;
}

export interface MockSignInResponse extends PostRequestReturnType<AuthUserType> {
  data: AuthUserType;
  accessToken: string;
  message: string;
  statusCode?: number;
}

/**
 * Mock permission data
 */
const mockPermissions: any[] = [
  { id: 1, name: "STAFF_CREATE", roles: [], tenantId: 1 },
  { id: 2, name: "STAFF_READ", roles: [], tenantId: 1 },
  { id: 3, name: "STUDENT_READ", roles: [], tenantId: 1 },
  { id: 4, name: "STUDENT_CREATE", roles: [], tenantId: 1 },
  { id: 5, name: "CLASS_READ", roles: [], tenantId: 1 },
  { id: 6, name: "CLASS_CREATE", roles: [], tenantId: 1 },
];

/**
 * Mock sign up response
 * Matches backend: AuthSignUpService returns { id, tenantId }
 */
export const mockSignUpResponse: MockSignUpResponse = buildPostResponse(
  {
    id: 1,
    tenantId: MOCK_TENANT_ID,
  },
  "Account created successfully",
  201
);

/**
 * Mock sign in response - Admin user
 * Matches backend: AuthSignInService returns user data with staff role info
 */
export const mockSignInResponseAdmin: MockSignInResponse = buildAuthResponse(
  {
    id: MOCK_STAFF.ADMIN.id,
    tenantId: MOCK_TENANT_ID,
    email: MOCK_STAFF.ADMIN.email,
    firstName: MOCK_STAFF.ADMIN.firstName,
    lastName: MOCK_STAFF.ADMIN.lastName,
    phoneNumber: mockStaffList[0]?.user?.phoneNumber || getPhoneNumber(MOCK_STAFF.ADMIN.id),
    hasVerified: true,
    isFirstTimeLogin: false,
    lastLoginDate: new Date(),
    userType: "Staff" as const,
    staff: {
      ...(mockStaffList[0] || {}),
      role: (mockRoleList[0] ? {
        ...mockRoleList[0],
        permissions: mockPermissions,
      } : {
        id: MOCK_ROLES[0].id,
        name: MOCK_ROLES[0].name,
        isAdmin: MOCK_ROLES[0].isAdmin,
        description: MOCK_ROLES[0].description,
        scope: null,
        permissions: mockPermissions,
        staff: [],
        tenantId: MOCK_TENANT_ID,
        tenant: {} as any,
      }) as any,
    } as any,
  },
  "mock-jwt-access-token-admin-12345",
  "Sign in successful"
);

/**
 * Mock sign in response - Regular staff user
 */
export const mockSignInResponseStaff: MockSignInResponse = buildAuthResponse(
  {
    id: MOCK_STAFF.TEACHER_1.id,
    tenantId: MOCK_TENANT_ID,
    email: MOCK_STAFF.TEACHER_1.email,
    firstName: MOCK_STAFF.TEACHER_1.firstName,
    lastName: MOCK_STAFF.TEACHER_1.lastName,
    phoneNumber: mockStaffList[1]?.user?.phoneNumber || getPhoneNumber(MOCK_STAFF.TEACHER_1.id),
    hasVerified: true,
    isFirstTimeLogin: false,
    lastLoginDate: new Date(),
    userType: "Staff" as const,
    staff: {
      ...(mockStaffList[1] || {}),
      role: (mockRoleList[1] ? {
        ...mockRoleList[1],
        permissions: mockPermissions.slice(2, 4), // Limited permissions
      } : {
        id: MOCK_ROLES[1]?.id || 2,
        name: MOCK_ROLES[1]?.name || "Teacher",
        isAdmin: MOCK_ROLES[1]?.isAdmin || false,
        description: MOCK_ROLES[1]?.description || null,
        scope: null,
        permissions: mockPermissions.slice(2, 4),
        staff: [],
        tenantId: MOCK_TENANT_ID,
        tenant: {} as any,
      }) as any,
    } as any,
  },
  "mock-jwt-access-token-staff-67890",
  "Sign in successful"
);

/**
 * Mock sign in response - Student user
 */
export const mockSignInResponseStudent: MockSignInResponse = buildAuthResponse(
  {
    id: MOCK_STUDENTS[0].id,
    tenantId: MOCK_TENANT_ID,
    email: MOCK_STUDENTS[0].email,
    firstName: MOCK_STUDENTS[0].firstName,
    lastName: MOCK_STUDENTS[0].lastName,
    phoneNumber: `+234${800000000 + MOCK_STUDENTS[0].id}`,
    hasVerified: true,
    isFirstTimeLogin: false,
    lastLoginDate: new Date(),
    userType: "Student" as const,
    staff: {
      id: 0,
      jobTitle: "",
      userId: MOCK_STUDENTS[0].id,
      user: {} as any,
      roleId: 0,
      role: null,
      nin: null,
      tin: null,
      cvUrl: null,
      employmentType: null,
      highestLevelEdu: null,
      group: [],
      classDivisions: [],
      subjects: [],
      tenantId: MOCK_TENANT_ID,
      tenant: {} as any,
      startDate: new Date().toISOString(),
    },
  },
  "mock-jwt-access-token-student-11111",
  "Sign in successful"
);

/**
 * Mock sign in response - First time login user
 */
export const mockSignInResponseFirstTime: MockSignInResponse = buildAuthResponse(
  {
    id: MOCK_STAFF.TEACHER_2.id,
    tenantId: MOCK_TENANT_ID,
    email: "newuser@example.com",
    firstName: "New",
    lastName: "User",
    phoneNumber: mockStaffList[2]?.user?.phoneNumber || getPhoneNumber(MOCK_STAFF.TEACHER_2.id),
    hasVerified: false,
    isFirstTimeLogin: true,
    lastLoginDate: new Date(),
    userType: "Staff" as const,
    staff: {
      ...(mockStaffList[2] || {}),
      role: (mockRoleList[1] ? {
        ...mockRoleList[1],
        permissions: mockPermissions.slice(2, 4),
      } : {
        id: MOCK_ROLES[1]?.id || 2,
        name: MOCK_ROLES[1]?.name || "Teacher",
        isAdmin: MOCK_ROLES[1]?.isAdmin || false,
        description: MOCK_ROLES[1]?.description || null,
        scope: null,
        permissions: mockPermissions.slice(2, 4),
        staff: [],
        tenantId: MOCK_TENANT_ID,
        tenant: {} as any,
      }) as any,
    } as any,
  },
  "mock-jwt-access-token-firsttime-22222",
  "Sign in successful"
);

/**
 * Mock error responses
 */
export const mockSignUpErrorResponse = {
  message: "Email already in use",
  status: 400,
  statusCode: 400,
};

export const mockSignInErrorResponse = {
  message: "Invalid credentials",
  status: 400,
  statusCode: 400,
};

/**
 * Helper function to create custom mock responses
 */
export const createMockSignUpResponse = (
  overrides?: Partial<MockSignUpResponse>
): MockSignUpResponse => ({
  ...mockSignUpResponse,
  ...overrides,
});

export const createMockSignInResponse = (
  overrides?: Partial<MockSignInResponse>
): MockSignInResponse => ({
  ...mockSignInResponseAdmin,
  ...overrides,
});

/**
 * Mock OTP Verify response
 * Matches backend: AuthVerifyOtpTokenService returns same structure as SignIn
 */
export const mockVerifyOtpResponse: MockSignInResponse = buildAuthResponse(
  mockSignInResponseAdmin.data,
  "mock-jwt-access-token-verify-33333",
  "Token verified successfully"
);

/**
 * Mock OTP Resend response
 * Matches backend: AuthRefreshOtpTokenService returns null data
 */
export const mockResendOtpResponse: PostRequestReturnType<null> = buildPostResponse(
  null,
  "OTP token has been resent to your email",
  200
);

/**
 * Mock Password Reset Request response
 */
export const mockResetPasswordRequestResponse: PostRequestReturnType<null> = buildPostResponse(
  null,
  "Password reset link has been sent to your email",
  200
);

/**
 * Mock Change Password response
 */
export const mockChangePasswordResponse: PostRequestReturnType<null> = buildPostResponse(
  null,
  "Password changed successfully",
  200
);

/**
 * Mock error responses for OTP and password reset
 */
export const mockVerifyOtpErrorResponse = {
  message: "Invalid or expired token",
  status: 400,
  statusCode: 400,
};

export const mockResendOtpErrorResponse = {
  message: "Unable to resend OTP. Please try again later",
  status: 400,
  statusCode: 400,
};

export const mockResetPasswordRequestErrorResponse = {
  message: "Email not found",
  status: 404,
  statusCode: 404,
};

export const mockChangePasswordErrorResponse = {
  message: "Invalid or expired reset token",
  status: 400,
  statusCode: 400,
};
