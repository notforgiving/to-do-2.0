import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { IUserData } from "./types";

export const useLogin = () => {
    const [isReg, setIsReg] = useState<boolean>(false);
    const [userData, setUserData] = useState<IUserData>({
        name: "",
        email: "",
        password: "",
    });

    const { isLoading, login, register, error, setError } = useAuth();
    return {
        isReg,
        setIsReg,
        userData,
        setUserData,
        isLoading, login, register, error, setError
    }
}