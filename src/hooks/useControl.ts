import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { db } from "./../firebase";

export const useControl = () => {
    const [task, setTask] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { user } = useAuth();

    const addTaskHandler = async () => {
        if (user) {
            setIsLoading(true);
            await addDoc(collection(db, "tasks"), {
                userId: user.uid,
                content: task,
                isDone: false,
                date: serverTimestamp()
            });
        }

        setIsLoading(false);
        setTask('')
    };

    return {
        task,
        setTask,
        isLoading,
        addTaskHandler,
    }
}