import React, {useEffect} from "react";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { AuthRoutes } from "./auth.routes";
import { AppRoutes } from "./app.routes";
import { useTheme, Box } from "native-base"
import { useAuth } from '@hooks/useAuth';
import { Loading } from "@components/Loading";
import { tagUserLoggedOut , tagUserInfo} from "../notifications/notificationsTag";


export const Routes = () => {
  const { colors } = useTheme();
  const { user , isLoadingStorageUser } = useAuth();

  const theme = DefaultTheme;
  theme.colors.background = colors.gray[700];

  if(isLoadingStorageUser){
    return <Loading />
  }

    if(!user.id){
      tagUserLoggedOut('loggedOut');

    }

    tagUserInfo(user.email, user.name);


  return (
    <Box bg="gray.700" flex={1}>
      <NavigationContainer theme={theme}>
          { user.id ? <AppRoutes /> : <AuthRoutes />}       
      </NavigationContainer>
    </Box>
  );
};
