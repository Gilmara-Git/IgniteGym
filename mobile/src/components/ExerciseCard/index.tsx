import { HStack , Image, VStack, Heading, Text, Icon, Box } from 'native-base';
import { TouchableOpacity , TouchableOpacityProps } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { ExcerciseDTO } from '@dtos/ExerciseDTO';
import { api } from '@services/api';

type ExerciseProps = TouchableOpacityProps & {
    data: ExcerciseDTO;
}

export const ExerciseCard =({ data, ...rest}: ExerciseProps)=>{
    
    return (
        <TouchableOpacity
            activeOpacity={0.6}
            {...rest}
        >
            <HStack bg="gray.500" p={2} pr={4} rounded="md" alignItems="center" mb={4}>

                <Box h={16} w={16} mr={4}>
                    <Image 
                        source={{ uri: `${api.defaults.baseURL}/exercise/thumb/${data.thumb}`}}
                        h={16}
                        w={16} 
                        rounded="md"
                        resizeMode="cover"
                        alt="Exercise Photo"
                        />
                </Box>
                <VStack flex={1}>
                    <Heading color="white" fontFamily="heading" fontSize="lg">
                        {data.name}
                    </Heading>
                    <Text 
                        color="gray.200" 
                        fontFamily="body" 
                        fontSize="sm"
                        numberOfLines={2}
                    
                    >
                        {data.series} series x {data.repetitions} repetitions
                    </Text>
                </VStack>

           
                <Icon as={Entypo}
                    name="chevron-thin-right"
                    color="gray.300"
                />
            </HStack>
        </TouchableOpacity>
    )
};