import {convertIsoTimeToAmOrPm, isVendorOpen} from "@/components/features/vendors/utils";

describe('convertHourToString', () => {
  test('should return "12:00 AM" for 0', () => {
    expect(convertIsoTimeToAmOrPm("00:00:00")).toBe("12:00AM");
  });

  test('should return "12:00 PM" for 12', () => {
    expect(convertIsoTimeToAmOrPm("12:00:00")).toBe("12:00PM");
  });

  test('should return "8:00 AM" for 8', () => {
    expect(convertIsoTimeToAmOrPm("08:00:00")).toBe("8:00AM");
  });

  test('should return "8:00 PM" for 20', () => {
    expect(convertIsoTimeToAmOrPm("20:00:00")).toBe("8:00PM");
  });

  test('should return "1:00 AM" for 1', () => {
    expect(convertIsoTimeToAmOrPm("01:00:00")).toBe("1:00AM");
  });

  test('should return "11:00 AM" for 11', () => {
    expect(convertIsoTimeToAmOrPm("11:00:00")).toBe("11:00AM");
  });

  test('should return "11:00 PM" for 23', () => {
    expect(convertIsoTimeToAmOrPm("23:00:00")).toBe("11:00PM");
  });

  test('should return "1:00 PM" for 13', () => {
    expect(convertIsoTimeToAmOrPm("13:00:00")).toBe("1:00PM");
  });
});

describe("isVendorOpen", () => {
  test("returns true when current time is within normal operating hours", () => {
    const vendor = {
      id: '1',
      name: 'Test Vendor',
      openingTime: "09:00:00",
      closingTime: "17:00:00",
      rating: 4,
    };
    expect(isVendorOpen(10, vendor)).toBe(true); // 10 AM, open from 9 AM to 5 PM
  });

  test("returns false when current time is before opening hours", () => {
    const vendor = {
      id: '1',
      name: 'Test Vendor',
      openingTime: "09:00:00",
      closingTime: "17:00:00",
      rating: 4,
    };
    expect(isVendorOpen(8, vendor)).toBe(false); // 8 AM, opens at 9 AM
  });

  test("returns false when current time is after closing hours", () => {
    const vendor = {
      id: '1',
      name: 'Test Vendor',
      openingTime: "09:00:00",
      closingTime: "17:00:00",
      rating: 4,
    };
    expect(isVendorOpen(18, vendor)).toBe(false); // 6 PM, closed after 5 PM
  });

  test("returns true for overnight hours when current time is before closing (after midnight)", () => {
    const vendor = {
      id: '1',
      name: 'Test Vendor',
      openingTime: "22:00:00", // 10 PM
      closingTime: "04:00:00", // 4 AM
      rating: 4,
    };
    expect(isVendorOpen(2, vendor)).toBe(true); // 2 AM, store open from 10 PM - 4 AM
  });

  test("returns true for overnight hours when current time is after opening (before midnight)", () => {
    const vendor = {
      id: '1',
      name: 'Test Vendor',
      openingTime: "22:00:00", // 10 PM
      closingTime: "04:00:00", // 4 AM
      rating: 4,
    };
    expect(isVendorOpen(23, vendor)).toBe(true); // 11 PM, store open from 10 PM - 4 AM
  });

  test("returns false for overnight hours when current time is outside range (before opening)", () => {
    const vendor = {
      id: '1',
      name: 'Test Vendor',
      openingTime: "22:00:00", // 10 PM
      closingTime: "04:00:00", // 4 AM
      rating: 4,
    };
    expect(isVendorOpen(21, vendor)).toBe(false); // 9 PM, store opens at 10 PM
  });

  test("returns false for overnight hours when current time is outside range (after closing)", () => {
    const vendor = {
      id: '1',
      name: 'Test Vendor',
      openingTime: "22:00:00", // 10 PM
      closingTime: "04:00:00", // 4 AM
      rating: 4,
    };
    expect(isVendorOpen(5, vendor)).toBe(false); // 5 AM, store closed after 4 AM
  });

  test("returns true when opening hour is 12 and closing hour is 0 (midnight)", () => {
    const vendor = {
      id: '1',
      name: 'Test Vendor',
      openingTime: "12:00:00", // 12 PM
      closingTime: "00:00:00", // midnight
      rating: 4,
    };
    expect(isVendorOpen(15, vendor)).toBe(true); // 3 PM, store open from 12 PM - 12 AM
  });

  test("returns false when current time is after closing (midnight case)", () => {
    const vendor = {
      id: '1',
      name: 'Test Vendor',
      openingTime: "12:00:00", // 12 PM
      closingTime: "00:00:00", // midnight
      rating: 4,
    };
    expect(isVendorOpen(1, vendor)).toBe(false); // 1 AM, store closed after midnight
  });
});
