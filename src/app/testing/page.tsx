"use client";
import TestingCanvas from "@/components/TestingCanvas";
import { Progress } from "@/components/ui/progress";
import { Suspense } from "react";

export default function TestingThreeCanvas() {
  return (
    <div className="flex justify-center mt-28">
      <div className="w-[800px] h-[800px] bg-neutral-800">
        <TestingCanvas />
      </div>
    </div>
  );
}
