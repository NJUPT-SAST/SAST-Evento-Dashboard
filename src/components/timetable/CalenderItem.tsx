import styles from "./CalenderItem.module.scss";
import { Popover, Empty, Tag } from "@douyinfe/semi-ui";
import {
  IconDescend,
  IconHistory,
  IconApartment,
  IconActivity,
  IconBell,
} from "@douyinfe/semi-icons";
import React from "react";

interface CalenderItemProps {
  obj: {
    departments: Array<{ departmentName: string; id: number }>;
    id: number;
    title: string;
    gmtRegistrationStart: string;
    gmtRegistrationEnd: string;
    gmtEventStart: string;
    gmtEventEnd: string;
    location: string;
    description: string;
    state: string;
  };
}

export const CalenderItem: React.FC<CalenderItemProps> = ({ obj }) => {
  return (
    <>
      <Popover
        className={styles.popover}
        trigger={"click"}
        // position="top"
        content={
          <Empty
            title={`${obj.title}`}
            description={
              <div className={styles.popoverContainer}>
                负责项目组
                <div className={styles.organizationContainer}>
                  {obj.departments.map(
                    (obj: { departmentName: string; id: number }) => {
                      return (
                        <Tag color="light-blue" key={obj.id}>
                          {obj.departmentName}
                        </Tag>
                      );
                    }
                  )}
                </div>
                <br></br>
                <div className={styles.barItem}>
                  <IconDescend /> <span>{obj.description}</span>
                </div>
                <div className={styles.barItem}>
                  <IconActivity />
                  <span>
                    活动时间：
                    {obj.gmtEventStart.split(" ")[1]}~
                    {obj.gmtEventEnd.split(" ")[1]}
                  </span>
                </div>
                <div className={styles.barItem}>
                  <IconHistory />
                  <span>
                    报名时间：{obj.gmtRegistrationStart.split(" ")[1]}~
                    {obj.gmtRegistrationEnd.split(" ")[1]}
                  </span>
                </div>
                <div className={styles.barItem}>
                  <IconApartment />
                  <span>{obj.location}</span>
                </div>
                <div className={styles.barItem}>
                  <IconBell /> <span>{obj.state}</span>
                </div>
              </div>
            }
            style={{
              width: 400,
              margin: "0 auto",
              display: "flex",
              padding: 20,
            }}
          />
        }
      >
        <div className={styles.CalendarItem} key={obj.id}>
          <div className={styles.title}>
            {obj.departments.map(
              (obj: { departmentName: string; id: number }) => {
                return <span key={obj.id}>{obj.departmentName}</span>;
              }
            )}
            ：{obj.title}
          </div>
          <div className={styles.content}>
            {obj.gmtEventStart.split(" ")[1]}， 地点：
            {obj.location}
          </div>
        </div>
      </Popover>
    </>
  );
};
