"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./page.module.scss";
import {
  Button,
  Calendar,
  DatePicker,
  Radio,
  RadioGroup,
} from "@douyinfe/semi-ui";
import { getEventsList } from "@/apis/event";
import { CalenderItem } from "@/components/timetable/CalenderItem";
import { DepartmentSelection } from "@/components/timetable/DepartmentSelect";
import downLoadTimetable from "@/utils/downLoadTimetable";
import Head from "next/head";

export default function Timetable() {
  const [mode, setMode] = useState<"day" | "week" | "month">("day");
  const [date, setDate] = useState<Date>(new Date());
  const [eventsData, setEventsData] = useState<Array<any> | undefined>();
  const [chosenDepartment, setChosenDepartment] = useState<string>("");
  // TODO: any=>array
  const [events, setEvents] = useState<any>([]);

  const getNewEventsList = (
    typeId: string,
    departmentId: string,
    time: string
  ) => {
    getEventsList(typeId, departmentId, time).then((res) => {
      console.log(res.data);
      setEventsData(res.data);
    });
  };

  useEffect(() => {
    const newEvents = eventsData?.map((obj) => {
      return {
        key: String(obj.id),
        start: new Date(obj.gmtEventStart),
        end: new Date(obj.gmtEventEnd),
        children: (
          <>
            <CalenderItem obj={obj}></CalenderItem>
          </>
        ),
      };
    });
    console.log(newEvents);
    setEvents(newEvents);
  }, [eventsData]);

  // TODO: 将时间设置为2000年1月1日，能获得自这一天之后的所有数据，可以优化只对后端进行一次请求，不需要每次日期更新都要对后端请求。
  useEffect(() => {
    console.log("hello");
    getNewEventsList("", "", "2000-1-1");
  }, []);

  const changeMode = (value: {
    target: { value: "day" | "week" | "month" };
  }) => {
    setMode(value.target.value);
  };

  useEffect(() => {
    getNewEventsList("", String(chosenDepartment), "2000-1-1");
    console.log(String(chosenDepartment));
  }, [chosenDepartment]);

  return (
    <>
      <Head>
        <link
          href="https://fonts.font.im/css?family=Righteous"
          rel="stylesheet"
        ></link>
      </Head>
      <div className={styles.main}>
        <RadioGroup type="button" onChange={changeMode} value={mode}>
          <Radio value={"day"}>日视图</Radio>
          <Radio value={"week"}>周视图</Radio>
          <Radio value={"month"}>月视图</Radio>
        </RadioGroup>
        <br></br>
        <br></br>
        <DatePicker
          onChange={(value: any) => setDate(value)}
          value={date}
        ></DatePicker>
        <DepartmentSelection
          setChosenDepartment={setChosenDepartment}
        ></DepartmentSelection>
        <Button className={styles.button} onClick={downLoadTimetable}>
          一键下载本周活动总览图
        </Button>
        <br></br>
        <br></br>
        <div id="calendar">
          <Calendar
            className={styles.calendar}
            mode={mode}
            displayValue={date}
            events={events}
          ></Calendar>
        </div>
      </div>
    </>
  );
}
