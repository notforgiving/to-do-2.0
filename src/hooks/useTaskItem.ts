import { deleteDoc, updateDoc, doc } from "firebase/firestore";
import { useAuth } from "./useAuth";
import { db } from "./../firebase";


export const useTaskItem = (_id: string, isDone: boolean) => {
    const { user } = useAuth();

    const removeTaskHandler = async () => {
        if (user) {
            const docRef = doc(db, "tasks", _id);
            deleteDoc(docRef)
        }
    };

    const updateTaskHandler = async () => {
        if (user) {
            const docRef = doc(db, "tasks", _id);
            updateDoc(docRef, {
                isDone: !isDone
            })
        }
    };

    return {
        removeTaskHandler,
        updateTaskHandler
    }
}