import React from "react";
import Layout from "@/components/layout";
import { Button, Card, Container, Spacer, Text, Input, useInput } from "@nextui-org/react";

export default function SignUpPage() {
    return (
        <Layout title="Sign Up" description="User Auth SignUp">
            <Container css={{ marginTop: 28 }} xs>
                <Card>
                    <Card.Header css={{ justifyContent: 'center' }}>
                        <Text b size={'large'}>
                            Sign Up
                        </Text>
                    </Card.Header>
                    <Card.Divider />
                    <Card.Body css={{ marginTop: 12, paddingTop: 0 }}>
                        <Input
                            clearable
                            name="username"
                            type="text"
                            label="Username"
                            placeholder="Enter Your Username"
                        />
                        <Spacer y={0.6} />
                        <Input
                            clearable
                            name="email"
                            type="email"
                            label="Email"
                            placeholder="Enter Your Email"
                        />
                        <Spacer y={0.6} />
                        <Input.Password
                            clearable
                            name="password"
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