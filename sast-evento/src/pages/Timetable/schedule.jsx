import React from 'react';
import { useState, useEffect } from 'react';
import { Calendar, DatePicker } from '@douyinfe/semi-ui';

export default function Schedule() {
  const calculateEndDate = (startDate) => {
    const end = new Date(startDate);
    end.setDate(startDate.getDate() + 7);
    return end;
  }
  const [startDate, setStartDate] = useState(new Date());
  const [range, setRange] = useState([new Date(), calculateEndDate(new Date())]);
  const dailyEventStyle = {
    borderRadius: '3px',
    boxSizing: 'border-box',
    border: 'var(--semi-color-primary) 1px solid',
    padding: '10px',
    backgroundColor: 'var(--semi-color-primary-light-default)',
    height: '100%',
    overflow: 'hidden',
  };
  const allDayStyle = {
    borderRadius: '3px',
    boxSizing: 'border-box',
    border: 'var(--semi-color-bg-1) 1px solid',
    padding: '2px 4px',
    backgroundColor: 'var(--semi-color-primary-light-active)',
    height: '100%',
    overflow: 'hidden',
  };
  const events = [
    {
      key: '0',
      start: new Date(2023, 7, 25, 14, 0, 0),
      end: new Date(2023, 7, 25, 16, 0, 0),
      children: <div style={dailyEventStyle}>7月25日 14:00 ~ 16:00</div>,
    },
    {
      key: '1',
      start: new Date(2023, 7, 26),
      end: new Date(2023, 7, 27),
      allDay: true,
      children: <div style={allDayStyle}>7月26日 ~ 7月27日</div>,
    },
  ];

  useEffect(() => {
    const start = startDate;
    const end = calculateEndDate(startDate);
    console.log(start, end);
    setRange([start, end]);
  }, [startDate])


  return (
    <>
      <DatePicker value={startDate} showClear={false}
        onChange={date => {
          setStartDate(date);
        }} />
      <Calendar
        mode="range"
        range={range}
        height={800}
        events={events}
        markWeekend={true}
      />
    </>

  );

}