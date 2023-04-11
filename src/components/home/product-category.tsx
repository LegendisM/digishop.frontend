import Product from '@/components/home/product';
import { IProduct } from '@/common/interfaces/product/product.interface';
import { SimpleGrid, Divider, Grid, Box, Text, Flex } from '@mantine/core';

export default function ProductCategory({ title, description, products }: { title: string, description: string, products: IProduct[] }) {
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
                <Flex
                    gap="md"
                    justify="center"
                    align="center"
                    direction="row"
                    wrap="wrap"
                >
                    {products.map((product, index) => (
                        <Product data={product} />
                    ))}
                </Flex>
            </Box>
        </Box>
    );
}