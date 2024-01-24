import {
  CardHeader,
  CardContent,
  Card,
  Typography,
  Input,
  Button,
} from "@mui/material";
import { ChangeEvent, useState } from "react";
import { parseICalData } from "../util";

export default function FileUpload() {
  const [icsFile, setIcsFile] = useState<File | null>(null);
  const [jsonContent, setJsonContent] = useState<any | null>(null);

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    console.log("handleFileChange", file);
    console.log(await readAsText(file));
    setIcsFile(file);
    convertICSToJSON();
  };

  const convertICSToJSON = async () => {
    console.log("convertICSToJSON", icsFile);
    if (icsFile) {
      try {
        const icsData = await readAsText(icsFile);
        console.log(icsData);
        //const jcalData = ICAL.parseICS(icsData);

        const jcalData = parseICalData(icsData);

        setJsonContent(jcalData);
      } catch (error) {
        console.error("Error converting ICS to JSON:", error.message);
      }
    }
  };

  const readAsText = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      if (file) {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = () => reject(new Error("Error reading file"));
        reader.readAsText(file);
      }
    });
  };

  const handleDownload = () => {
    downloadJsonFile(jsonContent);
  };

  const downloadJsonFile = (data: object) => {
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

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
      <div className="w-full max-w-md">
        <Card className="w-full">
          <CardHeader></CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Typography>
                Upload your .ics file and convert it to JSON format.
              </Typography>
              <Input
                // accept=".ics"
                id="ics-file"
                type="file"
                onChange={handleFileChange}
              />
            </div>
            {jsonContent && (
              <div className="text-center">
                <Button onClick={handleDownload}>Download JSON File</Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
