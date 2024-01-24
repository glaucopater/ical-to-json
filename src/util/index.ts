export function parseICalData(data) {
  const lines = data.split("\n");
  let events = [];
  let currentEvent = null;

  for (const line of lines) {
    const trimmedLine = line.trim();

    if (trimmedLine.startsWith("BEGIN:VEVENT")) {
      currentEvent = {};
    } else if (trimmedLine.startsWith("END:VEVENT")) {
      if (currentEvent) {
        events.push(currentEvent);
        currentEvent = null;
      }
    } else if (currentEvent) {
      const [key, value] = trimmedLine.split(":");
      if (key && value) {
        currentEvent[key.toUpperCase()] = value;
      }
    }
  }

  return events;
}
