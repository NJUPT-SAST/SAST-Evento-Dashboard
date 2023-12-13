import { getEventsList } from "@/apis/event";
import Image from "next/image";

const downLoadTimetable = async () => {
  const formattedDate: string = formatMondayDate();
  console.log(formattedDate);

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
  await getEventsList("3", "", formattedDate).then((res) => {
    if (res.success) {
      eventData = res.data;
    }
  });

  console.log(eventData);
  // 创建画布
  const canvas = document.createElement("canvas");
  canvas.width = 3000; // 设置画布宽度
  canvas.height = eventData.length * 2000 + 1000;
  const ctx = canvas.getContext("2d");

  // const image = new Image();

  if (ctx) {
    ctx.fillStyle = "rgb(255,255,255)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    // console.log(image);
    // console.log(image.width);
  }

  // image.src = "../../public/background.png";

  // ctx?.fillStyle = "#7899ba";
  // // ctx?.fillText("hello", 0, 0);

  // ctx?.drawImage(image, 0, 0);
  // if (ctx) {
  //   for (var x = 0; x < canvas.width; x += image.width) {
  //     for (var y = 0; y < canvas.height; y += image.height) {
  //       ctx.drawImage(image, x, y);
  //     }
  //   }
  // }

  // 获取 2D 上下文
  // if (ctx) {
  //   ctx.font = "400px 华文琥珀";
  // ctx.fillStyle = "#7899ba";
  //   ctx.textBaseline = "top";
  //   ctx.fillText("软件研发部", 200, 200);

  //   for (
  //     let heightNumber = 0;
  //     heightNumber < eventData.length;
  //     heightNumber++
  //   ) {
  //     console.log(eventData[heightNumber].title);

  //     ctx.font = "100px 'Righteous', cursive";
  //     if (eventData[heightNumber].departments.length) {
  //       ctx.font = "180px 华文琥珀";
  //       ctx.fillStyle = "#7899ba";
  //       const data: Department[] = eventData[heightNumber].departments;
  //       const formattedString: string = formatArray(data, "&");
  //       const textWidth = ctx.measureText(
  //         `${heightNumber + 1}. ${formattedString}`
  //       ).width;
  //       const cornerRadius = 90;
  //       roundRect(
  //         ctx,
  //         150,
  //         750 + 200 + 400 + heightNumber * 1000,
  //         textWidth + 100,
  //         280,
  //         cornerRadius
  //       );
  //       ctx.fillStyle = "white";
  //       ctx.fillText(
  //         `${heightNumber + 1}. ${formattedString}`,
  //         200,
  //         800 + 200 + 400 + heightNumber * 1000
  //       );
  //     }
  //     ctx.font = "1000 110px 华文中宋";
  //     ctx.fillStyle = "#544140";
  //     const initHeight = 220;
  //     ctx.fillText(
  //       `授课内容：${eventData[heightNumber].description}`,
  //       200,
  //       800 + 200 + 400 + heightNumber * 1000 + 110 + initHeight
  //     );
  //     ctx.fillText(
  //       `时间：${eventData[heightNumber].gmtEventStart
  //         .slice(0, -3)
  //         .slice(5)} -${eventData[heightNumber].gmtEventEnd
  //         .slice(0, -3)
  //         .slice(10)}`,
  //       200,
  //       800 + 200 + 400 + heightNumber * 1000 + 110 + initHeight + 170
  //     );
  //     if (eventData[heightNumber].location) {
  //       ctx.fillText(
  //         `授课地点：${eventData[heightNumber].location}`,
  //         200,
  //         800 + 200 + 400 + heightNumber * 1000 + 110 + initHeight + 170 * 2
  //       );
  //     }
  //   }
  // }

  // 保存画布为 PNG 图片并下载
  const dataURL = canvas.toDataURL(); // 将画布转换为数据 URL
  const link = document.createElement("a"); // 创建下载链接
  link.href = dataURL; // 设置链接地址为数据 URL
  link.download = "square.png"; // 设置下载文件名
  link.click(); // 模拟点击下载链接
};

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

function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number
) {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
  ctx.lineTo(x + width, y + height - radius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  ctx.lineTo(x + radius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
  ctx.fill(); // 填充矩形内部
}
interface Department {
  id: number;
  departmentName: string;
}

function formatArray(arr: Department[], separator: string): string {
  const departmentNames = arr.map((item) => item.departmentName);
  return departmentNames.join(separator);
}

export default downLoadTimetable;
