import { IProductSearchResponseDto } from "@/common/interfaces/product/product.dto";
import { ProductCategories } from "@/common/interfaces/product/product.interface";
import { useAxios } from "@/common/service/api.service";
import Product from "@/components/home/product";
import Layout from "@/components/layout";
import { GET_API_ROUTE } from "@/constants/api.config";
import { Container, TextInput, Button, Paper, Title, Divider, Flex, Space, Box, LoadingOverlay, Select, Modal, Text } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { IconSearch } from "@tabler/icons-react";

export default function SearchPage() {
    const [opened, { open, close }] = useDisclosure(false);
    const form = useForm({
        initialValues: {
            name: '',
            category: 'GENERAL',
            description: '',
            page: 1,
            limit: 20,
        }
    });
    const [{ data, loading, error }, search] = useAxios<IProductSearchResponseDto>({
        method: 'GET',
        url: GET_API_ROUTE('product', 'search'),
        params: form.values
    }, { manual: true });

    const onSearchResponse = () => {
        open();
    }

    return (
        <Layout pageKey="search" title="Search" description="Find Your Favorite Product With Advanced Search">
            <LoadingOverlay visible={loading} />
            <Container size={'sm'} my={40}>
                <Paper shadow={'md'} withBorder p={30} pt={20} mt={30} radius={'md'}>
                    <Flex justify={'space-between'} align={'center'}>
                        <Space />
                        <Title
                            align="center"
                            size={'18'}
                            sx={(theme) => ({ fontFamily: `Greycliff CF, ${theme.fontFamily}`, fontWeight: 700 })}
                        >
                            Advanced Search
                        </Title>
                        <IconSearch />
                    </Flex>
                    <Divider mt={'xs'} mb={'xs'} />
                    <Box component={'form'} onSubmit={form.onSubmit((values) => {
                        search().then(onSearchResponse);
                    })}>
                        <Select
                            name="category"
                            label="Category"
                            placeholder="Enter category"
                            data={Object.values(ProductCategories).map((category) => ({
                                label: category,
                                value: category.toUpperCase()
                            }))}
                            {...form.getInputProps('category')}
                        />
                        <TextInput
                            name="name"
                            label="Name"
                            placeholder="Enter Name"
                            mt={'md'}
                            {...form.getInputProps('name')}
                        />
                        <TextInput
                            name="description"
                            label="Description"
                            placeholder="Enter description"
                            mt={'md'}
                            {...form.getInputProps('description')}
                        />
                        <Button type="submit" fullWidth mt={'xl'}>
                            Find
                        </Button>
                    </Box>
                </Paper>
            </Container>
            <Modal opened={opened} size={"calc(100vw - 3rem)"} onClose={close} title={'Search Result'}>
                <Box p={'xs'}>
                    <Flex
                        gap="md"
                        justify="center"
                        align="center"
                        direction="row"
                        wrap="wrap"
                    >
                        {(data?.products?.length ?? 0) > 0 ? data?.products.map((product, index) => (
                            <Product key={index} data={product} />
                        )) : <Text>No Product Was Found For Your Search</Text>}
                    </Flex>
                </Box>
            </Modal>
        </Layout>
    );
}