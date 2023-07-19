import { AuthContextProvider }  from '@contexts/authContext';


import { THEME } from './src/themes';
import { StatusBar } from 'react-native';
import { Routes } from './src/routes';

import { NativeBaseProvider } from 'native-base';
import { Loading } from '@components/Loading';
import { Roboto_400Regular, Roboto_700Bold, useFonts } from '@expo-google-fonts/roboto';



export default function App() {
   const [fontsLoaded ] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold
   }); 

  return (
    <NativeBaseProvider theme={THEME}>
      <StatusBar 
        barStyle='light-content'
        backgroundColor='transparent' 
        translucent/>

          <AuthContextProvider>
            { fontsLoaded ? <Routes /> : <Loading/>}
          </AuthContextProvider>

    </NativeBaseProvider>
  );
}

