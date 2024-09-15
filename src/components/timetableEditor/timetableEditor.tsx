"use client";
import Konva from "konva";
import { Group } from "konva/lib/Group";
import { Layer } from "konva/lib/Layer";
import { Stage } from "konva/lib/Stage";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { MemoToolsBar } from "./toolsBar";
import { generateEvents } from "@/utils/generateEvents";

import { makeEditable } from "@/utils/makeEditable";
import { Event } from "@/types/event";
import { useEventsList } from "@/hooks/useEventsList";
import { getEvent } from "@/apis/event";
import { getEventsList } from "@/utils/getEventsList";

export const TimetableEditorComponent = () => {
  const stageRef = useRef<Stage | null>(null);
  const layerRef = useRef<Layer | null>(null);
  const notoSansSfBold = useRef<FontFace | null>(null);
  const eventsListRef = useRef<Event[]>([]);
  const { eventsList, setEventsList } = useEventsList();
  const [height, setHeight] = useState<Number>(0);
  const totalGroupRef = useRef<Group | null>(null);
  const headerImageRef = useRef<HTMLImageElement | null>(null);
  const backImageRef = useRef<HTMLImageElement | null>(null);
  // const [eventsList, setEventsList] = useState<Event[]>([]);
  eventsListRef.current = eventsList;

  const getEvents = useCallback(async () => {
    console.log("开始请求");
    getEventsList().then((result) => {
      console.log("请求结果", result);
      setEventsList(result);
    });
  }, []);

  useEffect(() => {
    stageRef.current = new Konva.Stage({
      container: "container",
      width: window.innerWidth / 2,
      height: 0,
    });

    // 创建层
    layerRef.current = new Konva.Layer();

    stageRef.current.add(layerRef.current);

    notoSansSfBold.current = new FontFace(
      "noto-sans-sc-bold",
      "url(./noto-sans-sc-chinese-simplified-700-normal.woff)"
    );

    headerImageRef.current = new Image();
    headerImageRef.current.src = "./Header1.png";

    backImageRef.current = new Image();
    backImageRef.current.src = "./Back.png";

    return () => {
      stageRef.current = null;
      layerRef.current = null;
      notoSansSfBold.current = null;
      headerImageRef.current = null;
      backImageRef.current = null;
    };
  }, [eventsList]);

  useEffect(() => {
    // 当 height 发生变化时,自动重新渲染 background
    const backImageObj = backImageRef.current!;
    const back = new Konva.Rect({
      x: 0,
      y: 0,
      width: canvasWidth(),
      height: stageRef.current?.height(),
      fillPatternImage: backImageObj,
      fillPatternRepeat: "repeat",
      fillPatternScaleX: 0.05,
      fillPatternScaleY: 0.05,
    });

    totalGroupRef.current && totalGroupRef.current.add(back);
    back.zIndex(0);

    layerRef.current?.batchDraw();
  }, [height]);

  const canvasWidth = () => window.innerWidth / 2;

  const generateCanvas = () => {
    // every generate will clear last generate
    layerRef.current?.destroyChildren();
    stageRef.current?.height(0);

    totalGroupRef.current = new Konva.Group();
    const headerGroup = new Konva.Group();
    const headerTitleGroup = new Konva.Group();

    const headerImageObj = headerImageRef.current!;
    const aspectRatio =
      headerImageObj.naturalHeight / headerImageObj.naturalWidth;
    const header = new Konva.Image({
      x: 0,
      y: 0,
      image: headerImageObj,
      width: canvasWidth(),
      height: canvasWidth() * aspectRatio,
    });

    headerGroup.add(header);
    setHeight(stageRef.current!.height() + header.height());
    stageRef.current?.height(stageRef.current.height() + header.height());
    header.zIndex(0);

    const departmentTitle = new Konva.Text({
      x: canvasWidth() * 0.05,
      y: canvasWidth() * 0.16,
      fontSize: canvasWidth() * 0.1,
      fontFamily: "noto-sans-sc",
      text: "软研",
      fill: "black",
    });

    headerTitleGroup.add(departmentTitle);
    makeEditable(departmentTitle, stageRef);

    notoSansSfBold.current
      ?.load()
      .then((loadedFont) => {
        document.fonts.add(loadedFont);

        const classTitle = new Konva.Text({
          x: canvasWidth() * 0.05,
          y: canvasWidth() * 0.28,
          fontSize: canvasWidth() * 0.1,
          fontFamily: "noto-sans-sc-bold",
          lineHeight: 1.1,
          text: "第xx周\n授课课表",
          fill: "black",
        });

        headerTitleGroup.add(classTitle);
        makeEditable(classTitle, stageRef);
      })
      .catch((error) => console.log(error));

    const eventsGroup = generateEvents(
      eventsListRef.current,
      stageRef,
      notoSansSfBold,
      canvasWidth(),
      setHeight
    );

    headerGroup.add(headerTitleGroup);
    totalGroupRef.current.add(headerGroup);
    layerRef.current?.add(totalGroupRef.current, eventsGroup);
    layerRef.current?.batchDraw();
  };

  const downloadCanvasAsPNG = useCallback(() => {
    console.log("开始下载");
    const canvasContainer = document.getElementById("container");
    const link = document.createElement("a");
    link.download = "timetable.png";
    const canvas = canvasContainer?.querySelector("canvas");
    link.href = canvas?.toDataURL("image/png")!;
    link.click();
  }, []);

  return (
    <div style={{ display: "flex", flexDirection: "row", width: "100vw" }}>
      <div id="container" />
      <div
        id="divider"
        style={{
          height: `${height}px`,
          width: "1px",
          backgroundColor: "#c5c5c5",
        }}
      />
      <MemoToolsBar
        generateClick={generateCanvas}
        // setEventsList={setEventsList}
        downloadCanvasAsPNG={downloadCanvasAsPNG}
      ></MemoToolsBar>
    </div>
  );
};
