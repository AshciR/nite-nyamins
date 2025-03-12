import {format, parse} from "date-fns";
import {Vendor} from "@/components/features/vendors/models";

const convertIsoTimeToAmOrPm = (timeStr: string): string => {
  // Parse just the time portion (date is irrelevant)
  const timeDate = parse(timeStr, 'HH:mm:ss', new Date());
  return format(timeDate, 'h:mma'); // "9:00 AM"
};

const isVendorOpen = (
  currentHour: number,
  vendor?: Vendor,
  referenceDate: Date = new Date()
): boolean => {

  if (!vendor) {
    return false
  }

  // Parse the vendor's opening and closing times using date-fns
  const openingDate = parse(vendor.openingTime, 'HH:mm:ss', referenceDate);
  const closingDate = parse(vendor.closingTime, 'HH:mm:ss', referenceDate);

  const openingHour = openingDate.getHours();
  const closingHour = closingDate.getHours();

  if (openingHour < closingHour) {
    // Vendor operates within the same day
    return currentHour >= openingHour && currentHour < closingHour;
  }
  if (openingHour > closingHour) {
    // Vendor operates overnight (e.g., 20:00 to 04:00)
    return currentHour >= openingHour || currentHour < closingHour;
  }
  // If openingHour equals closingHour, assume vendor is open 24 hours
  return true;
}


export {convertIsoTimeToAmOrPm, isVendorOpen}