import { doc, updateDoc } from "firebase/firestore";
import React, { FC } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useIdUserDoc } from "../hooks/useIdUserDoc";
import { useNameUser } from "../hooks/useNameUser";
import { db } from "./../firebase";

interface IChangeNameProps {
  open: boolean;
  close: () => void;
}

const ChangeName: FC<IChangeNameProps> = ({ open, close }) => {
  const { idUserDoc } = useIdUserDoc();
  const { name, setName } = useNameUser();

  const changeNameHandler = async () => {
    const docRef = doc(db, "users", idUserDoc);
    await updateDoc(docRef, {
      displayName: name,
    });
    close()
  };

  return (
    <Modal show={open}>
      <Modal.Header>
        <Modal.Title>Редактировать имя</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          {/* {error && <div className={css.error}>{error}</div>} */}
          <Form.Group controlId="formGroupName">
            <Form.Label>Ваше имя</Form.Label>
            <Form.Control
              type="text"
              value={name}
              placeholder="Имя"
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="primary"
          disabled={name === ""}
          onClick={changeNameHandler}
        >
          Изменить имя
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ChangeName;
