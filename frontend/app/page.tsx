"use client";
import { useState } from "react";
import InputForm from "./components/InputForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  const [submittedValues, setSubmittedValues] = useState<string[]>([]);
  const [tempValues, setTempValues] = useState<number[]>([]);

  const handleNewSubmission = (newValue: string, newNumber: number) => {
    setSubmittedValues((prevValues) => [newValue, ...prevValues]);
    setTempValues((prevValues) => [newNumber, ...prevValues]);
  };

  return (
    <div className="min-h-screen p-8 grid gap-8 justify-center">
      <h1 className="text-2xl font-bold text-center">
        Temperature Prediction App
      </h1>
      <InputForm onSubmit={handleNewSubmission} />
      <div className="max-w-lg mx-auto w-full">
        <h2 className="text-xl font-semibold mb-4 text-center">
          Submitted Values:
        </h2>
        <div className="space-y-4 h-72 overflow-y-scroll">
          {submittedValues.map((value, index) => (
            <Card key={index} className="w-full">
              <CardHeader>
                <CardTitle>Submission {index + 1}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  <strong>Value:</strong> {value}
                </p>
                <p>
                  <strong>Predicted Temp:</strong> {tempValues[index]}°C
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
