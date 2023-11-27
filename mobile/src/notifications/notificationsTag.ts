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

export const tagExercisesHistoryCount = (exercisesCount: string , exercisesQtyLastSession: string)=>{
    OneSignal.sendTags({
        exercises_history_count:  exercisesCount,
        exercises_count_last_session: exercisesQtyLastSession
    }
        )
};


export const tagGapInExercises = (gap: string)=>{
    OneSignal.sendTag('gap_in_exercises', gap)
};

