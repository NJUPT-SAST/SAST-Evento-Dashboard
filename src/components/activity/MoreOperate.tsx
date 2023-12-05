import React, { useState } from "react";
import { Dropdown, Button, Tag } from "@douyinfe/semi-ui";
import { IconMore } from "@douyinfe/semi-icons";
import EventQRcodeGet from "./EventQRcodeGet";
import ManagerPermission from "./ManagerPermission";
import styles from "./MoreOperate.module.scss";

interface MoreOperateProps {
  setDate: (date: Array<object>) => void;
  setTotal: (total: number) => void;
  currentPage: number;
  record: { id: number; title: string };
}

const MoreOperate: React.FC<MoreOperateProps> = ({
  setDate,
  setTotal,
  currentPage,
  record,
}) => {
  return (
    <>
      <Dropdown
        clickToHide
        trigger="click"
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
            <Dropdown.Item>编辑活动</Dropdown.Item>
            <Dropdown.Item>取消活动</Dropdown.Item>
            <Dropdown.Item>删除活动</Dropdown.Item>
          </Dropdown.Menu>
        }
      >
        <IconMore className={styles.moreButton}></IconMore>
      </Dropdown>
    </>
  );
};

export default MoreOperate;
