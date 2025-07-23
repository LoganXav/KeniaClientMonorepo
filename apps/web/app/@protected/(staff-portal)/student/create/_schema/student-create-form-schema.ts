import { z } from "zod";

export const StudentCreateFormSchema = z.object({
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

  bloodGroup: z.string({
    required_error: "Blood group is required",
    invalid_type_error: "Blood group must be a string",
  }),

  religion: z.string({
    required_error: "Religion is required",
    invalid_type_error: "Religion must be a string",
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

  tenantId: z
    .number({
      invalid_type_error: "Tenant ID must be a number",
    })
    .positive("Tenant ID must be a positive number")
    .optional(),

  residentialAddress: z.string().optional(),
  residentialStateId: z.union([z.string(), z.number()]).optional(),
  residentialLgaId: z.union([z.string(), z.number()]).optional(),
  residentialCountryId: z.union([z.string(), z.number()]).optional(),
  residentialZipCode: z.union([z.string(), z.number()]).optional(),

  startDate: z
    .date({
      required_error: "Resumption date is required",
      invalid_type_error: "Invalid date format",
    })
    .transform((date) => date.toISOString()),

  guardians: z.array(
    z.object({
      id: z.union([z.string(), z.number()]).optional(),
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

      residentialAddress: z.string().optional(),
      residentialStateId: z.union([z.string(), z.number()]).optional(),
      residentialLgaId: z.union([z.string(), z.number()]).optional(),
      residentialCountryId: z.union([z.string(), z.number()]).optional(),
      residentialZipCode: z.union([z.string(), z.number()]).optional(),
    })
  ),

  classId: z.number({ required_error: "Class is required", invalid_type_error: "Class must be a number" }),
  classDivisionId: z.number({ required_error: "Class division is required", invalid_type_error: "Class division must be a number" }),

  admissionNo: z
    .string({
      required_error: "Admission number is required",
      invalid_type_error: "Admission number must be a string",
    })
    .min(1, "Admission number is required")
    .max(20, "Admission number must be less than 50 characters"),
});
