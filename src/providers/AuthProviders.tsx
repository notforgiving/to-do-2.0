import { onAuthStateChanged, User } from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";
import React, {
  createContext,
  FC,
  ReactNode,
  useEffect,
  useMemo,
  useState,
} from "react";
import { auth, login, logout, register } from "../firebase";
import { db } from "./../firebase";

interface IContext {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  error: string;
}

export const AuthContext = createContext<IContext>({} as IContext);

export const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoadingInitial, setIsLoadingInitial] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>("");

  const registrHandler = async (
    name: string,
    email: string,
    password: string
  ) => {
    setIsLoading(true);
    try {
      const { user } = await register(email, password);
      await addDoc(collection(db, "users"), {
        _id: user.uid,
        displayName: name || 'No name',
      });
    } catch (error: any) {
      setError(`Errore registration: ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  const loginHandler = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      await login(email, password);
    } catch (error: any) {
      setError(`Errore login: ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  const logoutHandler = async () => {
    setIsLoading(true);
    try {
      await logout();
    } catch (error: any) {
      setError(`Errore logout: ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user || null);
      setIsLoadingInitial(false);
    });
  }, []);

  const value = useMemo(
    () => ({
      user,
      isLoading,
      login: loginHandler,
      logout: logoutHandler,
      register: registrHandler,
      error,
    }),
    [user, isLoading, error]
  );

  return (
    <AuthContext.Provider value={value}>
      {!isLoadingInitial && children}
    </AuthContext.Provider>
  );
};
