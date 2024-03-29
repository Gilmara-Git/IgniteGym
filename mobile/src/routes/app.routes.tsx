import { createBottomTabNavigator , BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { Platform } from 'react-native';
import { Home } from '@screens/Home';
import { Exercise } from '@screens/Exercise';
import { Profile } from '@screens/Profile';
import { History } from '@screens/History';
import HomeSvg from '@assets/home.svg';
import HistorySvg from '@assets/history.svg';
import ProfileSvg from '@assets/profile.svg';
import { NotFound } from '@screens/NotFound'
import { useTheme } from 'native-base';

type AppRoutesTypes = {
    home: undefined;
    history: undefined;
    profile: undefined;
    exercise: { exerciseId: string};
    notFound: undefined;
}

export type AppRoutesNavigationProps = BottomTabNavigationProp<AppRoutesTypes>

const { Navigator, Screen } = createBottomTabNavigator<AppRoutesTypes>();

export const AppRoutes =()=>{
    const { sizes, colors } =  useTheme();
    const iconSize = sizes[6];
       

    return (
        <Navigator screenOptions={{ 
            headerShown: false, 
            tabBarShowLabel: false,
            tabBarActiveTintColor: colors.green[500],
            tabBarInactiveTintColor: colors.gray[200],
            tabBarStyle:{ 
                backgroundColor: colors.gray[600],
                borderTopWidth: 0,
                height: Platform.OS === 'android' ? 'auto' : 64,
                paddingBottom: sizes[10],
                paddingTop: sizes[6]

            }
            }}>
                <Screen 
                name="home" 
                component={Home}
                options={{
                    tabBarIcon:({ color })=>(
                        <HomeSvg 
                            fill={color}
                            width={iconSize}
                            height={iconSize}
                            />
                    )
                }}
                /> 
            <Screen 
            name="history" 
            component={History}
            options={{
                tabBarIcon:({ color })=>(
                    <HistorySvg 
                        fill={color}
                        width={iconSize}
                        height={iconSize}
                        />
                )
            }}
            />
            <Screen 
            name="profile" 
            component={Profile}
            options={{
                tabBarIcon:({ color })=>(
                    <ProfileSvg 
                        fill={color}
                        width={iconSize}
                        height={iconSize}
                        />
                )
            }}
            />

            <Screen 
                name="exercise" 
                component={Exercise}
                options={{ tabBarButton: () => null}}
            />

            <Screen 
                name='notFound'
                component={NotFound}
                options={{tabBarButton: ()=>null}}
            />
        </Navigator>
    )
};
