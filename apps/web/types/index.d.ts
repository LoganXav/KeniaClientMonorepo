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
