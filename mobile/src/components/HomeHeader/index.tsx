import { HStack , VStack , Text, Heading , Icon } from 'native-base';
import { TouchableOpacity} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { UserPhoto } from '../UserPhoto';
import { useTheme } from 'native-base';
import { useAuth } from '@hooks/useAuth';
import userDefaultImg from '@assets/userPhotoDefault.png';
import { api } from '@services/api';


export const HomeHeader =()=>{
    const { sizes } = useTheme();
    const { signOut, user }  = useAuth();
 
    return (
        <HStack 
            bg="gray.600"
            pt={16}
            pb={5}
            px={8}
            alignItems="center"
           
            >

            
                <UserPhoto 
                    size={sizes[4]}
                    source={user.avatar ? 
                        {uri: `${api.defaults.baseURL}/avatar/${user.avatar}` } 
                        : userDefaultImg}
                    mr={4}
                    />

            <VStack flex={1}>
                <Text color="gray.100" fontSize="md">
                    Hello
                </Text>

                <Heading color="gray.100" fontSize="md" fontFamily="heading">
                    {user.name}
                </Heading>

            </VStack>
          

            <TouchableOpacity onPress={signOut}>
                <Icon as={MaterialIcons}
                    name="logout" color="gray.200" size={7}
                    />
            </TouchableOpacity>


        </HStack>
    )
}