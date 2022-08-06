import { useEffect, useState } from "react";
import { useAuth } from "./useAuth";
import {
    collection,
    query,
    onSnapshot,
    where,
    limit,
    DocumentData,
} from "firebase/firestore";
import { db } from "./../firebase";

export const useNameUser = () => {
    const [name, setName] = useState<string>("");
    const { user } = useAuth();

    useEffect(
        () => {
            if (user) {
                try {
                    const unsubscribe = onSnapshot(
                        query(collection(db, "users"),
                            where("_id", "==", user?.uid), limit(1)),
                        (snapshot) => {
                            const result: DocumentData = snapshot.docs.map(d => {
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

    return {
        name,
        setName,
    }
}