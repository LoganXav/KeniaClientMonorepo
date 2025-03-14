import { format, parseISO, differenceInYears } from "date-fns";

export const formatDateToString = (dateString: string | undefined): string => {
  if (!dateString) return "";

  const date = parseISO(dateString);
  const day = Number(format(date, "d")); // Convert to number
  const monthYear = format(date, "MMMM, yyyy");

  // Determine ordinal suffix
  const suffix = ["th", "st", "nd", "rd"][day % 10 > 3 || Math.floor((day % 100) / 10) === 1 ? 0 : day % 10] || "th";

  return `${day}${suffix} ${monthYear}`;
};

export const calculateAge = (dateOfBirth: string | undefined): number => {
  if (!dateOfBirth) return 0;

  const birthDate = parseISO(dateOfBirth);
  return differenceInYears(new Date(), birthDate);
};
