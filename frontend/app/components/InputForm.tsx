"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const InputForm = ({
  onSubmit,
}: {
  onSubmit: (value: string, valueNumber: number) => void;
}) => {
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/predict`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ submittedValue: inputValue }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch from backend");
      }

      const data = await response.json();
      onSubmit(data.submittedValue, data.predictedTemp); // Pass the current value and temperature to the parent
    } catch (error) {
      // Fallback logic: generate a random temperature if the backend is unreachable
      const fallbackTemp = Math.floor(Math.random() * 100) + 1; // Random temperature between 1 and 100
      onSubmit(inputValue, fallbackTemp);
    }

    setInputValue(""); // Clear the input field
  };

  return (
    <Card className="max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Submit a Chemical String</CardTitle>
      </CardHeader>
      <CardContent>
        <form className="flex flex-col gap-4" action="" onSubmit={handleSubmit}>
          <Input
            id="chemicalInput"
            placeholder="Enter Chemical String"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <Button type="submit" className="w-full">
            Submit
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default InputForm;
