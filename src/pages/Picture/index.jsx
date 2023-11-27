import React, { useEffect, useState } from "react";
import {
  Input,
  Tabs,
  TabPane,
  Image,
  Button,
  Pagination,
  Modal,
  Card,
  Notification,
  Select,
} from "@douyinfe/semi-ui";
import { IconTick } from "@douyinfe/semi-icons";
import AddHomeSlide from "../../components/AddCarousel";
import { getSlide, deleteSlide, patchSlide } from "../../utils/homeSlide";
import "./index.scss";
import { getPictureList } from "../../utils/images";

function Picture() {
  const [data, setData] = useState([]);
  const [total, setTotal] = useState();
  const [currentPage, setCurrentPage] = useState();
  const [deleteVisible, setDeleteVisible] = useState(false);
  const [patchVisible, setPatchVisible] = useState(false);
  const [changeUrlVisible, setChangeUrlVisible] = useState(false);
  const [chosenSlideIndex, setChosenSlideIndex] = useState();
  const [chosenSlide, setChosenSlide] = useState();
  const [title, setTitle] = useState();
  const [link, setLink] = useState();
  const [url, setUrl] = useState();
  const [isAddPicture, setIsAddPicture] = useState(false);
  const [isSelect, setIsSelect] = useState();
  const [imagePage, setImagePage] = useState(1);

  const handleValueChange = (value) => {
    setIsAddPicture(value);
  };

  useEffect(() => {
    console.log(isAddPicture);
    getSlide(currentPage).then((res) => {
      console.log(res);
      console.log(res.data.data.slides);
      setData(res.data.data.slides);
      setTotal(res.data.data.total);
      setIsAddPicture(false);
    });
    // getPictureList().then()
  }, [isAddPicture]);

  const getNewSlide = async () => {
    await getSlide(currentPage).then((res) => {
      console.log(res);
      console.log(res.data.data.slides);
      setData(res.data.data.slides);
      setTotal(res.data.data.total);
    });
  };

  useEffect(() => {
    // 当页面刷新时，设置chosenSlide的索引值为第一张图片的id值，即为展示获得的幻灯片的第一张。
    // 注意：这里Tabs要的itemKey必须是字符串，不然控制台会报错：
    // react-jsx-dev-runtime.development.js:87  Warning: Failed prop type: Invalid prop `itemKey` of type `number` supplied to `TabPane`, expected `string`.
    // 这个重置id的逻辑，是在每次重置到第一张图片时，都要执行。
    getSlide(currentPage).then((res) => {
      console.log(res);
      console.log(res.data.data.slides);
      setChosenSlideIndex(`${res.data.data.slides[0].id}`);
      setData(res.data.data.slides);
      setTotal(res.data.data.total);
    });
  }, []);

  useEffect(() => {
    console.log(chosenSlideIndex);
    const newChosenSlide = data.find((obj) => {
      return `${obj.id}` === chosenSlideIndex;
    });
    setChosenSlide(newChosenSlide);
  }, [chosenSlideIndex]);

  useEffect(() => {
    if (chosenSlide !== undefined) {
      console.log(chosenSlide.title);
      setTitle(chosenSlide.title);
      setLink(chosenSlide.link);
      setUrl(chosenSlide.url);
    }
  }, [chosenSlide]);

  const handlePageChange = (page) => {
    console.log(page);
    setCurrentPage(page);
  };

  useEffect(() => {
    getNewSlide();
  }, [currentPage]);

  const deletePicture = async () => {
    await deleteSlide(chosenSlideIndex).then((res) => {
      console.log(res);
    });
    getSlide(currentPage).then((res) => {
      console.log(res);
      console.log(res.data.data.slides);
      setChosenSlideIndex(`${res.data.data.slides[0].id}`);
      setData(res.data.data.slides);
      setTotal(res.data.data.total);
    });
  };

  //change Url Modal框相关代码

  const showChangeUrlModal = () => {
    setChangeUrlVisible(true);
  };

  const handleChangeUrlOk = () => {
    setChangeUrlVisible(false);
  };
  const handleChangeUrlAfterClose = () => {
    setChangeUrlVisible(false);
  };
  const handleChangeUrlCancel = () => {
    setChangeUrlVisible(false);
  };

  //delete Modal框相关代码
  const showDeleteModal = () => {
    if (title !== chosenSlide.title || link !== chosenSlide.link) {
      Notification.open({
        title: "幻灯片发生了修改",
        content: "请先进行保存操作",
        position: "top",
        duration: 2,
      });
    } else {
      setDeleteVisible(true);
    }
  };

  const handleDeleteOk = () => {
    setDeleteVisible(false);
    console.log("Ok button clicked");
    deletePicture();
  };

  const handleDeleteCancel = () => {
    setDeleteVisible(false);
    console.log("Cancel button clicked");
  };

  const handleDeleteAfterClose = () => {
    console.log("After Close callback executed");
  };

  //patch Modal框相关代码
  const showPatchModal = () => {
    if (title === chosenSlide.title && link === chosenSlide.link) {
      Notification.open({
        title: "幻灯片未发生修改",
        content: "请不要进行保存操作",
        position: "top",
        duration: 2,
      });
    } else {
      setPatchVisible(true);
      console.log(url);
    }
  };

  const handlePatchOk = async () => {
    setPatchVisible(false);
    console.log("Ok button clicked");
    await patchSlide(url, link, title, chosenSlideIndex).then((res) => {
      console.log(res);
    });
    getNewSlide();
  };

  const handlePatchCancel = () => {
    setPatchVisible(false);
    console.log("Cancel button clicked");
  };

  const handlePatchAfterClose = () => {
    console.log("After Close callback executed");
  };

  const changeTab = (activeTabId) => {
    console.log(activeTabId);
    setChosenSlideIndex(activeTabId);
  };

  const getTitle = (value) => {
    console.log(value);
    setTitle(value);
  };

  const getLink = (value) => {
    console.log(value);
    setLink(value);
  };

  const selectPicture = (value) => {
    setIsSelect(value);
  };

  const changeImagePage = (page) => {
    console.log(page);
  };

  return (
    <>
      <div className="pictureContainer">
        <div className="mainContent">
          <Tabs tabPosition="left" type="button" onChange={changeTab}>
            {data &&
              data.map((item, index) => (
                <TabPane
                  tab={
                    <div className="TabNavContainer">
                      <img src={item.url} alt={item.title}></img>
                      <span>{item.title}</span>
                    </div>
                  }
                  itemKey={`${item.id}`}
                  key={index}
                  className="rightContainer"
                >
                  <div className="upToolBar">
                    <span>
                      <strong>编辑幻灯片</strong>
                    </span>
                    <div className="inputContainer">
                      <Input
                        prefix="Title"
                        className="input"
                        value={title}
                        onChange={getTitle}
                      ></Input>
                      <Input
                        prefix="Link"
                        className="input"
                        value={link}
                        onChange={getLink}
                      ></Input>
                      <Button onClick={() => showChangeUrlModal()}>
                        修改url
                      </Button>
                      <Button onClick={() => showPatchModal()}>保存修改</Button>
                      <Button onClick={() => showDeleteModal()}>
                        删除幻灯片
                      </Button>
                    </div>
                  </div>
                  <Image src={item.url}></Image>
                </TabPane>
              ))}
          </Tabs>
          <div className="PaginationContainer">
            <AddHomeSlide onValueChange={handleValueChange}></AddHomeSlide>
            <Pagination total={total} onChange={handlePageChange}></Pagination>
          </div>
        </div>
        <Modal
          title="删除幻灯片"
          visible={deleteVisible}
          onOk={handleDeleteOk}
          afterClose={handleDeleteAfterClose} //>=1.16.0
          onCancel={handleDeleteCancel}
          closeOnEsc={true}
        >
          <span>
            <strong> 确定要删除该张幻灯片吗？</strong>
          </span>
          {chosenSlideIndex && (
            <>
              <Card
                style={{ width: "100%" }}
                cover={
                  <img alt="example" src={chosenSlide && chosenSlide.url} />
                }
              >
                <span>
                  <strong>Title: {chosenSlide && chosenSlide.title}</strong>
                </span>
              </Card>
            </>
          )}
        </Modal>
        <Modal
          title="是否保存修改"
          visible={patchVisible}
          onOk={handlePatchOk}
          afterClose={handlePatchAfterClose} //>=1.16.0
          onCancel={handlePatchCancel}
          closeOnEsc={true}
        >
          <span>
            <strong> 确定要修改该张幻灯片吗？</strong>
          </span>
          {chosenSlideIndex && (
            <>
              <Card
                style={{ width: "100%" }}
                cover={
                  <img alt="example" src={chosenSlide && chosenSlide.url} />
                }
              >
                <span>
                  <strong>Title: {title}</strong>
                </span>
                <br></br>
                <span>
                  <strong>Link: {link}</strong>
                </span>
              </Card>
            </>
          )}
        </Modal>

        <Modal
          title="是否要更换图片"
          visible={changeUrlVisible}
          onOk={handleChangeUrlOk}
          afterClose={handleChangeUrlAfterClose} //>=1.16.0
          onCancel={handleChangeUrlCancel}
          closeOnEsc={true}
        >
          <div className="selectContainer">
            <h3>请选择图库目录</h3>
            <Select defaultValue="test" style={{ width: 120 }}>
              <Select.Option value="test">test</Select.Option>
              <Select.Option value="Guest">Guest</Select.Option>
              <Select.Option value="Developer">Developer</Select.Option>
              <Select.Option value="Maintainer">Maintainer</Select.Option>
            </Select>
          </div>
          <Tabs tabPosition="left" type="button" className="TabContent">
            <TabPane>
              <div className="tabPaneContainer">
                <div className="addCarouselImageContainer">
                  <Image src=""></Image>
                </div>
                {/* 这里设置了两个button，随着选定而跳转 */}
                {!isSelect && (
                  <Button
                    style={{ marginRight: 14 }}
                    onClick={() => selectPicture(true)}
                  >
                    选定
                  </Button>
                )}
                {isSelect && (
                  <Button
                    icon={<IconTick />}
                    style={{ marginRight: 14 }}
                    onClick={() => selectPicture(false)}
                  >
                    选定
                  </Button>
                )}
              </div>
            </TabPane>
          </Tabs>
          <div className="paginationContainer">
            <Pagination
              total={total}
              pageSize={4}
              onChange={changeImagePage}
            ></Pagination>
          </div>
        </Modal>
      </div>
    </>
  );
}

export default Picture;
