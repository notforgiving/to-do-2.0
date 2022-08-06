import React, { FC } from "react";
import { Button, Card } from "react-bootstrap";
import { useTaskItem } from "../hooks/useTaskItem";
import { ITasks } from "../pages/Main/types";

interface ITaskitem {
  data: ITasks;
}

const Taskitem: FC<ITaskitem> = ({ data: { content, isDone, date, _id } }) => {
  const { removeTaskHandler, updateTaskHandler } = useTaskItem(_id, isDone);
  return (
    <Card className="task_item">
      <Card.Body className="task_group">
        <div className={isDone ? "done task_text" : "task_text"}>{content}</div>
        <div>
          <Button variant="success" onClick={updateTaskHandler}>
            V
          </Button>{" "}
          <Button variant="danger" onClick={removeTaskHandler}>
            X
          </Button>{" "}
        </div>
      </Card.Body>
    </Card>
  );
};

export default Taskitem;
