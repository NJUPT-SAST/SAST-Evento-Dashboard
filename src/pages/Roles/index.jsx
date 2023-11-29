import React from "react";
import { useState, useEffect } from "react";
import {
  List,
  Skeleton,
  Button,
  Avatar,
  Modal,
  ButtonGroup,
  TreeSelect,
  Transfer,
  Tag,
} from "@douyinfe/semi-ui";
import {
  getUserList,
  getAdminTreeDate,
  getUserPermission,
  addUserPermission,
  changeUserPermission,
} from "../../utils/roles";
import "./index.scss";

const Roles = () => {
  const [loading, setLoading] = useState(false);
  const [userList, setUserList] = useState();
  const [treeData, setTreeDate] = useState();
  const [morePermissionVisible, setMorePermissionVisible] = useState(false);
  const [changePermissionVisible, setChangePermissionVisible] = useState(false);
  const [havePermission, setHavePermission] = useState();
  const [chosenUserId, setChosenUserId] = useState();

  useEffect(() => {
    getUserList().then((res) => {
      console.log(res.data.data);
      setUserList(res.data.data.users);
    });
    getAdminTreeDate().then((res) => {
      console.log(res.data.data);
      console.log(res.data.data);
      const newTreeDate = addKeysToData(res.data.data);
      console.log(newTreeDate);
      const labelNewTreeDate = updateTitleToLabel(newTreeDate);
      console.log(labelNewTreeDate);
      setTreeDate(labelNewTreeDate);
    });
    // addUserPermission()
  }, []);

  //接口通过studentId和userId其中一个便可以获得数据
  const getNewUserPermission = async (userId) => {
    await getUserPermission("", userId).then((res) => {
      console.log(res.data.data);
      setHavePermission(res.data.data);
    });
  };

  const changeNewUserPermission = async (userId, methodNames) => {
    await changeUserPermission(userId, methodNames).then((res) => {
      console.log(res);
    });
  };

  //这里后端传入的数据不含有key，在这个函数中给每一个树形结构加上一个key，用来渲染
  function addKeysToData(data, prefix = "") {
    if (data !== null) {
      return data.map((item, index) => {
        const key = prefix + index.toString(); // 生成当前节点的key

        // 判断当前节点是否有子节点
        if (item.children && item.children.length > 0) {
          // 递归调用addKeysToData函数为子节点添加key，并将当前节点的key作为前缀传递下去
          const children = addKeysToData(item.children, key + "-");

          // 返回带有key的当前节点及其子节点
          return {
            ...item,
            key,
            children,
          };
        }

        // 返回带有key的当前节点（无子节点）
        return {
          ...item,
          key,
        };
      });
    }
  }

  //这里后端传入的内容是title，但是组件需要的是label
  function updateTitleToLabel(data) {
    function updateTitle(obj) {
      obj.label = obj.title;
      delete obj.title;

      if (obj.children) {
        for (let i = 0; i < obj.children.length; i++) {
          updateTitle(obj.children[i]);
        }
      }
    }

    for (let i = 0; i < data.length; i++) {
      updateTitle(data[i]);
    }

    return data;
  }

  //moreModal的逻辑代码
  const showMore = (userId) => {
    console.log(userId);
    setMorePermissionVisible(true);
    getNewUserPermission(userId);
  };

  const onMoreClose = () => {
    setMorePermissionVisible(false);
  };

  //addModal的逻辑代码
  const showChange = (userId) => {
    setChangePermissionVisible(true);
    setChosenUserId(userId);
    getNewUserPermission(userId);
  };

  const onChangeClose = () => {
    setChangePermissionVisible(false);
  };

  const onChangeOk = () => {
    setChangePermissionVisible(false);
    console.log(havePermission);
    console.log(chosenUserId);
    changeNewUserPermission(chosenUserId, havePermission);
  };

  return (
    <>
      {/* 这里设置的是无限滑动的页面 */}
      <div className="rolesContainer">
        <List
          dataSource={userList}
          loading={loading}
          renderItem={(item) => (
            <Skeleton loading={loading}>
              <List.Item
                header={
                  <Avatar color="blue" src={item.avatar} className="userAvatar">
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
                    {/* 这里后端传入组织数据都为空，这里为了测试设置组织为前端组 */}
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
                    <Button onClick={() => showMore(item.id)}>权限详情</Button>
                    <Button onClick={() => showChange(item.id)}>
                      权限修改
                    </Button>
                  </ButtonGroup>
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
        visible={morePermissionVisible}
        onCancel={onMoreClose}
        footer={
          <Button type="primary" onClick={onMoreClose}>
            关闭
          </Button>
        }
      >
        <div className="havePermissionShow">
          {havePermission &&
            havePermission.map((item, index) => {
              return (
                <Tag size="small" color="cyan" key={index}>
                  {item}
                </Tag>
              );
            })}
        </div>
      </Modal>
      <Modal
        title="权限添加"
        maskClosable={false}
        visible={changePermissionVisible}
        onOk={onChangeOk}
        onCancel={onChangeClose}
      >
        <Transfer
          dataSource={treeData}
          type="treeList"
          value={havePermission}
          onChange={setHavePermission}
        ></Transfer>
      </Modal>
    </>
  );
};

export default Roles;
