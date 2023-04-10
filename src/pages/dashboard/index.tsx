import Alerts from "@/components/common/alerts";
import Layout from "@/components/layout";
import { Button, Card, Container, Input, Navbar, Spacer, Text } from "@nextui-org/react";

export default function DashboardPage() {
    return (
        <Layout pageKey="dashboard" title="Dashboard" description="dashboard control panel">
            <Container css={{ marginTop: 28 }} lg>
                <Card>
                    <Card.Header css={{ justifyContent: 'center' }}>
                        Tabs
                    </Card.Header>
                    <Card.Divider />
                    <Card.Body css={{ marginTop: 12, paddingTop: 0 }}>
                        <Input
                            clearable
                            required
                            minLength={4}
                            type="test"
                            label="Username"
                            placeholder="Enter Your Username"
                        />
                        <Spacer y={0.6} />
                        <Input.Password
                            clearable
                            required
                            minLength={4}
                            type="password"
                            label="Password"
                            placeholder="Enter Your Password"
                        />
                        <Spacer y={0.8} />
                        <Button type="submit">Submit</Button>
                        <Spacer y={1} />
                        <Alerts messages={[{ type: 'error', title: 'test', content: 'hifg dgdfdgdfg dfgdg' }]} />
                    </Card.Body>
                </Card>
            </Container>
        </Layout>
    );
}