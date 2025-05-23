import React, { useState } from "react";
import { Dropdown, Button, Tag } from "@douyinfe/semi-ui";
import { IconMore } from "@douyinfe/semi-icons";
import EventQRcodeGet from "./EventQRcodeGet";
import ManagerPermission from "./handleManger/ManagerPermission";
import styles from "./MoreOperate.module.scss";
import PutActivity from "./handleActivity/PutActivity";
import DeleteActivity from "./handleActivity/DeleteActivity";
import CancelActivity from "./handleActivity/CancelActivity";

interface MoreOperateProps {
  setData: (date: Array<object>) => void;
  setTotal: (total: number) => void;
  setLoading: (loading: boolean) => void;
  currentPage: number;
  record: {
    title: string;
    tag: string;
    gmtEventStart: string;
    gmtEventEnd: string;
    gmtRegistrationStart: string;
    gmtRegistrationEnd: string;
    departments: Array<{ id: number; departmentName: string }>;
    eventType: { allowConflict: boolean; id: number; typeName: string };
    location: string;
    state: number;
    description: string;
    id: number;
  };
}

const MoreOperate: React.FC<MoreOperateProps> = ({
  setData,
  setTotal,
  setLoading,
  currentPage,
  record,
}) => {

  return (
    <>
      <Dropdown
        zIndex={100}
        mouseLeaveDelay={100}
        stopPropagation={true}
        clickToHide
        keepDOM={true}
        render={
          <Dropdown.Menu>
            <Dropdown.Item>
              <EventQRcodeGet eventId={record.id}></EventQRcodeGet>
            </Dropdown.Item>
            <Dropdown.Item>
              <ManagerPermission
                title={record.title}
                eventId={record.id}
              ></ManagerPermission>
            </Dropdown.Item>
            <Dropdown.Item>
              <PutActivity
                title={record.title}
                tag={record.tag}
                eventStart={record.gmtEventStart}
                eventEnd={record.gmtEventEnd}
                registrationStart={record.gmtRegistrationStart}
                registrationEnd={record.gmtRegistrationEnd}
                departments={record.departments}
                eventType={record.eventType}
                location={record.location}
                state={record.state}
                description={record.description}
                id={record.id}
                setData={setData}
                setTotal={setTotal}
                setLoading={setLoading}
                currentPage={currentPage}
              ></PutActivity>
            </Dropdown.Item>
            <Dropdown.Item>
              <CancelActivity
                setData={setData}
                setTotal={setTotal}
                eventId={record.id}
                currentPage={currentPage}
                title={record.title}
              ></CancelActivity>
            </Dropdown.Item>
            <Dropdown.Item>
              <DeleteActivity
                setData={setData}
                setTotal={setTotal}
                eventId={record.id}
                currentPage={currentPage}
                title={record.title}
              ></DeleteActivity>
            </Dropdown.Item>
          </Dropdown.Menu>
        }
      >
        <IconMore className={styles.moreButton}></IconMore>
      </Dropdown>
    </>
  );
};

export default MoreOperate;
