import { AuthContext } from './../providers/AuthProviders';
import { useContext } from "react";

export const useAuth = () => useContext(AuthContext);