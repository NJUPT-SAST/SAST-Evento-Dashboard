import { Button, Col, Form, Modal, Row } from "@douyinfe/semi-ui";
import { useState } from "react";
import styles from "./ChangeActivityType.module.scss";
import { changeType, getTypes } from "@/apis/type";

interface ChangeActivityTypeProps {
  id: number;
  typeName: string;
  allowConflict: boolean;
  setActivityTypes: (
    activityTypes: Array<{
      id: number;
      typeName: string;
      allowConflict: boolean;
    }>
  ) => void;
}

const ChangeActivityType: React.FC<ChangeActivityTypeProps> = ({
  id,
  typeName,
  allowConflict,
  setActivityTypes,
}) => {
  const [visible, setVisible] = useState<boolean>(false);
  const [changeTypeName, setChangeTypeName] = useState<string>(typeName);
  const [changeAllowConflict, setChangeAllowConflict] = useState<string>(
    `${allowConflict}`
  );

  //   TODO:这里有一个bug，当名字和是否允许没有发生改变时，第一次点击state没有更新，无法正常请求

  const showChangeModal = () => {
    setVisible(true);
  };

  const changeFormValue = (values: any) => {
    setChangeTypeName(values.values.typeName);
    setChangeAllowConflict(values.values.allowConflict);
  };

  const handleOk = () => {
    changeType(id, changeTypeName, JSON.parse(changeAllowConflict)).then(
      (res) => {
        if (res.success === true) {
          getTypes().then((res) => {
            setActivityTypes(res.data);
            setVisible(false);
          });
        }
      }
    );
  };

  return (
    <>
      <Button onClick={showChangeModal} type="warning">
        编辑
      </Button>
      <Modal
        visible={visible}
        title={"修改活动类型"}
        onOk={handleOk}
        onCancel={() => setVisible(false)}
        closeOnEsc={true}
      >
        <Form className={styles.form} onChange={changeFormValue}>
          <Row className={styles.row}>
            <Col>
              <Form.Input
                field="typeName"
                label="活动类型"
                className={styles.item}
                initValue={typeName}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Select
                field="allowConflict"
                label="是否可以冲突"
                className={styles.item}
                initValue={`${allowConflict}`}
              >
                <Form.Select.Option value="true">允许</Form.Select.Option>
                <Form.Select.Option value="false">禁止</Form.Select.Option>
              </Form.Select>
            </Col>
          </Row>
        </Form>
      </Modal>
    </>
  );
};

export default ChangeActivityType;
