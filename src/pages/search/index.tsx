import Alerts from "@/components/common/alerts";
import Layout from "@/components/layout";
import { GetApiRoute } from "@/constants/api.config";
import { Button, Card, Container, Input, Spacer, Text } from "@nextui-org/react";
import useAxios from "axios-hooks";

export default function SearchPage() {
    const [{ data, loading, error }, search] = useAxios({
        method: 'GET',
        url: GetApiRoute('product', 'search')
    }, { manual: true });

    return (
        <Layout pageKey="search" title="Search" description="Find Your Favorite Product With Advanced Search">
            <Container css={{ marginTop: 28 }} xs>
                <form onSubmit={(e) => {
                    e.preventDefault();
                    search();
                }}>
                    <Card>
                        <Card.Header css={{ justifyContent: 'center' }}>
                            <Text b size={'large'}>
                                Advanced Search
                            </Text>
                        </Card.Header>
                        <Card.Divider />
                        <Card.Body>
                            <Input
                                clearable
                                type="text"
                                label="Category"
                                placeholder="Enter Your Category Name"
                            />
                            <Spacer y={0.6} />
                            <Input
                                clearable
                                type="text"
                                label="Title"
                                placeholder="Enter Your Title"
                            />
                            <Spacer y={0.6} />
                            <Input
                                clearable
                                type="text"
                                label="Description"
                                placeholder="Enter Your Description"
                            />
                            <Spacer y={0.8} />
                            <Button type="submit">Start</Button>
                        </Card.Body>
                    </Card>
                </form>
            </Container>
        </Layout>
    );
}