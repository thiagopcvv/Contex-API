import React, { createContext, ReactNode, useState } from "react";
import * as auth from "../services/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface AuthContextData {
  signed: boolean;
  user: object;
  signIn(): Promise<void>;
  signOut(): void;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<object | null>(null)

    async function signIn() {
        const response = await auth.signIn();
        
    setUser(response.user)

    }
    function signOut() {
        setUser(null)
    }

  return (
    <AuthContext.Provider value={{ signed: !!user,user, signIn, signOut}}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
