import { useState } from "react";
import commonStyles from "../common.module.scss";
import { Modal } from "@douyinfe/semi-ui";
import { deleteEvent, getEvent } from "@/apis/event";

interface DeleteActivityProps {
  setDate: (date: Array<object>) => void;
  setTotal: (total: number) => void;
  eventId: number;
  currentPage: number;
  title: string;
}

const DeleteActivity: React.FC<DeleteActivityProps> = ({
  setDate,
  setTotal,
  eventId,
  currentPage,
  title,
}) => {
  const [visible, setVisible] = useState<boolean>(false);

  const handleOk = () => {
    deleteEvent(eventId).then((res) => {
      console.log(res);
      if (res.success === true) {
        getEvent(currentPage, 20).then((res) => {
          console.log(res.data);
          setTotal(res.data.total);
          setDate(res.data.result);
          setVisible(false);
        });
      }
    });
  };
  return (
    <>
      <span
        className={commonStyles.buttonSpan}
        style={{ color: "rgb(249,57,32)" }}
        onClick={() => setVisible(true)}
      >
        删除活动
      </span>
      <Modal
        title="删除活动"
        maskClosable={false}
        visible={visible}
        onOk={handleOk}
        onCancel={() => setVisible(false)}
      >
        <span>
          你确定要删除名为 <strong>{title}</strong> 的活动嘛？
        </span>
      </Modal>
    </>
  );
};

export default DeleteActivity;
