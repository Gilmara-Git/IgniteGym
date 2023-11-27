import { VStack , Text } from  'native-base';
import { Button } from '@components/Button';
import { useNavigation } from '@react-navigation/native';

type NotFoundNavigation = {
    navigate: any;
    home: undefined
}

export const NotFound = ()=>{

    const navigation = useNavigation<NotFoundNavigation>();

    

    const handleGoHome =()=>{
        navigation.navigate('home')
    };

    return (
        <VStack flex={1} px={12} alignItems='center' justifyContent='center'>
            <Text pb={4} color='gray.200'>Sorry, this page has not content.</Text>
            <Button title='Back to Home Screen' onPress={handleGoHome}/>
        </VStack>
    )
};
