import { UserAuthDTO } from "@dtos/UserAuthDTO";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { USER_STORAGE } from "@storage/storage.config";


export const storageUserSave = async (user: UserAuthDTO)=>{
    await AsyncStorage.setItem(USER_STORAGE, JSON.stringify(user));
}

export  const storageUserGet = async ()=>{
    const storage = await AsyncStorage.getItem(USER_STORAGE);
    const user: UserAuthDTO = storage ? JSON.parse(storage) : {} 
    return user;
}

export const storageUserRemove  = async ()=>{
    await AsyncStorage.removeItem(USER_STORAGE);
};