import { useState } from "react";
import { Container, TextInput, Button, Paper, Title, Divider, Flex, Space, Box, LoadingOverlay, Modal, Text, MultiSelect } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { IconSearch } from "@tabler/icons-react";
import Layout from "@/components/layout";
import Product from "@/components/home/product";
import { useAxios } from "@/common/service/api.service";
import { GET_API_ROUTE } from "@/constants/api.config";
import { IProductFindResponseDto } from "@/common/interfaces/product/product.dto";

export default function SearchPage() {
    const [selectedCategories, setSelectedCategories] = useState<{ value: string, label: string }[]>([]);
    const [opened, { open, close }] = useDisclosure(false);
    const form = useForm({
        initialValues: {
            name: '',
            category: [''],
            description: '',
            page: 1,
            limit: 20,
        }
    });
    const [{ data, loading, error }, search] = useAxios<IProductFindResponseDto>({
        method: 'POST',
        url: GET_API_ROUTE('product', 'find'),
        data: form.values
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
                        <Text
                            align="center"
                            size={'lg'}
                            sx={(theme) => ({ fontFamily: `Greycliff CF, ${theme.fontFamily}`, fontWeight: 700 })}
                        >
                            Advanced Search
                        </Text>
                        <IconSearch />
                    </Flex>
                    <Divider mt={'xs'} mb={'xs'} />
                    <Box component={'form'} onSubmit={form.onSubmit((values) => {
                        search().then(onSearchResponse);
                    })}>
                        <MultiSelect
                            name="category"
                            label="Category"
                            data={selectedCategories}
                            placeholder="Select Categories"
                            searchable
                            creatable
                            getCreateLabel={(query: any) => `+ Create ${query}`}
                            onCreate={(query: any) => {
                                const item = { value: query, label: query };
                                setSelectedCategories((current: any) => [...current, item]);
                                return item;
                            }}
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