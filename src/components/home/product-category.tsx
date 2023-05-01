import Product from '@/components/home/product';
import { Divider, Box, Text, Flex, Skeleton } from '@mantine/core';
import { useAxios } from '@/common/service/api.service';
import { GET_API_ROUTE } from '@/constants/api.config';
import { IProductFindResponseDto } from '@/common/interfaces/product/product.dto';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function ProductCategory({ title, category, description, limit }: { title: string, category: string, description: string, limit: number }) {
    const router = useRouter();
    const [{ data, loading, error }, fetch] = useAxios<IProductFindResponseDto>({
        url: GET_API_ROUTE('product', 'find'),
        method: 'POST',
        data: { name: "", category: [category], description: "", page: 1, limit },
    });

    useEffect(() => {
        if (!loading && !error) {
            fetch();
        }
    }, [router.asPath]);

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
                <Skeleton visible={loading}>
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