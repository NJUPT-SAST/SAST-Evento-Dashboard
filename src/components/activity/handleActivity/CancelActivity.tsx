import { useEffect, useState } from "react";
import commonStyles from "../common.module.scss";
import { Modal } from "@douyinfe/semi-ui";
import { cancelEvent, getEvent } from "@/apis/event";

interface CancelActivityProps {
  setData: (date: Array<object>) => void;
  setTotal: (total: number) => void;
  eventId: number;
  currentPage: number;
  title: string;
}

const CancelActivity: React.FC<CancelActivityProps> = ({
  setData,
  setTotal,
  eventId,
  currentPage,
  title,
}) => {
  const [visible, setVisible] = useState<boolean>(false);

  const handleOk = () => {
    cancelEvent(eventId).then((res) => {
      if (res.success === true) {
        getEvent(currentPage, 20).then((res) => {
          setTotal(res.data.total);
          setData(res.data.result);
          setVisible(false);
        });
      }
    });
  };
  return (
    <>
      <span
        className={commonStyles.buttonSpan}
        style={{ color: "rgb(255,174,67)" }}
        onClick={() => setVisible(true)}
      >
        取消活动
      </span>
      <Modal
        title="取消活动"
        maskClosable={false}
        visible={visible}
        onOk={handleOk}
        onCancel={() => setVisible(false)}
      >
        <span>
          你确定要取消名为 <strong>{title}</strong> 的活动嘛？
        </span>
      </Modal>
    </>
  );
};

export default CancelActivity;
