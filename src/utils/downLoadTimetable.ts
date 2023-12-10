import { getEventsList } from "@/apis/event";
import { time } from "console";

const downLoadTimetable = async () => {
  const formattedDate: string = formaDate();
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
  await getEventsList("", "", formattedDate).then((res) => {
    if (res.success) {
      eventData = res.data;
    }
  });

  console.log(eventData);
  // 创建画布
  const canvas = document.createElement("canvas");
  canvas.width = 3000; // 设置画布宽度
  canvas.height = eventData.length * 2000; // 设置画布高度

  // 获取 2D 上下文
  const ctx = canvas.getContext("2d");
  if (ctx) {
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.strokeRect(200, 200, 2600, 800);
    ctx.font = "240px 'Righteous', cursive";
    ctx.fillStyle = "black";
    ctx.textBaseline = "top";
    ctx.fillText("软件研发部", 200, 200);

    for (
      let heightNumber = 0;
      heightNumber < eventData.length;
      heightNumber++
    ) {
      console.log(eventData[heightNumber].title);

      ctx.strokeRect(200, 800 + 200 + 400 + heightNumber * 1000, 2600, 800);
      ctx.font = "100px 'Righteous', cursive";
      if (eventData[heightNumber].departments.length) {
        ctx.fillText(
          `${heightNumber + 1}.${
            eventData[heightNumber].departments[0].departmentName
          }`,
          200,
          800 + 200 + 400 + heightNumber * 1000
        );
      }
      ctx.fillText(
        `授课内容：${eventData[heightNumber].description}`,
        200 + 100,
        800 + 200 + 400 + heightNumber * 1000 + 120
      );
      ctx.fillText(
        `时间：${eventData[heightNumber].gmtEventStart.slice(
          0,
          -3
        )}-${eventData[heightNumber].gmtEventEnd.slice(0, -3)}`,
        200 + 100,
        800 + 200 + 400 + heightNumber * 1000 + 240
      );
      if (eventData[heightNumber].location) {
        ctx.fillText(
          `授课地点：${eventData[heightNumber].location}`,
          200 + 100,
          800 + 200 + 400 + heightNumber * 1000 + 360
        );
      }
    }
  }

  // 保存画布为 PNG 图片并下载
  const dataURL = canvas.toDataURL(); // 将画布转换为数据 URL
  const link = document.createElement("a"); // 创建下载链接
  link.href = dataURL; // 设置链接地址为数据 URL
  link.download = "square.png"; // 设置下载文件名
  link.click(); // 模拟点击下载链接
};

//时间格式化（周日算下一个星期的第一天）
const formaDate = () => {
  const currentDate = new Date();

  // 获取当前日期的星期几（0 表示星期日，1 表示星期一，以此类推）
  const currentDayOfWeek = currentDate.getDay();

  // 获取本周的第一天（周一）的日期
  const firstDayOfWeek = new Date(currentDate);
  firstDayOfWeek.setDate(currentDate.getDate() - currentDayOfWeek + 1);

  // 获取年、月、日
  const year = firstDayOfWeek.getFullYear(); // 年份
  const month = firstDayOfWeek.getMonth() + 1; // 月份（注意：月份从 0 开始，需要加 1）
  const day = firstDayOfWeek.getDate(); // 日期

  // 格式化日期
  const formattedDate = `${year}-${month < 10 ? "0" + month : month}-${
    day < 10 ? "0" + day : day
  }`;

  //   console.log(formattedDate);

  return formattedDate;
};

export default downLoadTimetable;
