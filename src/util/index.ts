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

export const downloadJsonFile = (data: object) => {
  const jsonContent = JSON.stringify(data, null, 2);
  const blob = new Blob([jsonContent], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const timestamp = new Date().toISOString().replace(/[-:]/g, "");
  const fileName = "calendar" + timestamp + ".json";

  const a = document.createElement("a");
  a.href = url;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

export const readAsText = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    if (file) {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = () => reject(new Error("Error reading file"));
      reader.readAsText(file);
    }
  });
};
