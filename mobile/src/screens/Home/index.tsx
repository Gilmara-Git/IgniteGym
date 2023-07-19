import { VStack, HStack, FlatList, Heading, Text, useToast } from 'native-base';
import { HomeHeader } from '@components/HomeHeader';
import { Group } from '@components/Groups';
import { ExerciseCard } from '@components/ExerciseCard';
import { useState , useEffect , useCallback} from 'react'; 
import { useNavigation, useFocusEffect  } from '@react-navigation/native';
import { AppRoutesNavigationProps } from '@routes/app.routes';
import { api }  from '@services/api';
import { AppError } from '@utils/AppError';
import { ExcerciseDTO } from '@dtos/ExerciseDTO';
import { Loading } from '@components/Loading';

export const Home =()=>{
    const [ groupSelected, setGroupSelected ] = useState("antebraço");
    const [ groups, setGroups ] =  useState<string[]>([]);
    const toast = useToast();
    const [ exercises, setExercises ] = useState<ExcerciseDTO[]>([]);
    const [ isLoading, setIsLoading ] = useState(true);


        const navigation = useNavigation<AppRoutesNavigationProps>();
        
        const handleExerciseDetails =( exerciseId: string ) =>{
            navigation.navigate('exercise', { exerciseId} );
        }

        const fetchExercisesByGroup = async () => {
            try{
                setIsLoading(true);
                const response =  await api.get(`/exercises/bygroup/${groupSelected}`);
                setExercises(response.data);

            }catch(error){
                const isAppError =  error instanceof AppError;
                const toastTitle = isAppError ? error.message: 'An error occurred while fetching exercises';
                toast.show({
                    duration: 3000,
                    bgColor: 'red.500',
                    title: toastTitle,
                    placement: 'top'

                })
            }finally{
                setIsLoading(false);
            }
        }

       
        const fetchGroups = async ()=>{
            try{
                const response = await api.get('/groups');
                setGroups(response.data);

            }catch(error){
                const isAppError =  error instanceof AppError;
                const toastTitle = isAppError ? error.message: 'An error occurred while fetching groups';
                toast.show({
                    duration: 3000,
                    bgColor: 'red.500',
                    title: toastTitle,
                    placement: 'top'

                })
            }
        }

        useFocusEffect(useCallback(()=>{
            fetchExercisesByGroup();

        }, [groupSelected]))

        useEffect(()=>{
            fetchGroups();
           
        },[]);
   
    return (
        <VStack flex={1}> 
            <HomeHeader/>
            
            <HStack>
                <FlatList 
                    data={groups}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    _contentContainerStyle={{px: 8 }}
                    my={10}
                    maxH={10}
                    minH={10}
                    keyExtractor={item=> item}
                    renderItem={({item})=> (
                        <Group
                            onPress={()=>setGroupSelected(item)}
                            groupName={item}
                            isActive={groupSelected.toLocaleUpperCase() === item.toLocaleUpperCase() }
        
                            />    
                    )}
                    />     
            </HStack>

            <VStack px={8} flexGrow={1}>
                <HStack justifyContent="space-between" mb={5}>
                    <Heading color="gray.200" fontSize="md" fontFamily="heading">
                        Exercises
                    </Heading>

                    <Text color="gray.200" fontSize="sm" >
                        { isLoading ? 0 : exercises.length }
                    </Text>
                </HStack>

                 { isLoading ? <Loading /> : (

                     <FlatList flex={1}
                        data={exercises}
                        keyExtractor={(item) => item.id}
                        showsVerticalScrollIndicator={false}
                        _contentContainerStyle={{ pb: 20 }}
                        renderItem={({item})=> ( 
                            <ExerciseCard 
                                data={item}
                                onPress={()=>handleExerciseDetails(item.id)}
                            />
                           
                        )}
    
                     />        

                 )}       

            </VStack>
        </VStack> 
    )
};