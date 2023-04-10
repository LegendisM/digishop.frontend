import Layout from "@/components/layout";
import { Card, Container, Text } from "@nextui-org/react";

export default function SearchPage() {
    return (
        <Layout pageKey="search" title="Search" description="Find Your Favorite Product With Advanced Search">
            <Container css={{ marginTop: 28 }} lg>
                <Card>
                    <Card.Header css={{ justifyContent: 'center' }}>
                        <Text b size={'large'}>
                            Advanced Search
                        </Text>
                    </Card.Header>
                    <Card.Divider />
                    <Card.Body>
                        <Text b>
                            Find
                        </Text>
                    </Card.Body>
                </Card>
            </Container>
        </Layout>
    );
}