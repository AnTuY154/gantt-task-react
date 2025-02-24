import React, { useRef, useEffect, ReactChild } from "react";
import { GridProps, Grid } from "../grid/grid";
import { CalendarProps, Calendar } from "../calendar/calendar";
import { TaskGanttContentProps, TaskGanttContent } from "./task-gantt-content";
import styles from "./gantt.module.css";
import { GridBodyProps } from "../grid/grid-body";
import { addToDate } from "../../helpers/date-helper";
import { BarTask } from "../../types/bar-task";
import { Task } from "../../types/public-types";

export type ExtraGirdProps = {
  selectedTask?: BarTask;
  setSelectedTask?: (taskId: string) => void;
  onClick?: (task: Task) => void;
};

export type TaskGanttProps = {
  gridProps: GridProps & ExtraGirdProps;
  calendarProps: CalendarProps;
  barProps: TaskGanttContentProps;
  ganttHeight: number;
  scrollY: number;
  scrollX: number;
  showEffort?: boolean;
};
export const TaskGantt: React.FC<TaskGanttProps> = ({
  gridProps,
  calendarProps,
  barProps,
  ganttHeight,
  scrollY,
  scrollX,
  showEffort,
}) => {
  const ganttSVGRef = useRef<SVGSVGElement>(null);
  const horizontalContainerRef = useRef<HTMLDivElement>(null);
  const verticalGanttContainerRef = useRef<HTMLDivElement>(null);
  const newBarProps = { ...barProps, svg: ganttSVGRef };

  useEffect(() => {
    if (horizontalContainerRef.current) {
      horizontalContainerRef.current.scrollTop = scrollY;
    }
  }, [scrollY]);

  useEffect(() => {
    if (verticalGanttContainerRef.current) {
      verticalGanttContainerRef.current.scrollLeft = scrollX;
    }
  }, [scrollX]);

  const highlightCalendar = ({
    rtl,
    dates,
    columnWidth,
    rowHeight,
    todayColor,
  }: GridBodyProps) => {
    const now = new Date();
    let tickX = 0;
    let today: ReactChild = <rect />;
    for (let i = 0; i < dates.length; i++) {
      const date = dates[i];

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
            height={rowHeight}
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
            height={rowHeight}
            fill={todayColor}
          />
        );
      }
      tickX += columnWidth;
    }
    return <g className="today">{today}</g>;
  };

  return (
    <div
      className={styles.ganttVerticalContainer}
      ref={verticalGanttContainerRef}
      dir="ltr"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={gridProps.svgWidth}
        height={calendarProps.headerHeight + (showEffort ? 40 : 0)}
        fontFamily={barProps.fontFamily}
      >
        <Calendar
          {...calendarProps}
          highlightToday={highlightCalendar({ ...gridProps })}
          showEffort={showEffort}
        />
      </svg>
      <div
        ref={horizontalContainerRef}
        className={styles.horizontalContainer}
        style={
          ganttHeight
            ? { height: ganttHeight, width: gridProps.svgWidth }
            : { width: gridProps.svgWidth }
        }
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={gridProps.svgWidth}
          height={barProps.rowHeight * barProps.tasks.length}
          fontFamily={barProps.fontFamily}
          ref={ganttSVGRef}
        >
          <Grid {...gridProps} showEffort={showEffort} />
          <TaskGanttContent {...newBarProps} />
        </svg>
      </div>
    </div>
  );
};
