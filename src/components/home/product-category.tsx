import Product from '@/components/home/product';
import { Divider, Box, Text, Flex, Skeleton } from '@mantine/core';
import { useAxios } from '@/common/service/api.service';
import { GET_API_ROUTE } from '@/constants/api.config';
import { IProductFindResponseDto } from '@/common/interfaces/product/product.dto';

export default function ProductCategory({ title, category, description, limit }: { title: string, category: string, description: string, limit: number }) {
    const [{ data, loading, error }] = useAxios<IProductFindResponseDto>({
        url: GET_API_ROUTE('product', 'find'),
        method: 'GET',
        params: { category, page: 1, limit },
    }, { manual: false });

    return (
        <Box p={'xs'}>
            <Box>
                <Text weight={'bold'} size={'large'}>
                    {title}
                </Text>
                <Text span size={'small'}>
                    {description}
                </Text>
            </Box>
            <Divider mt={'sm'} mb={'sm'}></Divider>
            <Box p={'xs'}>
                <Skeleton visible={false}>
                    <Flex
                        gap="md"
                        justify="center"
                        align="center"
                        direction="row"
                        wrap="wrap"
                    >
                        {data?.products.map((product, index) => (
                            <Product key={index} data={product} />
                        ))}
                    </Flex>
                </Skeleton>
            </Box>
        </Box>
    );
}