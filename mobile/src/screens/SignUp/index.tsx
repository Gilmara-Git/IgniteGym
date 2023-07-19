import { useState } from "react";
import LogoSvg from "@assets/logo.svg";
import { Input } from "@components/Input";
import { Button } from "@components/Button";
import BackgroundImg from "@assets/background.png";
import { VStack, Image, Center, Text, Heading, ScrollView, useToast } from "native-base";
import { useNavigation } from "@react-navigation/native";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Platform  } from "react-native";
import  { api }  from '@services/api';
import {AppError} from '@utils/AppError';
import { useAuth } from "@hooks/useAuth";
 
const signUpSchema = yup.object({
  name: yup.string().required("Please enter your name."),
  email: yup.string().required("Please enter your E-mail.").email("Invalid E-mai"),
  password: yup.string().required("Please enter a 6 digit password.").min(6, "Enter a minimum of 6 digits."),
  confirmed_password: yup.string().required("Confirm password.").oneOf([yup.ref("password"), null], "Passwords do not match."),
});

type FormData = yup.InferType<typeof signUpSchema>;

export const SignUp = () => {
  const {signIn } = useAuth();
  const [ isLoading, setIsLoading ] = useState(false);
  const navigation = useNavigation();
  const toast = useToast();

  const handleGoBackLogin = () => {
    navigation.goBack();
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(signUpSchema),
  });

  const handleSignUp = async ({
    name,
    email,
    password
  }: FormData) => {

    try{
      
      setIsLoading(true);
      await api.post('/users', {
       name,
       email,
       password
      })
      
     await signIn(email, password)


    }catch(error){
      const isAppError =  error instanceof AppError;
      const toastTitle =  isAppError ? error.message : "An error ocurred, Try again later.";
      toast.show({
        title: toastTitle,
        duration: 3000,
        placement: 'top',
        bgColor: 'red.500',
      })
     
      throw error;

    }finally{
      setIsLoading(false);
    }
    
  
  };

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
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

        <Center my={`${Platform.OS === "ios"? 12 :20}`}>
          <LogoSvg />
          <Text color="gray.100" fontSize="sm" fontFamily="body">
            Train your brain and your body.
          </Text>
        </Center>

        <Center>
          <Heading color="gray.100" fontSize="xl" mb={6} fontFamily="heading">
            Create your account
          </Heading>
        </Center>

        <Controller
          control={control}
          rules={{
            required: "Please enter your name.",
          }}
          name="name"
          render={({ field: { onChange, value } }) => (
            <Input
              placeholder="Name"
              onChangeText={onChange}
              value={value}
              errorMessage={errors.name?.message}
            />
          )}
        />

        <Controller
          control={control}
          rules={{
            required: "Please enter your Email.",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Invalid Email",
            },
          }}
          name="email"
          render={({ field: { onChange, value } }) => (
            <Input
              placeholder="E-mail"
              keyboardType="email-address"
              autoCapitalize="none"
              onChangeText={onChange}
              value={value}
              errorMessage={errors.email?.message}
            />
          )}
        />

        <Controller
          control={control}
          rules={{
            required: "Please type your password.",
          }}
          name="password"
          render={({ field: { onChange, value } }) => (
            <Input
              placeholder="Password"
              secureTextEntry
              onChangeText={onChange}
              value={value}
              errorMessage={errors.password?.message}
            />
          )}
        />

        <Controller
          control={control}
          rules={{
            required: "Please re-type your password.",
          }}
          name="confirmed_password"
          render={({ field: { onChange, value } }) => (
            <Input
              placeholder="Confirm password"
              secureTextEntry
              onChangeText={onChange}
              value={value}
              onSubmitEditing={handleSubmit(handleSignUp)}
              returnKeyType="send"
              errorMessage={errors.confirmed_password?.message}
            />
          )}
        />

        <Button
          title="Create and access"
          onPress={handleSubmit(handleSignUp)}
          isLoading={isLoading}
        />

        <Button
          title="Back to login"
          variant="outline"
          mt={3}
          onPress={handleGoBackLogin}
        />
      </VStack>
    </ScrollView>
  );
};
