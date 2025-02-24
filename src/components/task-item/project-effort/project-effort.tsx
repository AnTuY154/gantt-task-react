import React, { Fragment } from "react";
import { TaskItemProps } from "../task-item";
import styles from "./project-effort.module.css";
import { taskXCoordinate } from "../../../helpers/bar-helper";
import { ganttDateRange, seedDates } from "../../../helpers/date-helper";
import { ViewMode } from "../../../types/public-types";

export const ProjectEffort: React.FC<TaskItemProps> = ({
  task,
  isSelected,
  tasks,
  columnWidth = 60,
  viewMode = ViewMode.Day,
  svgWidth,
  rowHeight = 50,
}) => {
  const barColor = isSelected
    ? task.styles.backgroundSelectedColor
    : task.styles.backgroundColor;
  const processColor = isSelected
    ? task.styles.progressSelectedColor
    : task.styles.progressColor;
  const processHeight = task.height / 2;
  const [startDate, endDate] = ganttDateRange(tasks, viewMode, 1);
  const newDates = seedDates(startDate, endDate, viewMode);
  const findTaskIndex = tasks?.findIndex(item => item.id === task.id);
  return (
    <g tabIndex={0} className={styles.projectWrapper}>
      {task.estimateEffort?.map(item => {
        const x1 = taskXCoordinate(item.from, newDates, columnWidth);
        const x2 = taskXCoordinate(item.to, newDates, columnWidth);
        const projectWith = x2 - x1;
        return (
          <Fragment>
            <rect
              fill={barColor}
              x={x1}
              width={projectWith + columnWidth}
              y={task.y - 5}
              height={processHeight}
              className={styles.projectBackground}
            />

            <text
              key={`${new Date()?.getTime()}`}
              x={x1 + (projectWith + columnWidth) / 2} // Center of the rectangle
              y={task.y + 4}
              fill="black"
              textAnchor="middle" // Center align the text horizontally
              dominantBaseline="middle" // Center align the text vertically
              style={{ fontSize: "12px" }}
            >
              {item.effort}
            </text>
          </Fragment>
        );
      })}

      {task.actualEffort?.map(item => {
        const x1 = taskXCoordinate(item.from, newDates, columnWidth);
        const x2 = taskXCoordinate(item.to, newDates, columnWidth);
        const projectWith = x2 - x1;
        return (
          <Fragment>
            <rect
              fill={item.color}
              x={x1}
              width={projectWith + columnWidth}
              y={task.y + processHeight + 5}
              height={processHeight}
              // rx={task.barCornerRadius}
              // ry={task.barCornerRadius}
              className={styles.projectBackground}
            />

            <text
              key={`${new Date()?.getTime()}`}
              x={x1 + (projectWith + columnWidth) / 2} // Center of the rectangle
              y={task.y + processHeight + 14}
              fill="black"
              textAnchor="middle" // Center align the text horizontally
              dominantBaseline="middle" // Center align the text vertically
              style={{ fontSize: "12px" }}
            >
              {item.effort}
            </text>
          </Fragment>
        );
      })}

      {task.type === "projecteffort" && (
        <rect
          fill={"#D9E1E5"}
          x={0}
          width={svgWidth}
          y={rowHeight / 2 + rowHeight * findTaskIndex}
          height={1}
          className={styles.projectBackground}
        />
      )}

      <rect
        x={task.x3}
        width={(task?.x4 || 0) - (task?.x3 || 0)}
        y={task.y + processHeight}
        height={processHeight}
        fill={processColor}
      />
    </g>
  );
};
