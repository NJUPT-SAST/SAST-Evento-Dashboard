"use client";

import React, { useEffect, useState } from "react";
import {
  Input,
  Tabs,
  TabPane,
  Button,
  Pagination,
  Modal,
  Card,
  Notification,
  Select,
  Space,
} from "@douyinfe/semi-ui";
import styles from "./page.module.scss";
import { getSlide } from "@/apis/slide";
import { slideDate } from "@/utils/commonInterface";
import Image from "next/image";
import ChangeUrl from "@/components/picture/ChangeUrl";
import SavePicture from "@/components/picture/SavePicture";
import DeletePicture from "@/components/picture/DeletePicture";
import AddPicture from "@/components/picture/AddPicture";
import getAdminPermission from "@/utils/getAdminPermisson";

export default function Picture() {
  const [data, setData] = useState<Array<slideDate>>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  let opts = {
    title: "图片详情",
    content: "请点击图片放大查看",
    duration: 3,
    position: "top",
  };
  const [title, setTitle] = useState<string>("");
  const [link, setLink] = useState<string>("");
  const [url, setUrl] = useState<string>("");
  const [total, setTotal] = useState<number>(0);

  const permissions = getAdminPermission();

  useEffect(() => {
    getSlide(currentPage).then((res: any) => {
      console.log(res.data);
      console.log(res.data.slides);
      setData(res.data.slides);
      setTotal(res.data.total);
      setTitle(res.data.slides[0].title);
      setLink(res.data.slides[0].link);
      setUrl(res.data.slides[0].url);
    });
  }, [currentPage]);

  const changeTab = (value: string) => {
    const indexId = Number(value);
    const newData: slideDate | undefined = data?.find(
      (obj) => obj.id === indexId
    );
    if (newData !== undefined) {
      setTitle(newData.title);
      setLink(newData.link);
      setUrl(newData.url);
    }
  };
  const handlePageChange = (value: number) => {
    setCurrentPage(value);
  };

  return (
    <>
      <div className={styles.main}>
        <Tabs tabPosition="left" type="button" onChange={changeTab}>
          {data &&
            data.map((item: slideDate, index) => (
              <TabPane
                tab={
                  <div className={styles.TabNavContainer}>
                    <Image
                      src={item.url}
                      alt={item.title}
                      width={500}
                      height={500}
                      className={styles.tabImage}
                    ></Image>
                    <span>{item.title}</span>
                  </div>
                }
                itemKey={`${item.id}`}
                key={index}
              >
                <div className={styles.rightContainer}>
                  <div className={styles.upContainer}>
                    <span>
                      <strong>编辑幻灯片</strong>
                    </span>
                    <div className={styles.inputContainer}>
                      <Input
                        prefix="Title"
                        className={styles.input}
                        value={title}
                        onChange={setTitle}
                      ></Input>
                      <Input
                        prefix="Link"
                        className={styles.input}
                        value={link}
                        onChange={setLink}
                      ></Input>
                      <ChangeUrl setUrl={setUrl}></ChangeUrl>
                      {permissions.patchHomeSlide && (
                        <SavePicture
                          url={url}
                          title={title}
                          link={link}
                          slideId={item.id}
                          setData={setData}
                          currentPage={currentPage}
                        ></SavePicture>
                      )}
                      {permissions.deleteHomeSlide && (
                        <DeletePicture
                          eventId={item.id}
                          currentPage={currentPage}
                          setData={setData}
                          setTotal={setTotal}
                        ></DeletePicture>
                      )}
                    </div>
                  </div>
                  <div className={styles.previewImageContainer}>
                    <Image
                      src={url}
                      alt={item.title}
                      width={1000}
                      height={618}
                      className={styles.previewImage}
                    ></Image>
                  </div>
                </div>
              </TabPane>
            ))}
        </Tabs>
        <div className={styles.PaginationContainer}>
          {permissions.addHomeSlide && (
            <AddPicture
              setParentData={setData}
              setParentTotal={setTotal}
            ></AddPicture>
          )}

          <Pagination
            total={total}
            onChange={handlePageChange}
            pageSize={10}
          ></Pagination>
        </div>
      </div>
    </>
  );
}
