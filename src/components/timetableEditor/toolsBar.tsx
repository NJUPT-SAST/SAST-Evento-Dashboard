// "use client";
import React, { Dispatch, memo, SetStateAction } from "react";
// import Button from "@mui/joy/Button";
import { Button } from "@douyinfe/semi-ui";
import { Event } from "@/types/event";

interface ToolsBarProps {
  generateClick: () => void;
  // setEventsList: Dispatch<SetStateAction<Event[]>>;
  downloadCanvasAsPNG: () => void;
}

const ToolsBar: React.FC<ToolsBarProps> = ({
  generateClick,
  downloadCanvasAsPNG,
}) => {
  return (
    <div
      style={{
        left: "50%",
        position: "fixed",
        width: "50vw",
        display: "flex",
        flexDirection: "column",
        padding: "1rem",
        fontFamily: "noto-sans-sc",
        minHeight: "100%",
      }}
    >
      <h2>📚 Tutorial</h2>
      <li>👋 Click bottom generate button and see left section.</li>
      <li>🦟 Double click text to change textarea value.</li>
      <li>👍 "Enter" to save value and exit, "Esc" to exit.</li>
      <h2> 🛠 Tools Bar</h2>
      <div
        style={{
          bottom: "2rem",
          right: "1rem",
          display: "flex",
          gap: "0.6rem",
        }}
      >
        <Button
          theme="solid"
          style={{ width: "fit-content" }}
          onClick={() => {
            console.log("generateClick");
            generateClick();
          }}
          // variant="outlined"
        >
          ⛰️ Click to generate !!!
        </Button>
        <Button
          // onClick={downloadCanvasAsPNG}
          style={{ width: "fit-content" }}
          theme="solid"
          onClick={() => {
            console.log("downloadClick");
            downloadCanvasAsPNG();
          }}
          // variant="outlined"
        >
          🦌 Export !!!
        </Button>
      </div>
    </div>
  );
};

export const MemoToolsBar = memo(ToolsBar);
