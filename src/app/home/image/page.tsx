"use client";

import AddImageButton from "@/components/image/AddImageButton";
import styles from "./page.module.scss";
import { Pagination, Tabs, TabPane, Button } from "@douyinfe/semi-ui";
import { Image as SemiImage } from "@douyinfe/semi-ui";
import { useEffect, useState } from "react";
import { getPictureDir, getPictureList } from "@/apis/picture";
import Numeral from "@douyinfe/semi-ui/lib/es/typography/numeral";
import DeleteImagesButton from "@/components/image/DeleteImageButton";
import getAdminPermission from "@/utils/getAdminPermisson";

export default function Image() {
  const [pictureDir, setPictureDir] = useState<Array<string>>([]);
  const [imageData, setImageData] = useState<
    Array<{ uri: string; id: number }>
  >([]);
  const [total, setTotal] = useState<number>(0);
  const [chosenTab, setChosenTab] = useState<string>("developer");
  const [page, setPage] = useState<number>(1);

  //封装api和set
  function getNewPictureList(dir: string, num: number, size: number) {
    setImageData([]);
    getPictureList(dir, num, size).then((res) => {
      console.log(res.data);

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
  }, []);
  const permissions = getAdminPermission();

  useEffect(() => {
    // setPage(1);
    getNewPictureList(chosenTab, 1, 6);
  }, [chosenTab]);

  useEffect(() => {
    getNewPictureList(chosenTab, page, 6);
  }, [page, chosenTab]);

  return (
    <>
      <div className={styles.main}>
        <div className={styles.container}>
          <div className={styles.addButtonContainer}>
            {permissions.addPicture && (
              <AddImageButton
                page={page}
                chosenDir={chosenTab}
                setImageDate={setImageData}
                setTotal={setTotal}
              ></AddImageButton>
            )}
          </div>
          <Tabs
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
                      {imageData.map((obj, index) => (
                        <div className={styles.imageContainer} key={index}>
                          <SemiImage
                            className={styles.image}
                            src={obj.uri}
                            alt={`Image ${index + 1}`}
                          />
                          {permissions.deletePicture && (
                            <DeleteImagesButton
                              id={obj.id}
                              dir={chosenTab}
                              setImageData={setImageData}
                              setTotal={setTotal}
                            ></DeleteImagesButton>
                          )}
                        </div>
                      ))}
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
