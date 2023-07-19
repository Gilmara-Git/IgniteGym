
import { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { Input } from '@components/Input';
import { Button } from '@components/Button';
import { UserPhoto } from '@components/UserPhoto';
import { ScreenHeader } from '@components/ScreenHeader';
import { Center, VStack , ScrollView, Skeleton, Text, Heading , useToast } from 'native-base';
import  * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAuth } from '@hooks/useAuth';
import { api } from '@services/api';
import { AppError } from '@utils/AppError';
import userDefaultImg from '@assets/userPhotoDefault.png';


type FormDataProps = {
    name: string;   
    email: string;
    old_password: string;
    password: string;
    confirmed_password: string;
}

const ProfileSchema  = yup.object({
    name: yup.string().required('Please type your name'),
    password: yup.string().min(6, 'Type at least 6 characters').nullable().transform((value: string) => !!value ? value: null),
    confirmed_password: yup
    .string()
    .nullable()
    .transform((value)=> !!value ? value: null)
    .oneOf([yup.ref('password'), null], 'Password does not match')
    .when('password', {
        is: (Field: any)=>Field,
        then: yup.string().required('Please re-type your new password').nullable().transform((value)=> !!value ? value: null)
    })
      
})


export const Profile =()=>{
    const [ isImageLoading, setIsImageLoading ] = useState(false);
    const [ isUpdatingProfile, setIsUpdatingProfile ]  = useState(false);
    const PHOTO_SIZE= 33;
    const toast = useToast();
    const { user, updateUserProfile } = useAuth();
  

    const { control, handleSubmit, formState: {errors}} = useForm<FormDataProps>({
        resolver: yupResolver(ProfileSchema), 
        defaultValues: {
            name: user.name,
            email: user.email,
            
        }
    });


    const handleProfileUpdate = async (data: FormDataProps)=>{
       try{
      
        setIsUpdatingProfile(true);
        
        //updating user in the backend
        await api.put('/users', data);
   
        //sending the  User object to be updated in the  (AuthContext)  
        const updatedUser = user;
        updatedUser.name =  data.name;
       
        updateUserProfile(updatedUser);
        
        toast.show({
            title: 'Profile was updated successfully',
            duration: 3000,
            placement: 'top',
            bgColor: 'green.500'
            
        });
        

       }catch(error){
        const isAppError =  error instanceof AppError;
        const toastTitle =  isAppError ? error.message: 'An error occurred and prevented to update your profile.';
        toast.show({
            title: toastTitle,
            duration: 3000,
            placement: 'top',
            bgColor: 'red.500'

        })
;       }finally{
            setIsUpdatingProfile(false);
}
    }


    const handleUserPhoto = async()=>{
        setIsImageLoading(true);

        try{
            let pickedImage = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [5,5],
                quality: 1,
                // base64: true
               
            })
    
            if(pickedImage.canceled){
                return;
            }
          
            if(pickedImage.assets[0].uri){
                
                const { assets }  =  pickedImage;
                
                const imageInfo = await FileSystem.getInfoAsync(assets[0].uri);
                //using Expo FileSystem to limit the image size 
                
                if(imageInfo.exists && (imageInfo.size / 1024 / 1024)> 5){
                    return toast.show({
                        description: "Maximum photo size allowed is 5MB. ",
                        placement: "top",
                        bgColor: 'red.500'
                    })
                    
                }
                
              // Preparing avatar file to send to backend   
                const imageExtension = assets[0].uri.split('.').pop();
                const photoFile = {
                    name:`${user.name}.${imageExtension}`.toLowerCase(),
                    type: `${assets[0].type}/${imageExtension}`,
                    uri: assets[0].uri
                } as any;
                


                const avatarFormData =  new FormData();
                avatarFormData.append('avatar', photoFile);
                const updatedAvatarResponse = await api.patch('/users/avatar', avatarFormData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })        
               
                const currentUser = user;
                currentUser.avatar = updatedAvatarResponse.data.avatar;
            
                await updateUserProfile(currentUser);

            

                toast.show({
                    title: 'Avatar uploaded successfully',
                    placement: 'top',
                    bgColor: 'green.500',
                    duration: 3000
                })

            }
         

        }catch(error){
            console.log(error);
            throw error;
            
        }finally{
            setIsImageLoading(false);
        }
       
    };


    return (
        <VStack flex={1}>
            <ScreenHeader title="Profile"/>
            <ScrollView contentContainerStyle={{ paddingBottom: 36}}> 
                <Center mt={6} px={10}>
                    { isImageLoading ?   
                            <Skeleton 
                                h={PHOTO_SIZE} 
                                w={PHOTO_SIZE}
                                rounded="full"
                                startColor="gray.500"
                                endColor="gray.400"

                                />   :  

                            <UserPhoto size={PHOTO_SIZE}
                                source={ user.avatar ?  
                                            {uri: `${api.defaults.baseURL}/avatar/${user.avatar}`} 
                                        : userDefaultImg }
                                alt="User photo"
                              
                        />
                    }
                      

                    <TouchableOpacity
                        onPress={handleUserPhoto}
                    >
                        <Text 
                            mt={2}
                            mb={8}
                            fontSize="md"
                            fontWeight="bold"
                            color="green.400"
                           
                        >
                            Change photo
                        </Text>
                    </TouchableOpacity>

                    <Controller 
                        control={control}
                        name="name"                     
                        render={({field :{ onChange, value}})=>(

                            <Input 
                                placeholder=" Your name"
                                bg="gray.600"
                                onChangeText={onChange}
                                value={value}
                                errorMessage={errors.name?.message}
                                />
                        )}
                    
                    />

                            <Controller
                                control={control}
                                name="email"
                                // rules={{
                                //     required: "Type your email",
                                //     pattern:{
                                //         value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                //         message: "Invalid Email"
                                //     }
                                // }}
                                render={({field: { onChange, value }})=>(
                                    <Input 
                                        bg="gray.600"
                                        placeholder="E-mail"
                                        isDisabled
                                        onChangeText={onChange}
                                        value={value}
                                     />

                                )}
                            />
                    
 

      
                    <Heading 
                        color='gray.200' 
                        fontSize="md" 
                        mb={2}  
                        alignSelf="flex-start"
                        mt={12}
                        fontFamily="heading"
                        >
                        Change Password
                    </Heading>

                    <Controller
                        control={control}
                        name="old_password"
                        render={({ field:{ onChange }})=>(
                            <Input 
                                bg="gray.600"
                                placeholder="Old password"
                                secureTextEntry                        
                                onChangeText={onChange}   
                                />
                            
                            )}
                    />
                    

                    <Controller
                        control={control}
                        name="password"                       
                        render={({ field:{ onChange}})=>(
                            <Input 
                                placeholder="New password"
                                bg="gray.600"
                                secureTextEntry
                                onChangeText={onChange}  
                                errorMessage={errors.password?.message}             
                               
                                />
                            
                            )}
                    />

                    <Controller
                        control={control}
                        name="confirmed_password"                      
                        render={({ field:{ onChange }})=>(
                            <Input 
                                placeholder="Confirm new password"
                                bg="gray.600"
                                secureTextEntry
                                onChangeText={onChange}
                                errorMessage={errors.confirmed_password?.message}
                               
                                />
                            
                            )}
                    />

                    <Button 
                        mt={4} 
                        title="Update"
                        onPress={handleSubmit(handleProfileUpdate)}
                        isLoading={isUpdatingProfile}
                        />
                </Center>

            </ScrollView>
        </VStack>
    )
};