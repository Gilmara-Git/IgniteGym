import { Button as ButtonNativeBase, IButtonProps, Text } from 'native-base';

type ButtonProps = IButtonProps & {
    title: string;
    variant?: 'outline' | 'solid';
}

export const Button =({title, variant = 'solid',...rest}:ButtonProps)=>{
    return( <ButtonNativeBase
                w="full"
                h={14}
                bg={ variant  === 'outline' ? 'transparent'  :  'green.700' }
                rounded="sm"
                borderWidth={variant === 'outline' ? 1 : 0}
                borderColor="green.700"
                _pressed={{
                    bg: variant === 'outline' ? 'gray.500' : 'green.500'}}
                {...rest}>

                    <Text 
                      color={variant === 'outline'? 'green.500': 'white'}
                      fontFamily="heading"
                      fontSize="sm"
                 
                      >
                        {title}
                    </Text>

            </ButtonNativeBase>
             
                 
                 )

};
