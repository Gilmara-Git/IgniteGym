import { HStack, VStack, Heading ,Text } from 'native-base';
import { HistoryDTO } from '@dtos/HistoryDTO';

type HistoryCardProps = {
    data: HistoryDTO;
}

export const HistoryCard = ({ data }:HistoryCardProps) =>{
    return (
        <HStack bg="gray.600" w="full" mb={3} px={5}  py={4} rounded="md" alignItems="center" justifyContent="space-between">
            <VStack flex={1}>
                <Heading color="white" fontSize="md" textTransform="capitalize" numberOfLines={1} fontFamily="heading">
                    {data.group}
                </Heading>
                <Text color="gray.100" fontSize="lg" numberOfLines={1} >
                    {data.name}
                </Text>
            </VStack>
            <Text color="gray.300" fontSize="md">
                {data.hour}
            </Text>
        </HStack>
    )
};