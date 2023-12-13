"use client";

import React, { useCallback, useEffect, useState } from "react";
import {
  Input,
  Tabs,
  TabPane,
  Pagination,
  ImagePreview,
  Button,
} from "@douyinfe/semi-ui";
import styles from "./page.module.scss";
import { getSlide } from "@/apis/slide";
import { slideDate } from "@/utils/commonInterface";
import Image from "next/image";
import ChangeUrl from "@/components/picture/ChangeUrl";
import SavePicture from "@/components/picture/SavePicture";
import DeletePicture from "@/components/picture/DeletePicture";
import AddPicture from "@/components/picture/AddPicture";
import getAdminPermission, { Permissions } from "@/utils/getAdminPermission";
import { Image as SemiImage } from "@douyinfe/semi-ui";
import {
  IconMinus,
  IconPlus,
  IconRotate,
  IconDownload,
  IconRealSizeStroked,
  IconWindowAdaptionStroked,
} from "@douyinfe/semi-icons";

export default function Picture() {
  const [data, setData] = useState<Array<slideDate>>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [title, setTitle] = useState<string>("");
  const [link, setLink] = useState<string>("");
  const [url, setUrl] = useState<string>("");
  const [total, setTotal] = useState<number>(0);
  const [permissions, setPermissions] = useState<Permissions>();
  const [chosenTabKey, setChosenTabKey] = useState<number>(0);

  useEffect(() => {
    // const permissions = getAdminPermission();
    setPermissions(getAdminPermission());
  }, []);

  const renderPreviewMenu = (props: any) => {
    const {
      ratio,
      disableZoomIn,
      disableZoomOut,
      onRotateLeft,
      onRatioClick,
      onZoomIn,
      onZoomOut,
    } = props;
    return (
      <div
        style={{
          background: "grey",
          height: 40,
          width: 280,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-around",
          borderRadius: 3,
        }}
      >
        <Button
          icon={<IconMinus size="large" />}
          type="tertiary"
          onClick={!disableZoomOut ? onZoomOut : undefined}
          disabled={disableZoomOut}
        />
        <Button
          icon={<IconPlus size="large" />}
          type="tertiary"
          onClick={!disableZoomIn ? onZoomIn : undefined}
          disabled={disableZoomIn}
        />
        <Button
          icon={
            ratio === "adaptation" ? (
              <IconRealSizeStroked size="large" />
            ) : (
              <IconWindowAdaptionStroked size="large" />
            )
          }
          type="tertiary"
          onClick={onRatioClick}
        />
        <Button
          icon={<IconRotate size="large" />}
          type="tertiary"
          onClick={onRotateLeft}
        />
      </div>
    );
  };

  useEffect(() => {
    getSlide(currentPage).then((res: any) => {
      setData(res.data.slides);
      setTotal(res.data.total);
      setTitle(res.data.slides[0].title);
      setLink(res.data.slides[0].link);
      setUrl(res.data.slides[0].url);
      setChosenTabKey(res.data.slides[0].id);
    });
  }, [currentPage]);

  useEffect(() => {
    console.log(data);
    setTitle(data[0]?.title);
    setLink(data[0]?.link);
    setUrl(data[0]?.url);
  }, [data]);

  const changeTab = (value: string) => {
    const indexId = Number(value);
    console.log(indexId);
    setChosenTabKey(indexId);
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
        <Tabs
          tabPosition="left"
          type="button"
          onChange={changeTab}
          activeKey={String(chosenTabKey)}
        >
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
                    <span style={{ whiteSpace: "nowrap" }}>
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
                      {permissions?.patchHomeSlide && (
                        <SavePicture
                          url={url}
                          title={title}
                          link={link}
                          slideId={item.id}
                          setData={setData}
                          currentPage={currentPage}
                        ></SavePicture>
                      )}
                      {permissions?.deleteHomeSlide && (
                        <DeletePicture
                          eventId={item.id}
                          currentPage={currentPage}
                          setData={setData}
                          setTotal={setTotal}
                          setChosenTabKey={setChosenTabKey}
                        ></DeletePicture>
                      )}
                    </div>
                  </div>
                  <div className={styles.previewImageContainer}>
                    <SemiImage
                      src={url}
                      alt={item.title}
                      className={styles.previewImage}
                    ></SemiImage>
                  </div>
                </div>
              </TabPane>
            ))}
        </Tabs>
        <div className={styles.PaginationContainer}>
          {permissions?.addHomeSlide && (
            <>
              <AddPicture
                setParentData={setData}
                setParentTotal={setTotal}
                setChosenTabKey={setChosenTabKey}
              ></AddPicture>
            </>
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
