import React from "react";
import { TaskItemProps } from "../task-item";
import styles from "./project-task-category.module.css";

export const ProjectTaskCategory: React.FC<TaskItemProps> = ({
  task,
  isSelected,
}) => {
  const barColor = isSelected
    ? task.styles.backgroundSelectedColor
    : task.styles.backgroundColor;

  const projectWith = task.x2 - task.x1;

  return (
    <g tabIndex={0} className={styles.projectWrapper}>
      <rect
        fill={barColor}
        x={task.x1}
        width={projectWith}
        y={task.y}
        height={task.height}
        rx={task.barCornerRadius}
        ry={task.barCornerRadius}
        className={styles.projectBackground}
      />
    </g>
  );
};
