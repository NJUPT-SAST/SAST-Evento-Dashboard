import React from "react";
import { Dropdown, Button, Tag } from "@douyinfe/semi-ui";
import { IconMore } from "@douyinfe/semi-icons";
import EventQRcodeGet from "./EventQRcodeGet";

type MoreOperateProps = {
  setDate: (date: Array<object>) => void;
  setTotal: (total: number) => void;
  currentPage: number;
  record: { id: number };
};

function MoreOperate({
  setDate,
  setTotal,
  currentPage,
  record,
}: MoreOperateProps) {
  return (
    <>
      <Dropdown
        trigger="click"
        render={
          <Dropdown.Menu>
            <Dropdown.Item>
              <EventQRcodeGet eventId={record.id}></EventQRcodeGet>
            </Dropdown.Item>
            <Dropdown.Item>活动权限</Dropdown.Item>
            <Dropdown.Item>编辑活动</Dropdown.Item>
            <Dropdown.Item>取消活动</Dropdown.Item>
            <Dropdown.Item>删除活动</Dropdown.Item>
          </Dropdown.Menu>
        }
      >
        <IconMore></IconMore>
      </Dropdown>
    </>
  );
}

export default MoreOperate;
