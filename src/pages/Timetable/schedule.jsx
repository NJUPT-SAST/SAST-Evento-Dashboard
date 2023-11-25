import React from 'react';
import { useState, useEffect } from 'react';
import { Calendar, DatePicker, Button } from '@douyinfe/semi-ui';
import domtoimage from 'dom-to-image';

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

  const [token, setToken] = useState('eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoiMSIsImV4cCI6MTcyNzIwNjgzOH0.-Ea2xeeN9Un6Y_8zi22PqHPoazcyFjwKOjEvWGrxZF8')

  // {const events = [
  //   {
  //     "id": 3,
  //     "title": "标题1",
  //     "description": "描述1",
  //     "gmtEventStart": "2023-08-12 11:08:37",
  //     "gmtEventEnd": "2023-08-12 11:08:45",
  //     "gmtRegistrationStart": "2023-08-12 11:03:50",
  //     "gmtRegistrationEnd": "2023-08-12 11:03:59",
  //     "eventType": {
  //       "id": 1,
  //       "typeName": "类型1",
  //       "allowConflict": false
  //     },
  //     "location": "四川 理塘县 喇嘛垭乡 然日卡巴村",
  //     "tag": "标签1",
  //     "state": "NOT_STARTED",
  //     "departments": [
  //       {
  //         "id": 1,
  //         "departmentName": "部门1"
  //       },
  //       {
  //         "id": 2,
  //         "departmentName": "部门2"
  //       }
  //     ]
  //   },
  //   {
  //     "id": 4,
  //     "title": "标题2",
  //     "description": "描述2",
  //     "gmtEventStart": "2023-08-13 21:23:47",
  //     "gmtEventEnd": "2023-08-13 21:23:54",
  //     "gmtRegistrationStart": "2023-08-12 21:24:00",
  //     "gmtRegistrationEnd": "2023-08-12 21:24:03",
  //     "eventType": {
  //       "id": 1,
  //       "typeName": "类型1",
  //       "allowConflict": false
  //     },
  //     "location": "北京 朝阳区",
  //     "tag": "标签2",
  //     "state": "CHECKING_IN",
  //     "departments": [
  //       {
  //         "id": 1,
  //         "departmentName": "部门1"
  //       }
  //     ]
  //   }
  // ]}

  const [events, setEvents] = useState([{
    key: '0',
    start: new Date(2023, 5, 25, 14, 45, 0),
    end: new Date(2023, 6, 26, 6, 18, 0),
    children: <div style={dailyEventStyle}>6月25日 14:45 ~ 7月26日 6:18</div>,
  }]);

  const t = [{
    id: 3,
    title: "标题1",
    description: "描述1",
    gmtEventStart: "2023-08-12 11:08:37",
    gmtEventEnd: "2023-08-12 19:08:45",
    gmtRegistrationStart: "2023-08-12 11:03:50",
    gmtRegistrationEnd: "2023-08-12 11:03:59",
    eventType: {
      id: 1,
      typeName: "类型1",
      allowConflict: false
    },
    location: "四川 理塘县 喇嘛垭乡 然日卡巴村",
    tag: "标签1",
    state: "NOT_STARTED",
    departments: [
      {
        id: 1,
        departmentName: "部门1"
      },
      {
        id: 2,
        departmentName: "部门2"
      }
    ]
  }]

  const fetchEvents = () => {
    //获取数据
    const headers = {
      token: token
    }
    const requestTime = startDate.toISOString().slice(0, 10);
    console.log(requestTime);

    // fetch("url", {
    //   method: 'POST',
    //   headers: headers,
    //   body: {
    //     time: requestTime
    //   }
    // })
    //   .then(res => res.json())
    //   .then(data => {
    //     const temp = data;
    //     const list = temp.map(item => ({
    //       key: item.id,
    //       start: item.gmtEventStart,
    //       end: item.gmtEventEnd,
    //       children: (
    //         <div style={dailyEventStyle}>
    //           {item.title}<br />{item.description}<br />{item.location}
    //         </div>
    //       )
    //     }));
    //     setEvents(list);
    //   })
    const list = t.map(item => ({
      key: item.id,
      start: new Date(item.gmtEventStart.slice(0, -1)),
      end: new Date(item.gmtEventEnd.slice(0, -1)),
      children: (
        <div style={dailyEventStyle}>
          {item.title}<br />{item.description}<br />{item.location}
        </div>
      )
    }));
    console.log(list)
    setEvents(list);
  }

  useEffect(()=>{
    console.log(events)
  },[events])

  const exportPic = () => {
    domtoimage.toJpeg(document.querySelector('.semi-calendar-week'), { quality: 1, bgcolor: 'white', height: 1500 })
      .then(function (dataUrl) {
        var link = document.createElement('a');
        link.download = 'schedule.jpeg';
        link.href = dataUrl;
        link.click();
      });
  }

  useEffect(() => {
    const start = startDate;
    const end = calculateEndDate(startDate);
    console.log(start, end);
    setRange([start, end]);
    fetchEvents();
  }, [startDate])

  return (
    <>
      <DatePicker value={startDate} showClear={false}
        onChange={date => {
          setStartDate(date);
        }} />
      <Button onClick={exportPic}>导出</Button>
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