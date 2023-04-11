import Layout from "@/components/layout";
import { GetApiRoute } from "@/constants/api.config";
import { Container, TextInput, Button, Paper, Title, Divider, Flex, Space } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import useAxios from "axios-hooks";

export default function SearchPage() {
    const [{ data, loading, error }, search] = useAxios({
        method: 'GET',
        url: GetApiRoute('product', 'search')
    }, { manual: true });

    return (
        <Layout pageKey="search" title="Search" description="Find Your Favorite Product With Advanced Search">
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
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        search();
                    }}>
                        <TextInput name="title" label="Name" placeholder="Enter title" />
                        <TextInput name="category" label="Category" placeholder="Enter category" mt={'md'} />
                        <TextInput name="description" label="Description" placeholder="Enter description" mt={'md'} />
                        <Button type="submit" fullWidth mt={'xl'}>
                            Find
                        </Button>
                    </form>
                </Paper>
            </Container>
        </Layout>
    );
}