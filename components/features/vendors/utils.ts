const convertHourToString = (hour: number): string => {
  if (hour === 0) {
    return "12:00 AM";
  } else if (hour === 12) {
    return "12:00 PM";
  } else if (hour < 12) {
    return `${hour}:00 AM`;
  } else {
    return `${hour - 12}:00 PM`;
  }
};

const isVendorOpen = (currentHour: number, openingHour: number, closingHour: number): boolean => {
  if (openingHour < closingHour) {
    // Normal hours: Store opens and closes on the same day
    if (currentHour >= openingHour && currentHour < closingHour) {
      return true;
    }
  } else {
    // Overnight hours: Store closes the next day
    if (currentHour >= openingHour || currentHour < closingHour) {
      return true;
    }
  }
  return false;
};


export {convertHourToString, isVendorOpen}