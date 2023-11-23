import OneSignal from "react-native-onesignal";


export const tagUserLoggedOut = ( userId: string)=>{
    OneSignal.sendTag('user_loggedOut', userId)
};

export const tagUserInfo = (userEmail: string, userName: string)=>{
    OneSignal.sendTags({
        user_name: userName,
        user_email: userEmail
    })
};

export const tagExercisesHistoryCount = (exercisesCount: string )=>{
    OneSignal.sendTag('exercises_history_count',  exercisesCount)
};
