import { useState , useCallback} from 'react';
import { SectionList , VStack, Heading, Text , useToast } from 'native-base';
import { ScreenHeader } from '@components/ScreenHeader';
import { HistoryCard } from '@components/HistoryCard';
import { AppError } from '@utils/AppError';
import  { api } from '@services/api';
import { useFocusEffect } from '@react-navigation/native';
import { HistoryDTO } from '@dtos/HistoryDTO';
import { Loading } from '@components/Loading';
import { tagExercisesHistoryCount } from '../../notifications/notificationsTag';

export type HistorySectionType = {
    title: string;
    data: HistoryDTO[];
}

export const History =()=>{
    const toast  = useToast();
    const [ isLoading, setIsLoading ] = useState(true);
    const [ exercises, setExercises ] = useState<HistorySectionType[]>([]);

    console.log(exercises[0].data[0].created_at)

    tagExercisesHistoryCount(exercises.length.toString());

     const fetchExercisesHistory = async () =>{
        try{
            setIsLoading(true)
           const response =  await api.get('/history');
         
         
           setExercises(previous => [...previous,...response.data]);
       

        }catch(error){
            const isAppError =  error instanceof AppError;
            const toastTitle =  isAppError ? error.message : 'An error occurred while fetching history';
            toast.show({
                duration: 3000,
                placement: 'top',
                title: toastTitle,
                bgColor: 'red.500'
        })
     }finally{
        setIsLoading(false);
     }
    };

   useFocusEffect(useCallback(() => {
    fetchExercisesHistory();
   },[]))

return (
        <VStack flex={1}>
            
                <ScreenHeader title="Exercises History"/>
                
                { isLoading ? <Loading/> :(
                        <SectionList 
                            px={8}
                            showsVerticalScrollIndicator={false}
                            sections={exercises}
                            keyExtractor={(item) => item.id}
                            renderSectionHeader={({section})=> (
                                <Heading 
                                    color="gray.200"
                                    fontSize="md"
                                    fontFamily="heading"
                                    mt={10}
                                    mb={3}
                                    >
                                        {section.title}
                                </Heading>
                            )}
                            
                            renderItem={({item})=>(
                            
                                <HistoryCard 
                                    data={item}
                                />
                
                            )}
                            contentContainerStyle={exercises.length === 0 && { flex:1, justifyContent: 'center' }}
                            ListEmptyComponent={()=>
                                (<Text 
                                    color="gray.100" textAlign="center">
                                    There is no exercises on your History at the moment. {'\n'} Start by marking them as done.
                                </Text>
                                )}
                            />
                    )
                    }


        </VStack>
    )
};