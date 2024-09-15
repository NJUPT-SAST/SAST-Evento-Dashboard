"use client";
import { TimetableEditorComponent } from "@/components/timetableEditor/timetableEditor";

export default function TimetableEditor() {
  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        backgroundColor: "#ffffff",
        color: "black",
      }}
    >
      <TimetableEditorComponent></TimetableEditorComponent>
    </div>
  );
}
