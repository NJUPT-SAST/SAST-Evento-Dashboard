import { Button, Col, Form, Modal, Row } from "@douyinfe/semi-ui";
import { useState } from "react";
import styles from "./ChangeActivityType.module.scss";
import { addType, getTypes } from "@/apis/type";

interface AddActivityTypeProps {
  setActivityTypes: (
    activityTypes: Array<{
      id: number;
      typeName: string;
      allowConflict: boolean;
    }>
  ) => void;
}

const AddActivityType: React.FC<AddActivityTypeProps> = ({
  setActivityTypes,
}) => {
  const [visible, setVisible] = useState<boolean>(false);
  const [changeTypeName, setChangeTypeName] = useState<string>("");
  const [changeAllowConflict, setChangeAllowConflict] = useState<string>("");

  //   TODO:这里有一个bug，当名字和是否允许没有发生改变时，第一次点击state没有更新，无法正常请求

  const showChangeModal = () => {
    setVisible(true);
  };

  const changeFormValue = (values: any) => {
    setChangeTypeName(values.values.typeName);
    setChangeAllowConflict(values.values.allowConflict);
  };

  const handleOk = () => {
    addType(changeTypeName, JSON.parse(changeAllowConflict)).then((res) => {
      if (res.success === true) {
        getTypes().then((res) => {
          setActivityTypes(res.data);
          setVisible(false);
        });
      }
    });
  };

  return (
    <>
      <Button onClick={showChangeModal}>添加活动类型</Button>
      <Modal
        visible={visible}
        title={"添加活动类型"}
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
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Select
                field="allowConflict"
                label="是否可以冲突"
                className={styles.item}
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

export default AddActivityType;
