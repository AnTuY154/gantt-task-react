import React from "react";
import { TaskItemProps } from "../task-item";
import styles from "./project-dashboard.module.css";

export const ProjectDashboard: React.FC<TaskItemProps> = ({ task, isSelected }) => {
  const barColor = isSelected
    ? task.styles.backgroundSelectedColor
    : task.styles.backgroundColor;
  const processColor = isSelected
    ? task.styles.progressSelectedColor
    : task.styles.progressColor;
  const projectWith = task.x2 - task.x1;
  // const projectLeftTriangle = [
  //   task.x1,
  //   task.y + task.height / 2 - 1,
  //   task.x1,
  //   task.y + task.height,
  //   task.x1 + 15,
  //   task.y + task.height / 2 - 1,
  // ].join(",");
  // const projectRightTriangle = [
  //   task.x2,
  //   task.y + task.height / 2 - 1,
  //   task.x2,
  //   task.y + task.height,
  //   task.x2 - 15,
  //   task.y + task.height / 2 - 1,
  // ].join(",");
  const processHeight = (task.height / 2)

  return (
    <g tabIndex={0} className={styles.projectWrapper}>
      <rect
        fill={barColor}
        x={task.x1}
        width={projectWith}
        y={task.y}
        height={processHeight}
        rx={task.barCornerRadius}
        ry={task.barCornerRadius}
        className={styles.projectBackground}
      />
      <rect
        x={task.x3}
        width={(task?.x4 || 0) - (task?.x3 || 0)}
        y={task.y + processHeight}
        height={processHeight}
        ry={task.barCornerRadius}
        rx={task.barCornerRadius}
        fill={processColor}
      />

    </g>
  );
};
