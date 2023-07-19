import { HStack , Center, Heading } from 'native-base';

type ScreeHeaderProps = {
    title: string;
}

export const ScreenHeader =({ title }: ScreeHeaderProps)=>{
    return(
        <Center bg="gray.600" pb={6} pt={16}>
            <Heading 
                color="gray.100"
                fontFamily="heading"
                fontSize="xl"
                >
                    {title}
            </Heading>
        </Center>
    )
}