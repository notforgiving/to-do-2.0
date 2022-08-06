import {
    collection,
    query,
    onSnapshot,
    where,
    limit,
    orderBy,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { db } from "./../../firebase";
import { ITasks } from "./types";

export const useMain = () => {
    const { user, logout } = useAuth();
    const [name, setName] = useState<any>("");
    const [tasks, setTasks] = useState<ITasks[]>([])

    useEffect(
        () => {
            if (user) {
                try {
                    const unsubscribe = onSnapshot(
                        query(collection(db, "users"),
                            where("_id", "==", user?.uid), limit(1)),
                        (snapshot) => {
                            const result: any = snapshot.docs.map(d => {
                                return d.data()
                            })[0];
                            setName(result.displayName);
                        }
                    )
                    return unsubscribe;
                }
                catch (error) {
                    console.log(`Loading user name error: ${error}`)
                }
            }

        },
        [user]
    );

    useEffect(() => {
        if (user) {
            try {
                const tasksRef = collection(db, "tasks");

                const q = query(tasksRef, where("userId", "==", user?.uid), orderBy('date','asc'));

                const unsubscribe = onSnapshot(q, (querySnapshot) => {
                    const tasks:ITasks[] = [];
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
        tasks,
    }
}