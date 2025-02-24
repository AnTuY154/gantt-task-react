import React, { ReactChild } from "react";
import { Task } from "../../types/public-types";
import { addToDate } from "../../helpers/date-helper";
import styles from "./grid.module.css";
import { ExtraGirdProps } from "../gantt/task-gantt";

export type GridBodyProps = {
  tasks: Task[];
  dates: Date[];
  svgWidth: number;
  rowHeight: number;
  columnWidth: number;
  todayColor: string;
  rtl: boolean;
  showEffort?: boolean
} & ExtraGirdProps;

export const compareDates = (date1: Date, date2: Date) => {
  // Chuyển ngày thành số nguyên YYYYMMDD để so sánh
  const toNumber = (date: Date) =>
    date.getFullYear() * 10000 + (date.getMonth() + 1) * 100 + date.getDate();

  const d1 = toNumber(date1);
  const d2 = toNumber(date2);

  return Math.sign(d1 - d2); // Trả về -1, 0, 1
};

export const GridBody: React.FC<GridBodyProps> = ({
  tasks,
  dates,
  rowHeight,
  svgWidth,
  columnWidth,
  todayColor,
  rtl,
  selectedTask,
  setSelectedTask,
  onClick,
  showEffort
}) => {
  let y = 0;
  const gridRows: ReactChild[] = [];
  const rowLines: ReactChild[] = [
    <line
      key="RowLineFirst"
      x="0"
      y1={0}
      x2={svgWidth}
      y2={0}
      className={styles.gridRowLine}
    />,
  ];

  let fillBetweenTicks: ReactChild[] = [];
  let fillText: ReactChild[] = [];

  let fillEffort: ReactChild[] = [];

  for (const task of tasks) {
    gridRows.push(
      <rect
        onClick={() => {
          if (onClick) {
            onClick?.(task);
            setSelectedTask?.(task?.id);
          }
        }}
        fill={
          selectedTask?.id === task?.id ? "rgba(3, 109, 183, 0.16)" : "#fff"
        }
        cursor={"pointer"}
        key={"Row" + task.id}
        x="0"
        y={y}
        width={svgWidth}
        height={rowHeight}
      />
    );
    rowLines.push(
      <line
        key={"RowLine" + task.id}
        x="0"
        y1={y + rowHeight}
        x2={svgWidth}
        y2={y + rowHeight}
        className={styles.gridRowLine}
      />
    );
    y += rowHeight;
  }

  const now = new Date();
  let tickX = 0;
  const ticks: ReactChild[] = [];
  let today: ReactChild = <rect />;

  for (let i = 0; i < dates.length; i++) {
    const date = dates[i];
    ticks.push(
      <line
        key={date.getTime()}
        x1={tickX}
        y1={0}
        x2={tickX}
        y2={y}
        className={styles.gridTick}
      />
    );
    if (
      (i + 1 !== dates.length &&
        date.getTime() < now.getTime() &&
        dates[i + 1].getTime() >= now.getTime()) ||
      // if current date is last
      (i !== 0 &&
        i + 1 === dates.length &&
        date.getTime() < now.getTime() &&
        addToDate(
          date,
          date.getTime() - dates[i - 1].getTime(),
          "millisecond"
        ).getTime() >= now.getTime())
    ) {
      today = (
        <rect
          x={tickX}
          y={0}
          width={columnWidth}
          height={y}
          fill={todayColor}
        />
      );
    }
    // rtl for today
    if (
      rtl &&
      i + 1 !== dates.length &&
      date.getTime() >= now.getTime() &&
      dates[i + 1].getTime() < now.getTime()
    ) {
      today = (
        <rect
          x={tickX + columnWidth}
          y={0}
          width={columnWidth}
          height={y}
          fill={todayColor}
        />
      );
    }
    let z = 0;

    for (const task of tasks) {
      if (task?.dateActual) {
        for (const dateAc of task?.dateActual) {
          if (compareDates(dateAc?.date, date) === 0) {
            fillBetweenTicks.push(
              <rect
                onClick={dateAc.onClick}
                key={`FillBetweenTicks_${date?.getTime()}_${task.id}`}
                x={tickX + 2}
                y={z + 26}
                width={columnWidth - 4}
                height={15}
                fill={dateAc.isDelay ? "#E82717" : "rgba(255, 158, 159, 1)"} // Example: A semi-transparent blue color
                style={{
                  fontSize: "12px",
                  cursor: dateAc.onClick ? "pointer" : "auto",
                }}
              />
            );

            // Add text on the rectangle
            fillText.push(
              <text
                onClick={dateAc.onClick}
                key={`TextBetweenTicks_${date?.getTime()}`}
                x={tickX + columnWidth / 2} // Center of the rectangle
                y={z + 34.5} // Vertically centered
                fill={dateAc.isDelay ? "white" : "black"}
                textAnchor="middle" // Center align the text horizontally
                dominantBaseline="middle" // Center align the text vertically
                style={{
                  fontSize: "12px",
                  cursor: dateAc.onClick ? "pointer" : "auto",
                }}
              >
                {dateAc.time}
              </text>
            );
          }
        }
      }

      // if (task?.actualEffort && task.type === "projecteffort") {
      //   const [startDate, endDate] = ganttDateRange(tasks, ViewMode.Week, 1);
      //   const newDates = seedDates(startDate, endDate, ViewMode.Week);
      //   // const processHeight = task.height / 2;

      //   // eslint-disable-next-line no-loop-func
      //   task?.actualEffort?.forEach(item => {
      //     const x1 = taskXCoordinate(item.from, newDates, rowHeight);
      //     const x2 = taskXCoordinate(item.to, newDates, rowHeight);

      //     const projectWith = x2 - x1;
      //     fillEffort.push(
      //       <rect
      //         key={`FillEffort_${date?.getTime()}`}
      //         // fill={barColor}
      //         x={x1}
      //         width={projectWith}
      //         y={z + 26}
      //         height={15}
      //         // y={task.y}
      //         // height={processHeight}
      //         // rx={task.barCornerRadius}
      //         // ry={task.barCornerRadius}
      //         className={styles.projectBackground}
      //         fill="rgba(255, 158, 159, 1)" //
      //       />
      //     );

      //     fillText.push(
      //       <text
      //         key={`FillEffortBetweenTicks_${date?.getTime()}`}
      //         x={tickX + columnWidth / 2} // Center of the rectangle
      //         y={z + 34.5} // Vertically centered
      //         fill="black"
      //         textAnchor="middle" // Center align the text horizontally
      //         dominantBaseline="middle" // Center align the text vertically
      //         style={{ fontSize: "12px" }}
      //       >
      //         {item.effort}
      //       </text>
      //     );

      //   });
      // }

      z += rowHeight;
    }

    tickX += columnWidth;
  }
  return (
    <g className="gridBody">
      <g className="rows">{gridRows}</g>
      <g className="rowLines">{rowLines}</g>
      <g className="ticks">  {!showEffort && ticks}</g>
      <g className="today">{today}</g>
      <g className="fillBetween">{fillBetweenTicks}</g>
      <g className="fillEffort">{fillEffort}</g>
      <g className="fillText">{fillText}</g>
    </g>
  );
};
