import React, { createContext, ReactNode, useState, useEffect } from "react";
import * as auth from "../services/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../services/api";


interface User {
  name: string
  email: string
}
interface AuthContextData {
  signed: boolean;
  user: User | null;
  loading: boolean
  signIn(): Promise<void>;
  signOut(): void;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadStorage() {
      const storageUser = await AsyncStorage.getItem('@RNAuth:user')
      const storageToken =  await AsyncStorage.getItem('@RNAuth:token')

      if(storageUser && storageToken){
        api.defaults.headers['Autorization'] =  `Bearer ${storageToken}`

        setUser(JSON.parse(storageUser))
        setLoading(false)
    }

    }
    loadStorage()

  }, [])

    async function signIn() {
        const response = await auth.signIn();

        setUser(response.user)
        api.defaults.headers['Autorization'] =  `Bearer ${response.token}`
        
      await AsyncStorage.setItem('@RNAuth:user', JSON.stringify(response.user))
      await AsyncStorage.setItem('@RNAuth:token', JSON.stringify(response.token))
    }
    function signOut() {
      AsyncStorage.clear().then(() =>{
        setUser(null)
      })
    }

  return (
    <AuthContext.Provider value={{ signed: !!user,user, signIn, signOut, loading}}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
