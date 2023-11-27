<div align='center'>
<h1 align="center">Ignite Gym</h1>


Figma Layout:
[Millena Kupsinskü Martins](https://www.linkedin.com/in/millenakmartins/)

<img src="https://github.com/Gilmara-Git/IgniteGym/assets/66445234/4bfb2694-0414-470e-a746-211732e7f559" alt="layout">

<img src="https://github.com/Gilmara-Git/IgniteGym/assets/66445234/62ade46d-d06a-4e19-ba8b-e6d105b40364" alt="igniteGym"/>

  
</div>
<div>
<h2 align="center">OneSignal Notifications</h1>

<div align="center">
<h5>Notification when user is logged Out</h5>
    <img src="https://github.com/Gilmara-Git/IgniteGym/assets/66445234/38a7a8fa-66fe-443d-ad3d-bdd71774b898" alt="Notification when user is logged out"/>
<h5>Notification showing exercises history count</h5>
 <img src="https://github.com/Gilmara-Git/IgniteGym/assets/66445234/8216719f-3263-4190-802a-bec09945a7f4" alt="Notification of exercises history"/>
 <h5>Messaging sent through Channel plus Deep Linking</h5>
 <img src="https://github.com/Gilmara-Git/IgniteGym/assets/66445234/ad1097c9-c4d4-4500-8b8f-d82424051939" alt="Message sent through Channel"/>

 <h5>Number of days since last exercise</h5>
 <img src="https://github.com/Gilmara-Git/IgniteGym/assets/66445234/91ce5fd3-9e00-4f23-aa41-c4c07a79e680" alt="Number of days since last exercise"/>

<h5>Workout count on last session</h5>
<img src="https://github.com/Gilmara-Git/IgniteGym/assets/66445234/7368c616-b997-4115-af57-e3461a502807" alt="Exercise count on last session" />
<h5>Deep Linking when page is not found</h5>
<img src="https://github.com/Gilmara-Git/IgniteGym/assets/66445234/4871b4d0-5805-45fd-99eb-804c7b074f1c" alt="Deep linking When page is not found"/>

<h5>Direct user to SignIn with Deep Linking</h5>
<img src="https://github.com/Gilmara-Git/IgniteGym/assets/66445234/8f2265a6-25a9-4ecc-ae1e-dfd60b4abe88" alt="Direct user to signIn with Deep linking"/>

<h5>Direct user a specific exercise using Deep Linking with params</h5>
<img src="https://github.com/Gilmara-Git/IgniteGym/assets/66445234/9c69de79-4bd7-48ca-a561-48a3eaddb9ab" alt="Direct user to signIn with Deep linking"/>


</div>


# Menu
- <a href="#about">About</a>
- <a href="#motivation">Motivation</a>
- <a href="#technologies">Technologies</a>
- <a href="#to-run-the-project">Run the project</a>
# About

**React Native** project developed as one of the challenges during my **Ignite bootcamp** with [Rocketseat](https://www.rocketseat.com.br/).

- This app provides a list of exercises per body area, and each exercise suggests the number and 
**series** and **repetitions**. 
- Furthermore, you can mark the exercise as **completed** which creates your exercises **history**.
- On the **History** page it displays the exercises per day in a **Section List**.  
- On the **Profile** page you can set a **profile picture** by uploading it from your device.
- You can only access the exercises if you are **authenticated** (App routes/private), otherwise you are displayed with the **SignIn** or **SignUp** pages (Auth routes /public).
- Furthermore, **Notifications**, **Deep Linking** and **Expo Dev Client** were added to this project as explained below.

## OneSignal
 **OneSignal** delivers **notifications messages** to both **ios** and **android**.
 - In order to setup the **android** environment to use **notifications messages** I used a free could service from Google, **FCM v1(legacy)**, Firebase Cloud Messaging. (firebase.google.com) 
 - In order to setup the **ios** environment for **notifications messages**, we would need to use an **Apple developer account** to utilize their cloud messaging service which is called **APNS-Apple Push Notification Service**, so on this project only android was used.

## Deep Linking
Deep linking was also used on this project, so a **scheme** was setup for the project, then I used the **npx uri-scheme list** command to verify the scheme creation and **npx uri-scheme open** to open the **url**.
Also, in order to integrate the React Navigation with **Deep Linking** we configured the routes and their params to a **linking** object and passed it to the **NavigationContainer linking property**, so we when **Deep Linking with params** is passed through **OneSignal** the user is directed to specifics screens.
In order to help generate the deep linking url, **expo-linking** lib was used.

## Expo Dev Client
**Expo Dev Client** is a new **Expo** feature that allows you to use all its integrated **libs** plus the **libs** that are not support by **Expo**, like third party libraries. In this project **OneSignal** is one example as it is a **native lib**, but we ran it with expo, thanks to **Expo Dev Client** . So basically we generate a **customized Expo Go development build** when running the project with **expo-dev-client**.


*Prerequisites:* 
1 - **ios** and **android** folders must have been generated. In other words, **expo prebuild** must had run.
2 -Must had generated a **build** with a native code (**npx expo run: android**, **npx expo run:ios**)
3 - Install **Expo Dev Client** and run **npx expo start --dev-client**. **Expo** will look for the **build with the native code** and run it with **Expo**.


 # Motivation


- Practice ***React Navigation v6*** (***Stack Navigation and BottomTab Navigation*** were used).
- Learn and practice styling with **Native Base** .
- Practice **AsyncStorage** to store user, token and refresh_token.
- Practice **Expo Image Picker**.
- Learn and practice sending **notifications** with **OneSignal**. 
- Learn to configure and use **Deep Linking** to send notifications through **OneSignal**.
- Learn and practice on how to produce a customized build with **expo dev client**.
- Interact with the Dev Community, learn together and progress as a Developer.
- Keep committed with my goals.</br>

# Technologies

- React Native
- Typescript
- React Navigation
- Expo
- Expo google fonts
- Expo Vector icons
- Expo Image Picker
- Expo File System to limit the profile image size
- Native Base
- AsyncStorage
- png images(strategy of 3 different sizes)
- "react-native-svg-transformer"
- Refresh Token Rotation Strategy
- JWT (JSON Web Token)
- Features to change username and password
- Password validation - React Hook Form 
- Babel-plugin-module-resolver to map path/imports
- OneSignal
- FCM v1(legacy) - Firebase Cloud Messaging for Android 
- Deep Linking
- expo-linking
- Expo dev client


# App creation
Project was created using **expo init appName --npm*** 
# To run the project

- Clone it
- You will need Expo and NodeJS installed
- **Navigate** to the project 's folder
- To start the frontend, go to the **mobile** folder and run **expo start** or if you can build the App in iOS and Android run **npx react-native start**
- To start the backend run **npm start**

Thanks [Rocketseat](https://www.instagram.com/rocketseat/?igshid=Yzg5MTU1MDY%3D) 🚀

**Instructor Mobile**:
[Rodrigo Gonçalves](https://www.linkedin.com/in/rodrigo-gon%C3%A7alves-santana/)

Made with 💗 by [Gilmara Pimentel](https://www.linkedin.com/in/gilmara-pimentel/)
