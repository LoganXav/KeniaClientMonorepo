import { z } from "zod";

export const SchoolProfileFormSchema = z.object({
  userId: z.number().optional(),
  id: z.number().optional(),

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

  establishedDate: z.string({
    required_error: "Established date is required",
    invalid_type_error: "Invalid date format",
  }),
  logoUrl: z.any(),
  // logoUrl: z
  // .string({
  //   invalid_type_error: "School's logo URL must be a string",
  // })
  // .optional(),
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
