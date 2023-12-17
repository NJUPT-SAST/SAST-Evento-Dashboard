"use client";

import AddImageButton from "@/components/image/AddImageButton";
import styles from "./page.module.scss";
import {
  Pagination,
  Tabs,
  TabPane,
  ImagePreview,
  Button,
} from "@douyinfe/semi-ui";
import { Image as SemiImage } from "@douyinfe/semi-ui";
import { useCallback, useEffect, useState } from "react";
import { getPictureDir, getPictureList } from "@/apis/picture";
import getAdminPermission, { Permissions } from "@/utils/getAdminPermission";
import {
  IconChevronLeft,
  IconChevronRight,
  IconMinus,
  IconPlus,
  IconRotate,
  IconDownload,
  IconRealSizeStroked,
  IconWindowAdaptionStroked,
  IconDelete,
} from "@douyinfe/semi-icons";
import DeleteImagesButton from "@/components/image/DeleteImageButton";

export default function Image() {
  const [pictureDir, setPictureDir] = useState<Array<string>>([]);
  const [imageData, setImageData] = useState<
    Array<{ uri: string; id: number; cosKey: string }>
  >([]);
  const [total, setTotal] = useState<number>(0);
  const [chosenTab, setChosenTab] = useState<string>("developer");
  const [page, setPage] = useState<number>(1);
  const [permissions, setPermissions] = useState<Permissions>();
  const [chosenImageData, setChosenImageData] = useState<any>();

  //封装api和set
  function getNewPictureList(dir: string, num: number, size: number) {
    setImageData([]);
    getPictureList(dir, num, size).then((res) => {
      const data = res.data;
      setTotal(data.total);
      setImageData(data.images);
      if (num === 1) {
        setPage(1);
      }
    });
  }

  useEffect(() => {
    getPictureDir().then((res) => {
      setPictureDir(res.data);
    });
    const permissions = getAdminPermission();
    setPermissions(permissions);
  }, []);

  useEffect(() => {
    getNewPictureList(chosenTab, 1, 6);
  }, [chosenTab]);

  useEffect(() => {
    getNewPictureList(chosenTab, page, 6);
  }, [page, chosenTab]);

  const renderPreviewMenu = (props: any) => {
    const {
      ratio,
      disabledPrev,
      disabledNext,
      disableZoomIn,
      disableZoomOut,
      onNext,
      onPrev,
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
          icon={<IconChevronLeft size="large" />}
          type="tertiary"
          onClick={!disabledPrev ? onPrev : undefined}
          disabled={disabledPrev}
        />
        <Button
          icon={<IconChevronRight size="large" />}
          type="tertiary"
          onClick={!disabledNext ? onNext : undefined}
          disabled={disabledNext}
        />
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
        <DeleteImagesButton
          cosKey={String(chosenImageData?.cosKey)}
          dir={chosenTab}
          setImageData={setImageData}
          setTotal={setTotal}
        ></DeleteImagesButton>
      </div>
    );
  };

  const changeImage = (value: number) => {
    setChosenImageData(imageData[value]);
  };

  return (
    <>
      <div className={styles.main}>
        <div className={styles.container}>
          <div className={styles.addButtonContainer}>
            {permissions?.addPicture && (
              <AddImageButton
                page={page}
                chosenDir={chosenTab}
                setImageDate={setImageData}
                setTotal={setTotal}
              ></AddImageButton>
            )}
          </div>
          <Tabs
            lazyRender={true}
            tabPosition="left"
            type="button"
            onChange={setChosenTab}
            className={styles.tab}
          >
            {pictureDir &&
              pictureDir.map((item, index) => (
                <TabPane
                  tab={<span>{item}</span>}
                  itemKey={item}
                  className="tabPane"
                  key={index}
                >
                  <div style={{ padding: "0 24px" }}>
                    <div className={styles.imageGallery}>
                      <ImagePreview
                        onChange={changeImage}
                        style={{
                          display: "flex",
                          flexWrap: "wrap",
                          gap: "15px",
                          width: "100%",
                        }}
                        renderPreviewMenu={renderPreviewMenu}
                      >
                        {imageData.map((obj, index) => (
                          <div className={styles.imageContainer} key={index}>
                            <SemiImage
                              className={styles.image}
                              src={obj.uri}
                              alt={`Image ${index + 1}`}
                            />
                          </div>
                        ))}
                      </ImagePreview>
                    </div>
                  </div>
                </TabPane>
              ))}
          </Tabs>
          <div className={styles.bottomPagination}>
            <Pagination
              onChange={setPage}
              total={total}
              pageSize={6}
              currentPage={page}
            />
          </div>
        </div>
      </div>
    </>
  );
}
