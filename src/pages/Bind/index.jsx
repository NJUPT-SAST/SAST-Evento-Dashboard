import { Card, Form, Button } from "@douyinfe/semi-ui";
import logo from "../../assets/Logo.png";
import "./index.scss";
function Bind() {
  const handleSubmit = (values) => {
    console.log(values);
    //这里使用绑定学号post的api
  };
  return (
    <div className="bind">
      <Card className="bind-container">
        <img className="bind-logo" alt="bindLogo" src={logo} />
        <Form className="bind-box" onSubmit={(values) => handleSubmit(values)}>
          {/* 通过formState获得用户输入信息，JSON.stringify(formState)格式为json格式 */}
          {({ formState, values, formApi }) => (
            <>
              <Form.Input
                className="formInput"
                field="studentId"
                label="学号"
                placeholder="请输入学号"
                autoComplete="off"
              />
              <Form.Input
                className="formInput"
                mode="password"
                field="password"
                label="密码"
                placeholder="请输入密码"
                autoComplete="off"
              />
              {/* <code style={{ marginTop: 24 }}>{JSON.stringify(formState)}</code> */}
              <Button
                className="formButton"
                theme="solid"
                htmlType="submit"
                type="tertiary"
              >
                绑定
              </Button>
            </>
          )}
        </Form>
      </Card>
    </div>
  );
}

export default Bind;
