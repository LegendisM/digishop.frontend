import Layout from "@/components/layout";
import { Card, Container, Text, Input, Button, Spacer } from "@nextui-org/react";

export default function SignInPage() {
    return (
        <Layout title="Sign In" description="User Auth SignIn">
            <Container css={{ marginTop: 28 }} xs>
                <Card>
                    <Card.Header css={{ justifyContent: 'center' }}>
                        <Text b size={'large'}>
                            Sign In
                        </Text>
                    </Card.Header>
                    <Card.Divider />
                    <Card.Body css={{ marginTop: 12, paddingTop: 0 }}>
                        <Input
                            clearable
                            type="test"
                            label="Username"
                            placeholder="Enter Your Username"
                        />
                        <Spacer y={0.6} />
                        <Input.Password
                            clearable
                            type="password"
                            label="Password"
                            placeholder="Enter Your Password"
                        />
                        <Spacer y={0.8} />
                        <Button type="submit">Submit</Button>
                    </Card.Body>
                </Card>
            </Container>
        </Layout>
    )
}