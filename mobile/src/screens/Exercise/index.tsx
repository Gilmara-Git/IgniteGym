import { useState , useEffect } from 'react';
import { HStack, VStack , Icon, Heading, Text, Image, Box, ScrollView, useToast } from 'native-base';
import { TouchableOpacity ,Platform } from 'react-native';
import { Button } from '@components/Button';
import { Feather } from '@expo/vector-icons';
import { Loading } from '@components/Loading';


import BodySvg from '@assets/body.svg';
import SeriesSvg from '@assets/series.svg';
import RepetitionsSvg from '@assets/repetitions.svg';

import { useNavigation , useRoute } from '@react-navigation/native';
import { AppRoutesNavigationProps } from '@routes/app.routes';

import { api } from '@services/api';
import { ExcerciseDTO } from '@dtos/ExerciseDTO';
import { AppError } from '@utils/AppError';

type ExerciseRouteParams = {
    exerciseId : string;
}

export const Exercise =()=>{
    const [isRegisteringExcercise , setIsRegisteringExcercise ] = useState(false);
    const [isLoading, setIsLoading ]  = useState(true);
    const [ exercise, setExercise ] = useState<ExcerciseDTO>({}as ExcerciseDTO);
    const toast = useToast();

    
    const navigation = useNavigation<AppRoutesNavigationProps>();
    const { params }  = useRoute();
    const { exerciseId }  = params as ExerciseRouteParams;
  
   
    const handleExerciseRegistration = async ()=>{
        try{
            setIsRegisteringExcercise(true);

            await api.post('/history', { exercise_id: exerciseId });

            toast.show({
                title: 'Exercise registered on your history successfully',
                duration: 3000,
                bgColor: 'green.500',
                placement: 'top'
            });
            
            navigation.navigate('history')

        }catch(error){
            const isAppError = error instanceof AppError;
            const toastTitle = isAppError ? error.message : 'It was not possible to register the exercise';
            toast.show({
                title: toastTitle,
                duration: 3000,
                bgColor: 'red.500',
                placement: 'top'
            });
        }finally{
            setIsRegisteringExcercise(false);
        }
    };
    
    const fetchExercise = async () => {
        try{
            setIsLoading(true);
            const response =  await api.get(`/exercises/${exerciseId}`);
            setExercise(response.data);
            

        }catch(error){
            const isAppError = error instanceof AppError;
            const toastTitle = isAppError? error.message : 'Exercise details could not be loaded';
            toast.show({
                title: toastTitle,
                placement: 'top',
                duration: 3000,
                bgColor: 'red.500'
            });
        }finally{
            setIsLoading(false);
        }
    };

    const handleGoBack = ()=>{
        navigation.goBack();
    }


    useEffect(() => {
        fetchExercise();
    },[exerciseId]);


    return (
        <VStack 
            flex={1}
            >

            <VStack               
                bg="gray.600"
                pt={12}
                px={8}
                > 

                <TouchableOpacity 
                    onPress={handleGoBack}
                >
                    <Icon as={Feather} 
                        name="arrow-left" color="green.500" size={6}
                    />
                </TouchableOpacity>

                <HStack mt={4} mb={8} alignItems="center" justifyContent="space-between">
                    <Heading fontSize="lg" color="gray.100" fontFamily="heading" flexShrink={1}>
                        {exercise.name}
                    </Heading>

                    <HStack alignItems="center" justifyContent="space-between">
                        <BodySvg/>
                        
                        <Text 
                            fontSize="md" 
                            color="gray.200"
                            ml={1}
                            textTransform="capitalize"
                            >
                               {exercise.group}
                        </Text>
                    </HStack>

                </HStack>
                
            </VStack>

            
            <ScrollView contentContainerStyle={{ flex:1}}>

                { isLoading ?  <Loading/> : (
                <VStack px={8} py={Platform.OS === 'ios'? 2 : 8 }>
                        <Box rounded="lg"  mb={3} overflow="hidden">
                            <Image 
                            source={{ uri: `${api.defaults.baseURL}/exercise/demo/${exercise.demo}`}}
                            alt="Exercise Image"
                            h={80}
                            w="full"
                        
                            resizeMode="cover"
                            />
                        </Box>

                        

                    <Box bg="gray.600" px={4} pb={4} >
                        <HStack alignItems="center" justifyContent="space-around" mb={6} mt={5}>
                            <HStack>
                                <SeriesSvg />
                                <Text color="gray.200" ml={2}>{exercise.series} series</Text>

                            </HStack>

                            <HStack>
                                <RepetitionsSvg />
                                <Text color="gray.200" ml={2}>{exercise.repetitions} repetitions</Text>

                            </HStack>

                        </HStack>
                            
                            <Button 
                                title="Mark as done"
                                onPress={handleExerciseRegistration}
                                isLoading={isRegisteringExcercise}
                                />
        
                    </Box>       
                </VStack>
                    ) }

            </ScrollView>
           
        </VStack>
    )
};