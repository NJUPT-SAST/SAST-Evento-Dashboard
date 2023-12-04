"use client";

import { useEffect, useState } from "react";
import styles from "./page.module.scss";
import {
  List,
  Skeleton,
  Button,
  Avatar,
  Modal,
  ButtonGroup,
  Transfer,
  Tag,
  Pagination,
} from "@douyinfe/semi-ui";
import { getAdminsList } from "@/apis/permission";
import { ShowPermission } from "@/components/roles/ShowPermission";
import { ChangePermission } from "@/components/roles/ChangePermission";

export default function Roles() {
  const [loading, setLoading] = useState<boolean>(false);
  const [total, setTotal] = useState<number>(0);
  const [page, setPage] = useState<number>(1);
  const [adminList, setAdminList] = useState<
    Array<{
      avatar: string;
      studentId: string;
      nickname: string;
      organization: string;
      email: string;
      biography: string;
      id: string;
    }>
  >([]);

  //将请求和设置数据封装

  function getNewAdminList(current: number, size: number) {
    getAdminsList(current, size).then((res) => {
      console.log(res);
      setAdminList(res.data.users);
      setTotal(res.data.total);
    });
  }

  useEffect(() => {
    getNewAdminList(1, 10);
  }, []);

  useEffect(() => {
    getNewAdminList(page, 10);
  }, [page]);

  return (
    <>
      <div className={styles.main}>
        <List
          className={styles.list}
          dataSource={adminList}
          loading={loading}
          renderItem={(item) => (
            <Skeleton loading={loading}>
              <List.Item
                header={
                  <Avatar
                    color="blue"
                    src={item.avatar}
                    className={styles.avatar}
                  >
                    {/* 这里设置学号的最后两位为用户的默认头像 */}
                    {item.studentId.slice(-2)}
                  </Avatar>
                }
                main={
                  <div className={styles.userListBarMessage}>
                    <span className={styles.nicknameSpan}>
                      姓名：{item.nickname}
                    </span>
                    <br></br>
                    <span className={styles.studentIdSpan}>
                      学号：{item.studentId}
                    </span>
                    <br></br>
                    {/* 这里后端传入组织数据都为空，这里为了测试设置组织为前端组 */}
                    <span className={styles.organizationSpan}>
                      组织：{item.organization}前端组
                    </span>
                    <br></br>
                    <span className={styles.emailSpan}>邮箱：{item.email}</span>
                    <br></br>
                    <span className={styles.biographySpan}>
                      签名：{item.biography}
                    </span>
                  </div>
                }
                extra={
                  <ButtonGroup theme="borderless">
                    <ShowPermission studentId={item.studentId}></ShowPermission>
                    <ChangePermission userId={item.id}></ChangePermission>
                  </ButtonGroup>
                }
              />
            </Skeleton>
          )}
        />
        <Pagination
          className={styles.pagination}
          total={total}
          onChange={setPage}
        ></Pagination>
      </div>
    </>
  );
}
