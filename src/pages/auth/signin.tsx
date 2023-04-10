import { IAuthResponseDto } from "@/common/interfaces/auth/auth.dto";
import Alerts from "@/components/common/alerts";
import Layout from "@/components/layout";
import { GetApiRoute } from "@/constants/api.config";
import { Card, Container, Text, Input, Button, Spacer } from "@nextui-org/react";
import useAxios from "axios-hooks";

export default function SignInPage() {
    const [{ data, loading, error }, signin] = useAxios<IAuthResponseDto>({
        url: GetApiRoute('auth', 'signin'),
        method: 'POST',
        data: { username: 'LegendisM', password: 'LegendisM1212' }
    }, { manual: true });

    return (
        <Layout pageKey="signin" title="Sign In" description="User Auth SignIn">
            <Container css={{ marginTop: 28 }} xs>
                <form onSubmit={(e) => {
                    e.preventDefault();
                    signin();
                }}>
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
                                required
                                minLength={4}
                                type="text"
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
                            <Alerts messages={(data ? [{ type: 'error', title: `${data.state ? 'a' : 'b'}`, content: `${data.message} | ${data.token}` }] : [])} />
                        </Card.Body>
                    </Card>
                </form>
            </Container>
        </Layout >
    )
}