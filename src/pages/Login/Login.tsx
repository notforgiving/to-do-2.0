import React, { FC } from "react";
import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import css from "./styles.module.scss";
import cn from "classnames";
import { useLogin } from "./useLogin";
import { ILogin } from "./types";

const Login: FC<ILogin> = ({ user }) => {
  const {
    isReg,
    setIsReg,
    userData,
    setUserData,
    isLoading,
    login,
    register,
    error,
  } = useLogin();

  const authHandler = async () => {
    const { name, email, password } = userData;
    if (isReg) await register(name, email, password);
    else await login(email, password);

    setUserData({ name: "", email: "", password: "" });
  };

  return (
    <>
      <Modal
        show={!user}
        className={cn(css.modal, {
          isLoading,
        })}
      >
        <Modal.Header closeButton>
          <Modal.Title>{isReg ? "Регистрация" : "Вход"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {error && <div className={css.error}>{error}</div>}
            {isReg && (
              <Form.Group controlId="formGroupName" className={css.input_item}>
                <Form.Label>Ваше имя</Form.Label>
                <Form.Control
                  type="text"
                  defaultValue={userData.name}
                  onChange={(e) =>
                    setUserData({ ...userData, name: e.target.value })
                  }
                  placeholder="Имя"
                />
              </Form.Group>
            )}

            <Form.Group controlId="formGroupEmail" className={css.input_item}>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                defaultValue={userData.email}
                onChange={(e) =>
                  setUserData({ ...userData, email: e.target.value })
                }
                placeholder="Email"
              />
            </Form.Group>
            <Form.Group
              controlId="formGroupPassword"
              className={css.input_item}
            >
              <Form.Label>Пароль</Form.Label>
              <Form.Control
                type="password"
                defaultValue={userData.password}
                onChange={(e) =>
                  setUserData({ ...userData, password: e.target.value })
                }
                placeholder="Пароль"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="light" onClick={() => setIsReg(!isReg)}>
            {" "}
            {isReg ? "Вход" : "Регистрация"}
          </Button>
          <Button
            variant="primary"
            disabled={
              userData.name === "" &&
              userData.email === "" &&
              userData.password === ""
            }
            onClick={authHandler}
          >
            {" "}
            {isReg ? "Создать учетную запись" : "Войти"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Login;
