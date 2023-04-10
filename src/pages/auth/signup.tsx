import React from "react";
import Layout from "@/components/layout";
import { Button, Card, Container, Spacer, Text, Input, useInput } from "@nextui-org/react";
import { GetApiRoute } from "@/constants/api.config";
import Alerts from "@/components/common/alerts";
import { IAuthResponseDto } from "@/common/interfaces/auth/auth.dto";
import useAxios from "axios-hooks";

export default function SignUpPage() {
    const [{ data, loading, error }, signup] = useAxios<IAuthResponseDto>({
        method: 'post',
        url: GetApiRoute('auth', 'signup')
    }, { manual: true });

    return (
        <Layout pageKey="signup" title="Sign Up" description="User Auth SignUp">
            <Container css={{ marginTop: 28 }} xs>
                <form onSubmit={(e) => {
                    e.preventDefault();
                    signup();
                }}>
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
                                required
                                minLength={4}
                                name="username"
                                type="text"
                                label="Username"
                                placeholder="Enter Your Username"
                            />
                            <Spacer y={0.6} />
                            <Input
                                clearable
                                required
                                name="email"
                                type="email"
                                label="Email"
                                placeholder="Enter Your Email"
                            />
                            <Spacer y={0.6} />
                            <Input.Password
                                clearable
                                required
                                minLength={4}
                                name="password"
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
                </form>
            </Container>
        </Layout>
    )
}