import { Image, IImageProps } from  'native-base';

type UserPhotoProps = IImageProps & {
    size: number;
}

export const UserPhoto =({ size, ...rest}: UserPhotoProps )=>{
    return (
        <Image
            width={size}
            height={size} 
            rounded="full"
            borderWidth={2}
            borderColor="gray.400"
            alt="User Avatar"
            {...rest}
        />
    )
}