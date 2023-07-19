import {useState } from "react";
import LogoSvg from "@assets/logo.svg";
import { Input } from "@components/Input";
import { Button } from "@components/Button";
import BackgroundImg from "@assets/background.png";
import { VStack, Image, Center, Text, Heading, ScrollView , useToast} from "native-base";
import { useNavigation } from "@react-navigation/native";
import  { AuthRoutesNavigationProps } from '@routes/auth.routes';
import { useForm, Controller } from "react-hook-form";
import { useAuth } from "@hooks/useAuth";
import { AppError } from "@utils/AppError";



type SignInProps = {
  email: string;
  password: string
}

export const SignIn = () => {
  const [isLoading, setIsLoading ] = useState(false);
  const { control, handleSubmit, formState: {errors} } = useForm<SignInProps>();
  const { signIn } = useAuth();
  const toast = useToast();

  const navigation = useNavigation<AuthRoutesNavigationProps>();
    
  const handleSignUpNavigation =()=>{
    navigation.navigate("signUp")
}


const handleSignIn = async ({email, password }: SignInProps) =>{
  try{
    setIsLoading(true);
    await signIn(email, password);

  }catch(error){
    setIsLoading(false);
    
    const isAppError = error instanceof AppError;
    const title = isAppError ? error.message : 'An error occurred while signing in, please try again';
    toast.show({
      title,
      duration: 3000,
      placement: 'top',
      bgColor: 'red.500'
    })

  }
 
}

  return (
    <ScrollView 
      contentContainerStyle={{flexGrow: 1}}
      showsVerticalScrollIndicator={false}
      >
      <VStack flex={1} px={10} pb={16}>
        <Image
          source={BackgroundImg}
          defaultSource={BackgroundImg}
          resizeMode="contain"
          position="absolute"
          alt="Background Image"
        />

        <Center my={24}>
          <LogoSvg />
          <Text color="gray.100" fontSize="sm" fontFamily="body">
            Train your brain and your body.
          </Text>
        </Center>

        <Center>
          <Heading color="gray.100" fontSize="xl" mb={6} fontFamily="heading">
            Access your account
          </Heading>
        </Center>

        <Controller 
          control={control}
          name="email"
          rules={{required: "Type a registered E-mail."}}
          render={({ field: { onChange }})=>(
            <Input
              placeholder="E-mail"
              keyboardType="email-address"
              onChangeText={onChange}
              errorMessage={errors.email?.message}
              autoCapitalize="none"
            />


          )}
        />

        <Controller
          control={control}
          name="password"
          rules={{required: "Type your password."}}
          render={({ field: { onChange }})=> (
            <Input 
              placeholder="Password" 
              secureTextEntry 
              onChangeText={onChange}
              errorMessage={errors.password?.message}
              />
          )}
        />
      
        <Button 
          title="Access"
          onPress={handleSubmit(handleSignIn)}
          isLoading={isLoading}
          />

        <Center mt={20}>
          <Text color="gray.100" fontFamily="body" fontSize="sm" mb={3}>
            Don't have access yet ?
          </Text>
        </Center>

        <Button 
          title="Create account" 
          variant="outline"
          onPress={handleSignUpNavigation}
          />
      </VStack>
    </ScrollView>
  );
};
