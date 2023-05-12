import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { User } from "firebase/auth";
import { UserLoginData } from "../interfaces/databaseInterfaces";
import LoadingSpinner from "../components/LoadingSpinner";

interface IUserAuth {
  loginUser: (authData: UserLoginData) => string;
  registerUser: (authData: UserLoginData) => string;
  logoutUser: () => string;
  setLoading: Dispatch<SetStateAction<boolean>>;
  ifAuth: boolean;
  user: User | null;
  ifLoginExist: boolean;
  setIfLoginExist: Dispatch<SetStateAction<boolean>>;
  isWelcomePage: Boolean;
  setIsWelcomePage: (ifWelcomePage: boolean) => void;
}

export const AuthContext = createContext<IUserAuth>({
  setLoading: () => {},
  setIfLoginExist: () => {},
  loginUser: () => {
    return "";
  },
  registerUser: () => {
    return "";
  },
  logoutUser: () => {
    return "";
  },
  ifAuth: false,
  user: null,
  ifLoginExist: true,
  isWelcomePage: true,
  setIsWelcomePage: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [ifAuth, setIfAuth] = useState(false);
  const [ifLoginExist, setIfLoginExist] = useState(false);
  const [isWelcomePage, setIfWelcomePage] = useState(true);

  const setIsWelcomePage = (value: boolean) => {
    setIfWelcomePage(value);
  };

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const auth = getAuth();

  const loginUser = (authData: UserLoginData) => {
    setLoading(true);
    let response = "";
    signInWithEmailAndPassword(auth, authData.email, authData.password)
      .then(() => {
        setIfAuth(true);
      })
      .catch((error) => {
        response = error.message;
      });
    setLoading(false);
    return response;
  };

  const registerUser = (authData: UserLoginData) => {
    setLoading(true);
    let response = "";
    createUserWithEmailAndPassword(auth, authData.email, authData.password)
      .then(() => setIfAuth(true))
      .catch((error) => {
        setIfAuth(false);
        response = error.message;
      });
    setLoading(false);
    return response;
  };

  const logoutUser = () => {
    let response = "";
    signOut(auth)
      .then(() => {
        setIfAuth(false);
      })
      .catch((error) => {
        response = error.message;
      });
    return response;
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      if (user) {
        setIfAuth(true);
      } else setIfAuth(false);
      setLoading(false);
    });
    return unsubscribe;
  }, [auth]);

  return (
    <AuthContext.Provider
      value={{
        ifAuth,
        setLoading,
        user,
        loginUser,
        registerUser,
        logoutUser,
        ifLoginExist,
        setIfLoginExist,
        isWelcomePage,
        setIsWelcomePage,
      }}
    >
      {!loading && children}
      {loading && <LoadingSpinner />}
    </AuthContext.Provider>
  );
};
