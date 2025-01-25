export type SiteConfig = {
  name: string;
  description: string;
  url: string;
  ogImage: string;
  author: string;
  links: {
    twitter: string;
    github: string;
    api_github: string;
    terms: string;
    privacy: string;
  };
};

export type AuthUserType = {
  email: string;
  firstName: string;
  hasVerified: boolean;
  id: number;
  isFirstTimeLogin: boolean;
  lastLoginDate: Date;
  lastName: string;
  phoneNumber: string;
  tenantId: number;
  userType: "STAFF" | "STUDENT";
};

export interface SchoolType {
  id: number;
  onboardingStatus: "PERSONAL" | "RESIDENTIAL" | "SCHOOL" | "COMPLETE";
  name: string;
  registrationNo: string;
  contactEmail: string;
  contactPhone: string;
  establishedDate: Date;
  logoUrl: string;
  address: string;
  stateId: number;
  lgaId: number;
  zipCode: number;
  countryId: number;
  postalCode: string;
}

export interface StaffType {
  id: number;
  jobTitle: string;
  userId: number;
  user: UserWithRelations;
  roleId: number;
  role: Role | null;
  group: Group[];
  classes: Class[];
  subjects: Subject[];
  tenantId: number;
  tenant: Tenant;
}

export interface StudentType {
  id: number;
  studentId: string;
  userId: number;
  user: UserWithRelations;
  enrollmentDate: string; // ISO Date string
  classId: string;
  class: Class;
  tenantId: number;
  tenant: Tenant;
}

export interface RoleType {
  id: number;
  name: string;
  rank: number;
  permissions: PermissionType;
  staff: StaffType[];
  tenantId: number;
  tenant: SchoolType;
}

export interface PermissionType {
  id: number;
  name: string;
  roles: RoleType[];
  tenantId: number;
  tenant: SchoolType;
}

export interface UserWithRelationsType {
  id: number;
  firstName: string;
  lastName: string;
  gender?: string | null;
  dateOfBirth?: string | null; // ISO Date string
  phoneNumber: string;
  email: string;
  password: string;
  hasVerified: boolean;
  isFirstTimeLogin: boolean;
  lastLoginDate: string; // ISO Date string
  userType: "STAFF" | "STUDENT";
  tenantId: number;
  tenant: SchoolType;
  student?: StudentType | null;
  staff?: (StaffType & { role: RoleType | null }) | null;
  createdAt: string; // ISO Date string
  residentialAddress?: string | null;
  residentialLgaId?: number | null;
  residentialStateId?: number | null;
  residentialCountryId?: number | null;
  residentialZipCode?: number | null;
}
