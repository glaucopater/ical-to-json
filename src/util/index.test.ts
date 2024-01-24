// create unit tests for parseICalData

import { parseICalData } from ".";

// describe
describe("parseICalData", () => {
  // write your test cases here
  test("parseICalData should return parsed events", () => {
    const icalData = `
    BEGIN:VCALENDAR
    VERSION:2.0
    BEGIN:VEVENT
    SUMMARY:Sample Event 1
    DTSTART:20240124T120000
    DTEND:20240124T140000
    DESCRIPTION:This is a sample event description.
    LOCATION:Sample Location
    END:VEVENT
    BEGIN:VEVENT
    SUMMARY:Sample Event 2
    DTSTART:20240125T090000
    DTEND:20240125T110000
    DESCRIPTION:Another sample event description.
    LOCATION:Another Location
    END:VEVENT
    END:VCALENDAR
    `;

    const parsedEvents = parseICalData(icalData);

    expect(parsedEvents).toEqual([
      {
        SUMMARY: "Sample Event 1",
        DTSTART: "20240124T120000",
        DTEND: "20240124T140000",
        DESCRIPTION: "This is a sample event description.",
        LOCATION: "Sample Location",
      },
      {
        SUMMARY: "Sample Event 2",
        DTSTART: "20240125T090000",
        DTEND: "20240125T110000",
        DESCRIPTION: "Another sample event description.",
        LOCATION: "Another Location",
      },
    ]);
  });
});
