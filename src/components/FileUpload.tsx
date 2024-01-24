import {
  CardHeader,
  CardContent,
  Card,
  Typography,
  Input,
  Button,
} from "@mui/material";
import { ChangeEvent, useState } from "react";
import { downloadJsonFile, parseICalData, readAsText } from "../util";

export default function FileUpload() {
  const [icsFile, setIcsFile] = useState<File | null>(null);
  const [jsonContent, setJsonContent] = useState<any | null>(null);

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    setIcsFile(file);
    convertICSToJSON();
  };

  const convertICSToJSON = async () => {
    console.log("convertICSToJSON", icsFile);
    if (icsFile) {
      try {
        const icsData = await readAsText(icsFile);
        console.log(icsData);
        const jcalData = parseICalData(icsData);
        setJsonContent(jcalData);
      } catch (error) {
        console.error("Error converting ICS to JSON:", error.message);
      }
    }
  };

  const handleDownload = () => {
    downloadJsonFile(jsonContent);
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
