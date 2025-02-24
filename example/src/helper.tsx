import { Task } from "../../dist/types/public-types";

export function initTasks() {

  const tasks: Task[] = [
    {
        start: new Date("2025-01-28T18:21:08.000Z"),
        end: new Date("2025-02-11T08:56:22.000Z"),
        name: "25",
        id: "project_72",
        taskId: 72,
        progress: 0,
        type: "projectworkplan",
        hideChildren: true,
        displayOrder: 1,
        categoryName: "Maintain-Tool-Task for Project 3023, Main Category 6, Sub Category 7",
        remainEffort: 25,
        wbsEffort: 8,
        pic: null,
        startDate: "2025.01.29",
        endDate: "2025.02.11",
        styles: {
            backgroundColor: "#9CE0FF",
            progressColor: "#9CE0FF"
        }
    },
    {
        start: new Date("2025-02-17T17:00:00.000Z"),
        end: new Date("2025-02-18T17:00:00.000Z"),
        name: "9",
        id: "task_3",
        progress: 100,
        type: "task",
        taskId: 72,
        dataId: 3,
        displayOrder: 2,
        categoryName: "Test 3",
        startDate: "2025.02.18",
        endDate: "2025.02.19",
        remainEffort: 9,
        styles: {
            backgroundColor: "#FF9E9F",
            progressColor: "#FF9E9F"
        },
        project: "project_72"
    },
    {
        start: new Date("2025-02-17T17:00:00.000Z"),
        end: new Date("2025-02-19T17:00:00.000Z"),
        name: "8",
        id: "task_8",
        progress: 100,
        type: "task",
        taskId: 72,
        dataId: 8,
        displayOrder: 3,
        categoryName: "Test 05",
        startDate: "2025.02.18",
        endDate: "2025.02.20",
        remainEffort: 8,
        styles: {
            backgroundColor: "#FF9E9F",
            progressColor: "#FF9E9F"
        },
        project: "project_72"
    },
    {
        start: new Date("2025-02-10T17:00:00.000Z"),
        end: new Date("2025-02-27T17:00:00.000Z"),
        name: "8",
        id: "task_4",
        progress: 100,
        type: "task",
        taskId: 72,
        dataId: 4,
        displayOrder: 4,
        categoryName: "Test 04",
        startDate: "2025.02.11",
        endDate: "2025.02.28",
        remainEffort: 8,
        styles: {
            backgroundColor: "#FF9E9F",
            progressColor: "#FF9E9F"
        },
        project: "project_72"
    },
    {
        start: new Date("2025-02-18T11:11:43.042Z"),
        end: new Date("2025-02-18T11:11:43.042Z"),
        name: "",
        id: "project_action_72",
        type: "task",
        progress: 100,
        taskId: 72,
        project: "project_72",
        displayOrder: 5,
        categoryName: "Cat1 - Cat2 - Cat3",
        startDate: 1739206800,
        endDate: 1739293200,
        remainEffort: 20,
        isAction: true
    },
    {
        start: new Date("2025-01-24T15:09:17.000Z"),
        end: new Date("2025-02-06T05:14:20.000Z"),
        name: "32",
        id: "project_71",
        taskId: 71,
        progress: 0,
        type: "projectworkplan",
        hideChildren: true,
        displayOrder: 6,
        categoryName: "Test-Design-Task for Project 3023, Main Category 4, Sub Category 6",
        remainEffort: 32,
        wbsEffort: 8,
        pic: null,
        startDate: "2025.01.24",
        endDate: "2025.02.06",
        styles: {
            backgroundColor: "#9CE0FF",
            progressColor: "#9CE0FF"
        }
    },
];

  return tasks;
}

export function getStartEndDateForProject(tasks: Task[], projectId: string) {
  const projectTasks = tasks.filter(t => t.project === projectId);
  let start = projectTasks[0].start;
  let end = projectTasks[0].end;

  for (let i = 0; i < projectTasks.length; i++) {
    const task = projectTasks[i];
    if (start.getTime() > task.start.getTime()) {
      start = task.start;
    }
    if (end.getTime() < task.end.getTime()) {
      end = task.end;
    }
  }
  return [start, end];
}
