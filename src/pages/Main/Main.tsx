import React from "react";
import { Container, Row, Card, ListGroup, Button } from "react-bootstrap";
import Control from "../../components/Control";
import Taskitem from "../../components/Taskitem";
import Login from "../Login/Login";
import css from "./styles.module.scss";
import { useMain } from "./hook";

const Main = () => {
  const { user, logout, name, tasks } = useMain();

  return (
    <>
      <Container>
        <Row className="align-items-md-center">
          <Card bg="light" text="dark">
            {user && name && (
              <Card.Body className={css.head}>
                <div className={css.name}>
                  Добавьте сюда свои задачи, <strong>{name}</strong>
                </div>
                <Button variant="link" onClick={logout}>
                  Выйти
                </Button>
              </Card.Body>
            )}

            <ListGroup className={css.tasks}>
              {tasks.length ? (
                tasks.map((task) => (
                  <Taskitem
                    key={task._id}
                    data={task}
                  />
                ))
              ) : (
                <div className={css.empty}>
                  Вы пока не создали план действий!
                </div>
              )}
            </ListGroup>
            <Card.Body>
              <Control />
            </Card.Body>
          </Card>
        </Row>
      </Container>
      <Login user={user} />
    </>
  );
};

export default Main;
