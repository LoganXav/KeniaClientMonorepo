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
  userType: "Staff" | "Student";
  staff: StaffType;
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
  user: UserWithRelationsType;
  roleId: number;
  role: RoleType | null;
  nin: string | null;
  tin: string | null;
  cvUrl: string | null;
  employmentType: string | null;
  highestLevelEdu: string | null;
  group: GroupType[];
  classDivisions: ClassDivisionType[];
  subjects: SubjectType[];
  tenantId: number;
  tenant: TenantType;
  startDate: string;
}

export interface StudentType {
  id: number;
  admissionNo: string;
  studentId: string;
  userId: number;
  user: UserWithRelationsType;
  enrollmentDate: string; // ISO Date string
  class: ClassType;
  guardians: GuardianType[];
  tenantId: number;
  tenant: TenantType;
  classDivisionId: number;
  subjectsRegistered: SubjectsRegisteredType[];
}

export interface SubjectType {
  id: number;
  name: string;
  description: string;
  classId: number;
  class: ClassType;
  staffs: StaffType[];
  subjectRegistration: SubjectsRegisteredType[];
  gradingStructure: SubjectGradingStructureType;
  tenantId: number;
  tenant: SchoolType;
}

export interface ClassType {
  id: number;
  name: string;
  classTeacherId: number;
  classTeacher: StaffType;
  students: StudentType[];
  subjects: SubjectType[];
  tenantId: number;
  tenant: SchoolType;
}

export interface ClassDivisionType {
  id: number;
  name: string;
  classId: number;
  classDivisionTeacherId: number;
  class: ClassType;
  tenantId: number;
  tenant: SchoolType;
  students: StudentType[];
  classDivionTeacher: StaffType;
}

export interface RoleType {
  id: number;
  name: string;
  isAdmin: boolean;
  description: string | null;
  scope: string | null;
  permissions: PermissionType[];
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
  religion?: string | null;
  bloodGroup?: string | null;
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

export interface CalendarType {
  id: number;
  year: number;
  terms: TermType[];
}

export interface TermType {
  // id: number;
  name: string;
  startDate: string;
  endDate: string;
  breakWeeks: BreakWeekType[];
}

export interface BreakWeekType {
  // id: number;
  name: string;
  startDate: string;
  endDate: string;
}

export interface TimetableType {
  id: number;
  day: string;
  classDivisionId: number;
  periods: PeriodType[];
}

export interface TimetablePeriodType {
  start: string;
  end: string;
  title: string;
}

export interface PeriodType {
  id: number;
  startTime: string;
  endTime: string;
  subjectId: number;
  subject: SubjectType;
  isBreak: boolean;
  breakType: "Shortbreak" | "Longbreak" | null;
  timetableId: number;
  timetable: TimetableType;
}

export interface PermissionType {
  id: number;
  name: string;
  tenantId: number;
}

export interface SchoolGradingStructureType {
  id: number;
  name: string;
  examWeight: number;
  continuousAssessmentWeight: number;
  updatedAt: string;
  classes: ClassType[];
  gradeBoundaries: GradeBoundaryType[];
}

export interface GradeBoundaryType {
  grade: string;
  id: number;
  maximumScore: number;
  minimumScore: number;
  remark: string;
  tenantGradingStructureId: number;
  updatedAt: string;
}

export interface SubjectGradingStructureType {
  id: number;
  tenantId: number;
  subjectId: number;
  staffId: number;
  continuousAssessmentBreakdownItems: ContinuousAssessmentBreakdownItemType[];
}

export interface ContinuousAssessmentBreakdownItemType {
  id: number;
  name: string;
  weight: number;
  createdAt: string;
  updatedAt: string;
}

export interface SubjectGradingType {
  continuousAssessmentScores: ContinuousAssessmentScore[];
  classId: number;
  classDivisionId: number;
  student: {
    classDivision: ClassDivisionType;
  };
}

export interface ContinuousAssessmentScore {
  id: number;
  name: string;
  score: number;
}

export interface StudentGradingType {
  classId: number;
  classDivisionId: number;
  subjects: SubjectType[];
  user: {
    id: number;
    firstName: string;
    lastName: string;
  };
}

export interface StaffPeriodType {
  class: string;
  classDivision: string;
  subject: string;
  endTime: string;
  startTime: string;
}

export interface SubjectsRegisteredType {
  id: number;
  name: string;
  description: string;
  subjectId: number;
  subject: SubjectType;
  student: StudentType;
}

export interface ClassPromotionType {
  promotionStatus: "Promoted" | "Awaiting" | "Repeated" | "Withheld";
  comments: string;
  student: StudentType;
  fromClass: ClassType;
  toClass: ClassType;
}
