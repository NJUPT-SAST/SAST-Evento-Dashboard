import React, { useEffect } from "react";
import { useState } from "react";
import {
  Calendar,
  RadioGroup,
  Radio,
  DatePicker,
  Select,
} from "@douyinfe/semi-ui";
import "./index.scss";
import { getEventsList } from "../../utils/timeTable";
import { getEventDepartment } from "../../utils/departments";

const TimeTable = () => {
  const [mode, setMode] = useState("day");
  const [date, setDate] = useState();
  const [events, setEvents] = useState();
  const [department, setDepartment] = useState("");
  const [chosenDepartment, setChosenDepartment] = useState("");

  const getNewEventsList = (typeId, departmentId, time) => {
    console.log(time);
    //这里拿到时间后，将所有的时间设置为月初的时间，方便月视图的观察

    time = time?.toLocaleDateString().split("/");
    time[time.length - 1] = "1";
    time = time?.join("-");
    // time = time?.toLocaleDateString().replaceAll("/", "-");

    console.log(time);
    getEventsList(typeId, departmentId, time).then((res) => {
      console.log(res.data.data);
      const resDate = res.data.data;
      // console.log(res.data.data[0].departments.departmentName);
      const newEvent = resDate.map((obj) => {
        console.log(obj);
        return {
          start: new Date(obj.gmtEventStart),
          end: new Date(obj.gmtEventEnd),
          key: `${obj.id}`,
          children: (
            <div className="CalendarItem" key={obj.id}>
              <div>
                日期：
                {obj.gmtEventStart} ~ {obj.gmtEventEnd}
              </div>
              <div>
                地点：
                {obj.location}
              </div>
              <div>
                部门：
                {obj.departments.map((obj) => {
                  return <>{obj.departmentName}</>;
                })}
              </div>
            </div>
          ),
        };
      });
      console.log(newEvent);
      setEvents(newEvent);
    });
  };

  useEffect(() => {
    const localDate = new Date();
    console.log("localDate:", localDate);
    //初始时为空
    getNewEventsList("", "", localDate);
    getEventDepartment().then((res) => {
      console.log(res.data.data);
      setDepartment(res.data.data);
    });
  }, []);

  useEffect(() => {
    console.log(events);
  }, [events]);

  const changeMode = (radioValue) => {
    console.log(radioValue.target.value);
    setMode(radioValue.target.value);
  };

  const changeDate = (value) => {
    console.log(value);
    setDate(value);
  };

  useEffect(() => {
    if (date !== undefined) {
      console.log(date);
      getNewEventsList("", chosenDepartment, date);
    }
  }, [date, chosenDepartment]);

  const changeDepartment = (value) => {
    console.log(value);
    setChosenDepartment(value);
  };

  return (
    <>
      <div className="timetableContainer">
        <RadioGroup type="button" onChange={changeMode} value={mode}>
          <Radio value={"day"}>日视图</Radio>
          <Radio value={"week"}>周视图</Radio>
          <Radio value={"month"}>月视图</Radio>
        </RadioGroup>
        <br></br>
        <br></br>
        <DatePicker onChange={changeDate} value={date}></DatePicker>
        <Select
          defaultValue=""
          style={{ width: 120, marginLeft: 20 }}
          onChange={changeDepartment}
          placeholder="全部部门"
        >
          {department &&
            department.map((obj) => {
              return (
                <Select.Option value={obj.id} key={obj.id}>
                  {obj.departmentName}
                </Select.Option>
              );
            })}
        </Select>
        <br></br>
        <br></br>
        <Calendar
          className="calendarContent"
          mode={mode}
          displayValue={date}
          events={events}
          range={
            mode === "range"
              ? [new Date(2023, 10, 25), new Date(2023, 11, 30)]
              : []
          }
        ></Calendar>
      </div>
    </>
  );
};

export default TimeTable;
