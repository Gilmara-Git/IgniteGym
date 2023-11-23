import { AuthContextProvider }  from '@contexts/authContext';
import OneSignal from 'react-native-onesignal';


import { THEME } from './src/themes';
import { StatusBar } from 'react-native';
import { Routes } from './src/routes';

import { NativeBaseProvider } from 'native-base';
import { Loading } from '@components/Loading';
import { Roboto_400Regular, Roboto_700Bold, useFonts } from '@expo-google-fonts/roboto';

OneSignal.setAppId('2eff2a6f-6bb6-4542-a1b8-c86e26544305');

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

