import { PostRequestReturnType } from "@/config/base-query";
import { AuthUserType, PermissionType } from "@/types";

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
  { id: 2, name: "STAFF_CREATE", roles: [], tenantId: 1 },
  { id: 3, name: "STUDENT_READ", roles: [], tenantId: 1 },
  { id: 4, name: "STUDENT_CREATE", roles: [], tenantId: 1 },
  { id: 5, name: "CLASS_READ", roles: [], tenantId: 1 },
  { id: 6, name: "CLASS_CREATE", roles: [], tenantId: 1 },
];

/**
 * Mock sign up response
 * Matches backend: AuthSignUpService returns { id, tenantId }
 */
export const mockSignUpResponse: MockSignUpResponse = {
  data: {
    id: 1,
    tenantId: 1,
  },
  message: "Account created successfully",
  statusCode: 201,
};

/**
 * Mock sign in response - Admin user
 * Matches backend: AuthSignInService returns user data with staff role info
 */
export const mockSignInResponseAdmin: MockSignInResponse = {
  data: {
    id: 1,
    tenantId: 1,
    email: "admin@example.com",
    firstName: "John",
    lastName: "Doe",
    phoneNumber: "+1234567890",
    hasVerified: true,
    isFirstTimeLogin: false,
    lastLoginDate: new Date(),
    userType: "Staff",
    staff: {
      id: 1,
      jobTitle: "Administrator",
      userId: 1,
      user: {} as any, // Not used in auth context
      roleId: 1,
      role: {
        id: 1,
        name: "Administrator",
        isAdmin: true,
        description: "Full system access",
        scope: null,
        permissions: mockPermissions,
        staff: [],
        tenantId: 1,
        tenant: {} as any,
      },
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
  accessToken: "mock-jwt-access-token-admin-12345",
  message: "Sign in successful",
  statusCode: 200,
};

/**
 * Mock sign in response - Regular staff user
 */
export const mockSignInResponseStaff: MockSignInResponse = {
  data: {
    id: 2,
    tenantId: 1,
    email: "teacher@example.com",
    firstName: "Jane",
    lastName: "Smith",
    phoneNumber: "+1234567891",
    hasVerified: true,
    isFirstTimeLogin: false,
    lastLoginDate: new Date(),
    userType: "Staff",
    staff: {
      id: 2,
      jobTitle: "Teacher",
      userId: 2,
      user: {} as any,
      roleId: 2,
      role: {
        id: 2,
        name: "Teacher",
        isAdmin: false,
        description: "Teaching staff access",
        scope: null,
        permissions: mockPermissions.slice(2, 4), // Limited permissions
        staff: [],
        tenantId: 1,
        tenant: {} as any,
      },
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
  accessToken: "mock-jwt-access-token-staff-67890",
  message: "Sign in successful",
  statusCode: 200,
};

/**
 * Mock sign in response - Student user
 */
export const mockSignInResponseStudent: MockSignInResponse = {
  data: {
    id: 3,
    tenantId: 1,
    email: "student@example.com",
    firstName: "Alice",
    lastName: "Johnson",
    phoneNumber: "+1234567892",
    hasVerified: true,
    isFirstTimeLogin: false,
    lastLoginDate: new Date(),
    userType: "Student",
    staff: {
      id: 0,
      jobTitle: "",
      userId: 3,
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
      tenantId: 1,
      tenant: {} as any,
      startDate: new Date().toISOString(),
    },
  },
  accessToken: "mock-jwt-access-token-student-11111",
  message: "Sign in successful",
  statusCode: 200,
};

/**
 * Mock sign in response - First time login user
 */
export const mockSignInResponseFirstTime: MockSignInResponse = {
  data: {
    id: 4,
    tenantId: 1,
    email: "newuser@example.com",
    firstName: "New",
    lastName: "User",
    phoneNumber: "+1234567893",
    hasVerified: false,
    isFirstTimeLogin: true,
    lastLoginDate: new Date(),
    userType: "Staff",
    staff: {
      id: 3,
      jobTitle: "Teacher",
      userId: 4,
      user: {} as any,
      roleId: 2,
      role: {
        id: 2,
        name: "Teacher",
        isAdmin: false,
        description: "Teaching staff access",
        scope: null,
        permissions: mockPermissions.slice(2, 4),
        staff: [],
        tenantId: 1,
        tenant: {} as any,
      },
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
  accessToken: "mock-jwt-access-token-firsttime-22222",
  message: "Sign in successful",
  statusCode: 200,
};

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
export const mockVerifyOtpResponse: MockSignInResponse = {
  ...mockSignInResponseAdmin,
  accessToken: "mock-jwt-access-token-verify-33333",
  message: "Token verified successfully",
  statusCode: 200,
};

/**
 * Mock OTP Resend response
 * Matches backend: AuthRefreshOtpTokenService returns null data
 */
export const mockResendOtpResponse: PostRequestReturnType<null> = {
  data: null,
  message: "OTP token has been resent to your email",
  statusCode: 200,
};

/**
 * Mock Password Reset Request response
 */
export const mockResetPasswordRequestResponse: PostRequestReturnType<null> = {
  data: null,
  message: "Password reset link has been sent to your email",
  statusCode: 200,
};

/**
 * Mock Change Password response
 */
export const mockChangePasswordResponse: PostRequestReturnType<null> = {
  data: null,
  message: "Password changed successfully",
  statusCode: 200,
};

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
