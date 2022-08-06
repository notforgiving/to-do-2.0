import { useEffect, useState } from "react";
import {
    collection,
    query,
    onSnapshot,
    where,
    limit,
} from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "./useAuth";

export const useIdUserDoc = ()=>{
    const { user } = useAuth();
    const [idUserDoc, setIdUserDoc] = useState('');
    useEffect(() => {
        try {
            const unsubscribe = onSnapshot(
                query(collection(db, "users"),
                    where("_id", "==", user?.uid), limit(1)),
                (snapshot) => {
                    const result = snapshot.docs.map(d => {
                        return d.id
                    })[0];
                    setIdUserDoc(result);
                }
            )
            return unsubscribe;
        } catch (error) {
            console.log(`Getting id user error: ${error}`)
        }
    }, [user?.uid])

    return {
        idUserDoc
    }
}