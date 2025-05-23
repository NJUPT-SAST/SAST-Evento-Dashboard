import { Button, Modal } from "@douyinfe/semi-ui";
import NextImage from "next/image";
import background from "../../../public/background .png";
import pictureTitle from "../../../public/title1.png";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { getEventsList } from "@/apis/event";
import dayjs from "dayjs";
// import SansVF from "../../../public/";

// const greatVibesFont = localFont({
//   src: "/public/SourceHanSansSC-VF.ttf",
// });

const DownloadPicture: React.FC = () => {
  const [visible, setVisible] = useState<boolean>(false);
  const downloadPicture = async () => {
    let eventData: Array<{
      title: string;
      departments: Array<{
        id: number;
        departmentName: string;
      }>;
      description: string;
      gmtEventStart: string;
      gmtEventEnd: string;
      location: string;
    }> = [];

    //获取本周的数据
    await getEventsList("3pnp", "", formatMondayDate()).then((res) => {
      if (res.success) {
        eventData = res.data;
      }
    });

    //get the week
    const today: Date = new Date();
    console.log(today);
    const end = new Date(2023, 8, 3);
    console.log(end);
    const endDate = dayjs(end);
    const todayDate = dayjs(today);
    const diffInDays = todayDate.diff(endDate, "day");
    console.log(diffInDays);
    
    const diffInWeeks = Math.ceil(diffInDays / 7);
    const backgroundImg = new Image();
    const titleImg = new Image();
    let counter = 0;
    backgroundImg.width = 500;
    backgroundImg.height = 500;
    backgroundImg.src = String(background.src);
    titleImg.src = String(pictureTitle.src);

    const drawImageWhenLoad = () => {
      const scale = pictureTitle.width / 3000;
      const canvas = document.createElement("canvas");
      canvas.width = 3000;
      canvas.height = 2000 + 1200 * eventData.length + 500;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        for (var x = 0; x < canvas.width; x += backgroundImg.width) {
          for (var y = 0; y < canvas.height; y += backgroundImg.height) {
            ctx.drawImage(backgroundImg, x, y);
          }
        }
        ctx.textBaseline = "top";
        ctx.drawImage(titleImg, 0, 0, 3000, titleImg.height / scale);
        ctx.font = "320px Source-Han-Sans-VF";
        ctx.fillText("软研", 120, 400);
        ctx.font = "bold 320px Source-Han-Sans-VF";
        ctx.fillText(`第${diffInWeeks}周`, 120, 800);
        ctx.font = "bold 320px Source-Han-Sans-VF";
        ctx.fillText("授课课表", 120, 1200);
        for (
          let heightNumber = 0;
          heightNumber < eventData.length;
          heightNumber++
        ) {
          if (eventData[heightNumber].departments.length) {
            ctx.font = "1000 180px Source-Han-Sans-VF";
            ctx.fillStyle = "rgb(253,212,71)";
            const data: Department[] = eventData[heightNumber].departments;
            const formattedString: string = formatArray(data, "/");
            const textWidth = ctx.measureText(`>  ${formattedString}`).width;
            ctx.fillRect(180, 1900 + 1200 * heightNumber, textWidth + 180, 360);
            ctx.fillStyle = "black";
            ctx.fillText(
              `>  ${formattedString}`,
              250,
              2000 + 1200 * heightNumber
            );
            ctx.font = "600 110px Source-Han-Sans-VF";
            ctx.fillStyle = "#544140";
            const initHeight = 400;
            ctx.fillText(
              `主题：${eventData[heightNumber].description}`,
              180,
              2000 + heightNumber * 1200 + initHeight
            );
            ctx.fillText(
              `时间：${eventData[heightNumber].gmtEventStart
                .slice(0, -3)
                .slice(5)} -${eventData[heightNumber].gmtEventEnd
                .slice(0, -3)
                .slice(10)}`,
              180,
              2000 + heightNumber * 1200 + initHeight + 170
            );
            if (eventData[heightNumber].location) {
              ctx.fillText(
                `地点：${eventData[heightNumber].location}`,
                180,
                2000 + heightNumber * 1200 + initHeight + 170 * 2
              );
            }
          }
        }
      }
      const dataURL = canvas.toDataURL();
      const link = document.createElement("a");
      link.href = dataURL;
      link.download = "square.png";
      link.click();
    };
    // const myFont = new FontFace("myFont", `url(${SansVF.src})`);
    // myFont.load().then(function (font) {
    // document.fonts.add(font);

    function drawImageCounter() {
      counter++;
      if (counter === 2) {
        // 两张图片都加载完成，执行函数
        drawImageWhenLoad();
      }
    }

    titleImg.onload = drawImageCounter;
    backgroundImg.onload = drawImageCounter;
    // });
  };
  interface Department {
    id: number;
    departmentName: string;
  }
  function formatArray(arr: Department[], separator: string): string {
    const departmentNames = arr.map((item) => item.departmentName);
    return departmentNames.join(separator);
  }

  const formatMondayDate = () => {
    const currentDate = new Date();

    // 获取当前日期的星期几（0 表示星期日，1 表示星期一，以此类推）
    let currentDayOfWeek = currentDate.getDay();

    // 计算距离上一个周一的天数
    let daysToMonday = currentDayOfWeek === 0 ? 6 : currentDayOfWeek - 1;

    // 获取本周的第一天（周一）的日期
    const firstDayOfWeek = new Date(currentDate);
    firstDayOfWeek.setDate(currentDate.getDate() - daysToMonday);

    // 获取年、月、日
    const year = firstDayOfWeek.getFullYear(); // 年份
    const month = firstDayOfWeek.getMonth() + 1; // 月份（注意：月份从 0 开始，需要加 1）
    const day = firstDayOfWeek.getDate(); // 日期

    // 格式化日期
    const formattedDate = `${year}-${month < 10 ? "0" + month : month}-${
      day < 10 ? "0" + day : day
    }`;

    return formattedDate;
  };

  return (
    <>
      <Button style={{ marginLeft: 20 }} onClick={() => setVisible(true)}>
        生成本周授课表
      </Button>
      <Modal
        title="生成授课图片"
        onCancel={() => setVisible(false)}
        visible={visible}
        maskClosable={false}
        onOk={downloadPicture}
      >
        <a href="https://github.com/adobe-fonts/source-han-sans/tree/release?tab=readme-ov-file">
          字体请点击这里下载
        </a>
      </Modal>
    </>
  );
};

export default DownloadPicture;
