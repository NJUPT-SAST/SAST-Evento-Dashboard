import React from "react";
import { useState, useEffect } from "react";
import {
  Calendar,
  DatePicker,
  Button,
  RadioGroup,
  Radio,
} from "@douyinfe/semi-ui";
import "./index.scss";

const TimeTable = () => {
  const [mode, setMode] = useState("day");

  const changeMode = (radioValue) => {
    console.log(radioValue.target.value);
    setMode(radioValue.target.value);
  };
  return (
    <>
      <div className="timetableContainer">
        <RadioGroup type="button" onChange={changeMode} value={mode}>
          <Radio value={"day"}>日视图</Radio>
          <Radio value={"week"}>周视图</Radio>
          <Radio value={"month"}>月视图</Radio>
          <Radio value={"range"}>多日视图</Radio>
        </RadioGroup>
        <Calendar
          className="calendarContent"
          mode={mode}
          range={
            mode === "range"
              ? [new Date(2019, 6, 23), new Date(2019, 6, 26)]
              : []
          }
        ></Calendar>
      </div>
    </>
  );
};

export default TimeTable;
