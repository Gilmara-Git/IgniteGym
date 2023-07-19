import AsyncStorage from "@react-native-async-storage/async-storage";
import {USER_AUTH_TOKEN } from '@storage/storage.config';

export type storageTokenFormat = {
    token: string;
    refresh_token: string
  }

export const storageAuthTokenSave = async ( { token, refresh_token }:storageTokenFormat ) =>{
    await AsyncStorage.setItem( USER_AUTH_TOKEN, JSON.stringify({token, refresh_token })); // no need to parse, arg is already string
};

export const storageAuthTokenGet = async () => {
    const response = await AsyncStorage.getItem( USER_AUTH_TOKEN);
    const { token, refresh_token }: storageTokenFormat = response ? JSON.parse(response) : {};  
   
    return { token, refresh_token };
};

export const storageAuthTokenRemove = async () =>{
    await AsyncStorage.removeItem(USER_AUTH_TOKEN);
}