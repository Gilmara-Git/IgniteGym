import { createContext, ReactNode, useState, useEffect } from "react";
import { UserAuthDTO } from "@dtos/UserAuthDTO";
import { api } from "@services/api";
import {
  storageUserSave,
  storageUserGet,
  storageUserRemove,
} from "@storage/storageUser";
import {
  storageAuthTokenSave,
  storageAuthTokenGet,
  storageAuthTokenRemove
} from "@storage/storageAuthToken";
import { storageTokenFormat } from "@storage/storageAuthToken";

type AuthContextProviderProps = {
  children: ReactNode;
};

type AuthContextDataProps = {
  user: UserAuthDTO;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  updateUserProfile: (userProfileUpdate: UserAuthDTO) => Promise<void>;
  isLoadingStorageUser: boolean;
};


export const AuthContext = createContext<AuthContextDataProps>(
  {} as AuthContextDataProps
);

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [user, setUser] = useState<UserAuthDTO>({} as UserAuthDTO);
  const [isLoadingStorageUser, setIsLoadingStorageUser] = useState(true);


  const updateUserProfile = async (userProfileUpdate: UserAuthDTO) =>{
      try{
        setUser(userProfileUpdate);
        await storageUserSave(userProfileUpdate);

      }catch(error){
        throw error
      }

  };

  const userAndTokenUpdate = (userData: UserAuthDTO, token: string) => {
      // adding token to the requests headers, it contains the user.id
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      setUser(userData);
      

  };

  const saveUserAndTokenInStorage =  async (userData: UserAuthDTO, token: string, refresh_token:string )=>{
    try{
      setIsLoadingStorageUser(true);
      await storageUserSave(userData);
      await storageAuthTokenSave({token, refresh_token});
    }catch(error){
      throw error;
    }finally{
      setIsLoadingStorageUser(false);
    }
  }

  const signIn = async (email: string, password: string) => {
    try {
      const { data } = await api.post("/sessions", { email, password });
     
      if (data.user && data.token && data.refresh_token) {
      
        setIsLoadingStorageUser(true);
        await saveUserAndTokenInStorage(data.user, data.token, data.refresh_token);
        userAndTokenUpdate(data.user, data.token);

      }
    } catch (error) {
      //Directing the error to where the function signIn was called.
      throw error;
    } 
  };

  const loadUserStorageData = async () => {
    try {

      setIsLoadingStorageUser(true);
      const isUserLogged = await storageUserGet();
      const { token }  = await storageAuthTokenGet();

      if (token && isUserLogged) {
        userAndTokenUpdate(isUserLogged, token);

      }
    } catch (error) {
      throw error;
    }finally {
      setIsLoadingStorageUser(false);
    }
  };

  const signOut = async () => {
    try {
      setIsLoadingStorageUser(true);

      setUser({} as UserAuthDTO);
      await storageUserRemove();
      await storageAuthTokenRemove();
      
    } catch (error) {
      throw error;
    } finally {
      setIsLoadingStorageUser(false);
    }
  };

  useEffect(() => {
    loadUserStorageData();
  }, []);

  useEffect(() => {
    const subscribe = api.registerInterceptTokenManager(signOut);
    //clean up function after application loads
    return () =>{
      subscribe();
    }

  }, [signOut]);

  return (
    <AuthContext.Provider
      value={{ user, signIn, signOut, isLoadingStorageUser, updateUserProfile }}
    >
      {children}
    </AuthContext.Provider>
  );
};
