import { z } from "zod";

export const SchoolProfileFormPersonalSchema = z.object({
  userId: z.number().optional(),
  id: z.number().optional(),

  firstName: z
    .string({
      required_error: "First name is required",
    })
    .min(1, "First name must be at least 1 character")
    .max(50, "First name cannot exceed 50 characters"),
  lastName: z
    .string({
      required_error: "Last name is required",
    })
    .min(1, "Last name must be at least 1 character")
    .max(50, "Last name cannot exceed 50 characters"),

  email: z.string({
    required_error: "Email address is required",
  }),
  gender: z.string({
    required_error: "Gender is required",
  }),
  phoneNumber: z
    .string({
      required_error: "Phone number is required",
    })
    .min(10, "Phone number must be at least 10 digits")
    .max(15, "Phone number cannot exceed 15 digits"),
  dateOfBirth: z
    .string({
      invalid_type_error: "Date of birth must be a valid Date object",
    })
    .optional(),
  // .refine(
  //   (val) => {
  //     if (val) {
  //       return !isNaN(Date.parse(val));
  //     }
  //     return true;
  //   },
  //   {
  //     message: "Invalid date of birth format",
  //   }
  // )
  // .transform((val) => (val ? new Date(val) : undefined)),
});

export const SchoolProfileFormResidentialSchema = z.object({
  userId: z.number().optional(),
  residentialAddress: z
    .string({
      required_error: "Residential address is required",
    })
    .min(1, "Residential address must be at least 1 character")
    .max(255, "Residential address is too long"),
  residentialLgaId: z.union([z.string(), z.number()], {
    required_error: "Local government is required",
  }),
  residentialStateId: z.union([z.string(), z.number()], {
    required_error: "State is required",
  }),
  residentialCountryId: z.union([z.string(), z.number()], {
    required_error: "Country is required",
  }),
  residentialZipCode: z.union([z.string(), z.number()], {
    required_error: "Zip code is required",
  }),
});

export const SchoolProfileFormSchoolSchema = z.object({
  userId: z.number().optional(),
  name: z
    .string({
      required_error: "School name is required",
    })
    .min(1, "School name must be at least 1 character")
    .max(100, "School name cannot exceed 100 characters"),
  registrationNo: z
    .string({
      required_error: "Registration number is required",
    })
    .min(1, "Registration number must be at least 1 character")
    .max(50, "Registration number cannot exceed 50 characters"),
  contactEmail: z
    .string({
      required_error: "School's contact email is required",
    })
    .email("Invalid email address for school"),
  contactPhone: z
    .string({
      required_error: "School's contact phone is required",
    })
    .min(10, "Contact phone must be at least 10 digits")
    .max(15, "Contact phone cannot exceed 15 digits"),
  establishedDate: z
    .string({
      invalid_type_error: "Established date must be a valid Date object",
    })
    .optional(),
  // .refine(
  //   (val) => {
  //     if (val) {
  //       return !isNaN(Date.parse(val));
  //     }
  //     return true;
  //   },
  //   {
  //     message: "Invalid established date format",
  //   }
  // )
  // .transform((val) => (val ? new Date(val) : undefined)),
  logoUrl: z
    .string({
      invalid_type_error: "School's logo URL must be a string",
    })
    .url("Invalid URL for school logo")
    .optional(),
  address: z
    .string({
      required_error: "School address is required",
    })
    .min(1, "School address must be at least 1 character")
    .max(255, "School address is too long"),
  stateId: z.union([z.string(), z.number()], {
    required_error: "School state is required",
  }),
  lgaId: z.union([z.string(), z.number()], {
    required_error: "School's local government area (LGA) is required",
  }),
  zipCode: z.union([z.string(), z.number()], {
    required_error: "School's zip code is required",
  }),
  countryId: z.union([z.string(), z.number()], {
    required_error: "School's country is required",
  }),
  postalCode: z
    .string({
      required_error: "Postal code is required",
    })
    .min(5, "Postal code must be at least 5 characters")
    .max(10, "Postal code cannot exceed 10 characters"),
});

export const SchoolProfileFormSchema = SchoolProfileFormPersonalSchema.merge(SchoolProfileFormResidentialSchema);
