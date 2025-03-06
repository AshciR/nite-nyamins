import {convertHourToString, isVendorOpen} from "@/components/features/vendors/utils";

describe('convertHourToString', () => {

  test('should return "12:00 AM" for 0', () => {
    expect(convertHourToString(0)).toBe("12:00 AM");
  });

  test('should return "12:00 PM" for 12', () => {
    expect(convertHourToString(12)).toBe("12:00 PM");
  });

  test('should return "8:00 AM" for 8', () => {
    expect(convertHourToString(8)).toBe("8:00 AM");
  });

  test('should return "8:00 PM" for 20', () => {
    expect(convertHourToString(20)).toBe("8:00 PM");
  });

  test('should return "1:00 AM" for 1', () => {
    expect(convertHourToString(1)).toBe("1:00 AM");
  });

  test('should return "11:00 AM" for 11', () => {
    expect(convertHourToString(11)).toBe("11:00 AM");
  });

  test('should return "11:00 PM" for 23', () => {
    expect(convertHourToString(23)).toBe("11:00 PM");
  });

  test('should return "1:00 PM" for 13', () => {
    expect(convertHourToString(13)).toBe("1:00 PM");
  });

});

describe("isVendorOpen", () => {
  test("returns true when current time is within normal operating hours", () => {
    expect(isVendorOpen(10, 9, 17)).toBe(true); // 10 AM, open from 9 AM to 5 PM
  });

  test("returns false when current time is before opening hours", () => {
    expect(isVendorOpen(8, 9, 17)).toBe(false); // 8 AM, open from 9 AM
  });

  test("returns false when current time is after closing hours", () => {
    expect(isVendorOpen(18, 9, 17)).toBe(false); // 6 PM, closed after 5 PM
  });

  test("returns true for overnight hours when current time is before closing (after midnight)", () => {
    expect(isVendorOpen(2, 22, 4)).toBe(true); // 2 AM, store open from 10 PM - 4 AM
  });

  test("returns true for overnight hours when current time is after opening (before midnight)", () => {
    expect(isVendorOpen(23, 22, 4)).toBe(true); // 11 PM, store open from 10 PM - 4 AM
  });

  test("returns false for overnight hours when current time is outside range (before opening)", () => {
    expect(isVendorOpen(21, 22, 4)).toBe(false); // 9 PM, store opens at 10 PM
  });

  test("returns false for overnight hours when current time is outside range (after closing)", () => {
    expect(isVendorOpen(5, 22, 4)).toBe(false); // 5 AM, store closed after 4 AM
  });

  test("returns true when opening hour is 12 and closing hour is 0 (midnight)", () => {
    expect(isVendorOpen(15, 12, 0)).toBe(true); // 3 PM, store open from 12 PM - 12 AM
  });

  test("returns false when current time is after closing (midnight case)", () => {
    expect(isVendorOpen(1, 12, 0)).toBe(false); // 1 AM, store closed after midnight
  });
});
