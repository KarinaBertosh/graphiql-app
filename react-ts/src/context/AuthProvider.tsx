import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { User } from "firebase/auth";
import { UserLoginData } from "../interfaces/databaseInterfaces";
import LoadingSpinner from "../components/LoadingSpinner";

interface IUserAuth {
  setAuth: (user: boolean) => void;
  loginUser: (authData: UserLoginData) => string;
  logoutUser: () => string;
  setLoading: Dispatch<SetStateAction<boolean>>;
  ifAuth: boolean;
  user: User | null;
  isWelcomePage: Boolean;
  setIsWelcomePage: (ifWelcomePage: boolean) => void;
}

export const AuthContext = createContext<IUserAuth>({
  setAuth: () => {},
  setLoading: () => {},
  loginUser: () => {
    return "";
  },
  logoutUser: () => {
    return "";
  },
  ifAuth: false,
  user: null,
  isWelcomePage: true,
  setIsWelcomePage: () => {} ,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [ifAuth, setIfAuth] = useState(false);
  const [isWelcomePage, setIfWelcomePage] = useState(true);

  const setIsWelcomePage = (value: boolean) => {
    setIfWelcomePage(value);
  };
  const setAuth = (value: boolean) => {
    setIfAuth(value);
  };
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const auth = getAuth();

  const loginUser = (authData: UserLoginData) => {
    setLoading(true);
    let response = "";
    signInWithEmailAndPassword(auth, authData.email, authData.password)
      .then(() => {
        setAuth(true);
      })
      .catch((error) => {
        response = error.message;
      });
    return response;
  };

  const logoutUser = () => {
    let response = "";
    signOut(auth)
      .then(() => {
        setAuth(false);
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
      } else setAuth(false);
      setLoading(false);
    });
    return unsubscribe;
  }, [auth]);

  return (
    <AuthContext.Provider
      value={{
        ifAuth,
        setAuth,
        setLoading,
        user,
        loginUser,
        logoutUser,
        isWelcomePage,
        setIsWelcomePage,
      }}
    >
      {!loading && children}
      {loading && <LoadingSpinner />}
    </AuthContext.Provider>
  );
};
