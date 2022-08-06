import {
    collection,
    query,
    onSnapshot,
    where,
    orderBy,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useNameUser } from "../../hooks/useNameUser";
import { db } from "./../../firebase";
import { ITasks } from "./types";

export const useMain = () => {
    const { user, logout } = useAuth();
    const { name, setName } = useNameUser();
    const [tasks, setTasks] = useState<ITasks[]>([]);
    const [changeName, setChangeName] = useState(false);

    useEffect(() => {
        if (user) {
            try {
                const tasksRef = collection(db, "tasks");

                const q = query(tasksRef, where("userId", "==", user?.uid), orderBy('date', 'asc'));

                const unsubscribe = onSnapshot(q, (querySnapshot) => {
                    const tasks: ITasks[] = [];
                    querySnapshot.forEach((doc) => tasks.push({
                        _id: doc.id,
                        userId: doc.data().userId,
                        content: doc.data().content,
                        isDone: doc.data().isDone,
                        date: doc.data().date,
                    }));

                    setTasks(tasks);
                });

                return unsubscribe;
            }
            catch (error) {
                console.log(`Loading tasks error: ${error}`)
            }
        }

    }, [user])

    return {
        user,
        logout,
        name,
        setName,
        tasks,
        changeName,
        setChangeName,
    }
}