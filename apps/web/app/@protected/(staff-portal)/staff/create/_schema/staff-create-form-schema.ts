import { z } from "zod";

export const StaffCreateFormSchema = z.object({
  id: z.union([z.number(), z.string()]).optional(),
  firstName: z
    .string({
      required_error: "First name is required",
      invalid_type_error: "First name must be a string",
    })
    .min(1, "First name is required")
    .max(50, "First name must be less than 50 characters"),

  lastName: z
    .string({
      required_error: "Last name is required",
      invalid_type_error: "Last name must be a string",
    })
    .min(1, "Last name is required")
    .max(50, "Last name must be less than 50 characters"),

  phoneNumber: z
    .string({
      required_error: "Phone number is required",
      invalid_type_error: "Phone number must be a string",
    })
    .min(10, "Phone number must be at least 10 digits"),

  gender: z.string({
    required_error: "Gender is required",
    invalid_type_error: "Gender must be a string",
  }),

  dateOfBirth: z.date({
    required_error: "Date of birth is required",
    invalid_type_error: "Invalid date format",
  }),
  email: z
    .string({
      required_error: "Email is required",
      invalid_type_error: "Email must be a string",
    })
    .email("Invalid email address"),
  nin: z.string().length(11, "NIN must be exactly 11 digits").optional(),

  jobTitle: z
    .string({
      required_error: "Job title is required",
      invalid_type_error: "Job title must be a string",
    })
    .min(1, "Job title is required")
    .max(100, "Job title must be less than 100 characters"),

  tenantId: z
    .number({
      invalid_type_error: "Tenant ID must be a number",
    })
    .positive("Tenant ID must be a positive number")
    .optional(),

  roleId: z
    .number({
      required_error: "Role ID is required",
      invalid_type_error: "Role ID must be a number",
    })
    .positive("Role ID must be a positive number"),

  residentialAddress: z.string().optional(),
  residentialStateId: z.union([z.string(), z.number()]).optional(),
  residentialLgaId: z.union([z.string(), z.number()]).optional(),
  residentialCountryId: z.union([z.string(), z.number()]).optional(),
  residentialZipCode: z.union([z.string(), z.number()]).optional(),

  employmentType: z.string({
    required_error: "Employment type is required",
    invalid_type_error: "Invalid employment type",
  }),

  startDate: z.date({
    required_error: "Resumption date is required",
    invalid_type_error: "Invalid date format",
  }),

  tin: z.string().optional(),

  highestLevelEdu: z.string().optional(),

  cvUrl: z.string().url("Invalid CV URL").optional(),
  cvFile: z.instanceof(File).optional(),

  subjectIds: z.array(z.number().int("Subject ID must be an integer")).optional(),
  classDivisionIds: z.array(z.number().int("Class ID must be an integer")).optional(),
});
