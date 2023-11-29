import React from "react";
import { useState, useEffect } from "react";
import {
  List,
  Skeleton,
  Button,
  Avatar,
  Modal,
  Select,
  Toast,
  Popconfirm,
  ButtonGroup,
} from "@douyinfe/semi-ui";
import { getUserList } from "../../utils/roles";
import "./index.scss";

const Roles = () => {
  const [loading, setLoading] = useState(false);
  const [userList, setUserList] = useState();

  useEffect(() => {
    getUserList().then((res) => {
      console.log(res.data.data);
      setUserList(res.data.data);
    });
  }, []);
  const placeholder = (
    <div
      style={{
        display: "flex",
        alignItems: "flex-start",
        padding: 12,
        borderBottom: "1px solid var(--semi-color-border)",
      }}
    >
      <Skeleton.Avatar style={{ marginRight: 12 }} />
      <div>
        <Skeleton.Title
          style={{ width: 120, marginBottom: 12, marginTop: 12 }}
        />
        <Skeleton.Paragraph style={{ width: 600 }} rows={2} />
      </div>
    </div>
  );
  const [myMethod, setMyMethod] = useState([
    "addAdmin",
    "deletePicture",
    "addEvent",
    "deleteAdmin",
    "updateAction",
    "deleteHomeSlide",
    "getStates",
    "deleteType",
    "getAdmins",
    "addHomeSlide",
    "getFeedbackEvents",
    "updateLocation",
    "getLocations",
    "addLocation",
    "getFeedbacks",
    "addPicture",
    "patchHomeSlide",
    //"putAdmin",
    "deleteLocation",
    "addType",
    "getActionList",
    "eventQrcodeGet",
    "getTypes",
    "updateType",
  ]);

  const [methodList, setMethodList] = useState({
    children: [
      { title: "添加后台管理者", value: "addAdmin" },
      { title: "删除图片", value: "deletePicture" },
    ],
  }); //所有可用的admin权限
  const [grantList, setGrantList] = useState([]); //要授予的权限

  useEffect(() => {
    console.log(grantList);
  }, [grantList]);

  const getMethods = () => {
    const headers = {
      token: token,
    };

    fetch("url", {
      method: "GET",
      headers: headers,
    })
      .then((res) => res.json())
      .then((data) => setMethodList(data));
  };

  const [token, setToken] = useState(
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoiMSIsImV4cCI6MTcyNzIwNjgzOH0.-Ea2xeeN9Un6Y_8zi22PqHPoazcyFjwKOjEvWGrxZF8"
  );

  //获取有后台权限用户列表
  //   const getUserList = () => {
  //     //setLoading(true);
  //     const headers = {
  //       token: token,
  //     };

  //     fetch("url", {
  //       method: "GET",
  //       headers: headers,
  //     })
  //       .then((res) => res.json())
  //       .then((data) => {
  //         setUserList(data);
  //       });
  //     setLoading(false);
  //   };

  const [visible, setVisible] = useState(false);
  const onClose = () => {
    setVisible(false);
  };

  const onOk = () => {
    editPermissions();
  };

  const [current, setCurrent] = useState("B22011111"); //当前用户的studentId
  const [currentUserId, setCurrentUserId] = useState(0); //当前用户的userId
  const addAddministrator = () => {
    //添加用户后台管理
    const body = {
      methodNames: grantList,
      studentId: current,
      userId: currentUserId,
    };
    fetch("url", {
      method: "POST",
      body: body,
      headers: {
        token: token,
      },
    }).then((res) => {
      if (!res.ok) {
        console.log("error");
        Toast.error("添加管理员失败");
      } else {
        console.log("ok");
        Toast.success("添加管理员成功");
      }
    });
  };

  const editPermissions = () => {
    //编辑用户后台管理
    const body = {
      methodNames: grantList,
      studentId: current,
      userId: currentUserId,
    };
    fetch("url", {
      method: "PUT",
      body: body,
      headers: {
        token: token,
      },
    }).then((res) => {
      if (!res.ok) {
        console.log("error");
        Toast.error("编辑用户权限失败");
      } else {
        console.log("ok");
        Toast.success("编辑用户权限成功");
        setVisible(false);
      }
    });
  };

  const deleteUser = () => {
    const headers = {
      token: token,
    };

    fetch("url", {
      method: "DELETE",
      headers: headers,
      body: {
        studentId: current,
        userId: currentUserId,
      },
    }).then((res) => {
      if (!res.ok) {
        console.log("error");
        Toast.error("删除管理员失败");
      } else {
        console.log("ok");
        Toast.success("删除管理员成功");
        setVisible(false);
      }
    });
  };
  var pAdm = !myMethod.includes("putAdmin");
  console.log(pAdm);

  return (
    <>
      {/* 这里设置的是无限滑动的页面 */}
      <div className="rolesContainer">
        <List
          dataSource={userList}
          loading={loading}
          placeholder={placeholder}
          renderItem={(item) => (
            <Skeleton placeholder={placeholder} loading={loading}>
              <List.Item
                header={
                  <Avatar color="blue" src={item.avatar}>
                    {/* 这里设置学号的最后两位为用户的默认头像 */}
                    {item.studentId.slice(-2)}
                  </Avatar>
                }
                main={
                  <div className="userListBarMessage">
                    <span className="nicknameSpan">姓名：{item.nickname}</span>
                    <span className="studentIdSpan">
                      学号：{item.studentId}
                    </span>
                    {/* 这里后端传入组织数据都为空，这里设置组织为前端组 */}
                    <span className="organizationSpan">
                      组织：{item.organization}前端组
                    </span>
                    <div className="userMessage">
                      <span className="emailSpan">邮箱：{item.email}</span>
                      <br></br>
                      <span className="biographySpan">
                        简历：{item.biography}
                      </span>
                    </div>
                  </div>
                }
                extra={
                  <ButtonGroup theme="borderless">
                    <Button
                      onClick={() => {
                        getMethods();
                        setVisible(true);
                        setCurrent(item.studentId);
                        setCurrentUserId(item.userId);
                      }}
                    >
                      编辑
                    </Button>
                    <Button>更多</Button>
                  </ButtonGroup>
                }
              />
              <List.Item
                header={
                  <Avatar
                    color="blue"
                    onClick={() => {
                      getMethods();
                      setVisible(true);
                      setCurrent(item.studentId);
                      setCurrentUserId(item.userId);
                    }}
                    src={item.avatar}
                  >
                    {/* 这里设置学号的最后两位为用户的默认头像 */}
                    {item.studentId.slice(-2)}
                  </Avatar>
                }
                main={
                  <div className="userListBarMessage">
                    <span className="nicknameSpan">姓名：{item.nickname}</span>
                    <span className="studentIdSpan">
                      学号：{item.studentId}
                    </span>
                    {/* 这里后端传入组织数据都为空，这里设置组织为前端组 */}
                    <span className="organizationSpan">
                      组织：{item.organization}前端组
                    </span>
                    <div className="userMessage">
                      <span className="emailSpan">邮箱：{item.email}</span>
                      <br></br>
                      <span className="biographySpan">
                        简历：{item.biography}
                      </span>
                    </div>
                  </div>
                }
              />
              <List.Item
                header={
                  <Avatar
                    color="blue"
                    onClick={() => {
                      getMethods();
                      setVisible(true);
                      setCurrent(item.studentId);
                      setCurrentUserId(item.userId);
                    }}
                    src={item.avatar}
                  >
                    {/* 这里设置学号的最后两位为用户的默认头像 */}
                    {item.studentId.slice(-2)}
                  </Avatar>
                }
                main={
                  <div className="userListBarMessage">
                    <span className="nicknameSpan">姓名：{item.nickname}</span>
                    <span className="studentIdSpan">
                      学号：{item.studentId}
                    </span>
                    {/* 这里后端传入组织数据都为空，这里设置组织为前端组 */}
                    <span className="organizationSpan">
                      组织：{item.organization}前端组
                    </span>
                    <div className="userMessage">
                      <span className="emailSpan">邮箱：{item.email}</span>
                      <br></br>
                      <span className="biographySpan">
                        简历：{item.biography}
                      </span>
                    </div>
                  </div>
                }
              />
            </Skeleton>
          )}
          style={{ userSelect: "none" }}
        />
      </div>

      <Modal
        title="权限详情"
        maskClosable={false}
        visible={visible}
        onOk={onOk}
        onCancel={onClose}
        okButtonProps={{ disabled: pAdm }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <div style={{ fontSize: 18 }}>用户：{current}</div>
          <div>
            {myMethod.includes("addAdmin") ? (
              <Popconfirm
                title="确认添加管理员？"
                content="危险行为！"
                onConfirm={addAddministrator}
                okButtonProps={{ type: "danger" }}
              >
                <Button type="danger" style={{ marginRight: 16 }}>
                  添加
                </Button>
              </Popconfirm>
            ) : (
              <></>
            )}
            {myMethod.includes("deleteAdmin") ? (
              <Popconfirm
                title="确认删除管理员？"
                content="危险行为！"
                onConfirm={deleteUser}
                okButtonProps={{ type: "danger" }}
              >
                <Button type="danger">删除</Button>
              </Popconfirm>
            ) : (
              <></>
            )}
          </div>
        </div>
        <div style={{ fontSize: 16, marginBottom: 10 }}>权限：</div>
        {methodList.children.map((item) => {
          return (
            <div
              key={item.value}
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: 6,
              }}
            >
              <div style={{ fontSize: 14, marginBottom: 10 }}>{item.title}</div>
              <div>
                <Select
                  defaultValue={false}
                  onChange={(value) => {
                    if (value) {
                      // 添加
                      setGrantList((prev) => {
                        return [...prev, item.value];
                      });
                    } else {
                      // 删除
                      setGrantList((prev) => {
                        const newList = prev.filter((m) => m !== item.value);
                        return newList;
                      });
                    }
                  }}
                  style={{ width: 120, margin: 0 }}
                >
                  <Select.Option value={true}>允许</Select.Option>
                  <Select.Option value={false}>拒绝</Select.Option>
                </Select>
                <br />
              </div>
            </div>
          );
        })}
      </Modal>
    </>
  );
};

export default Roles;
