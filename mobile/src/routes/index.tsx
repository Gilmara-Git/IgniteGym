import React from "react";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { AuthRoutes } from "./auth.routes";
import { AppRoutes } from "./app.routes";
import { useTheme, Box } from "native-base"
import { useAuth } from '@hooks/useAuth';
import { Loading } from "@components/Loading";


export const Routes = () => {
  const { colors } = useTheme();
  const { user , isLoadingStorageUser } = useAuth();


  const theme = DefaultTheme;
  theme.colors.background = colors.gray[700];

  if(isLoadingStorageUser){
    return <Loading />
  }

  return (
    <Box bg="gray.700" flex={1}>
      <NavigationContainer theme={theme}>
          { user.id ? <AppRoutes /> : <AuthRoutes />}       
      </NavigationContainer>
    </Box>
  );
};
