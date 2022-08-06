import React, { FC } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import { useControl } from "../hooks/useControl";

const Control: FC = () => {
  const { task, setTask, isLoading, addTaskHandler } = useControl();

  return (
    <Form>
      <Form.Group>
        <InputGroup>
          <Form.Control
            placeholder="Введите задачу"
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />
          <Button
            variant="primary"
            disabled={task === "" || isLoading}
            onClick={addTaskHandler}
          >
            Добавить задачу
          </Button>
        </InputGroup>
      </Form.Group>
    </Form>
  );
};

export default Control;
