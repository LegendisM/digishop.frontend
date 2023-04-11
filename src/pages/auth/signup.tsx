import React from "react";
import Layout from "@/components/layout";
import { GetApiRoute } from "@/constants/api.config";
import { IAuthResponseDto } from "@/common/interfaces/auth/auth.dto";
import useAxios from "axios-hooks";
import { Anchor, Button, Checkbox, Container, Group, Paper, PasswordInput, TextInput, Title, Text } from "@mantine/core";

export default function SignUpPage() {
    const [{ data, loading, error }, signup] = useAxios<IAuthResponseDto>({
        method: 'post',
        url: GetApiRoute('auth', 'signup')
    }, { manual: true });

    return (
        <Layout pageKey="signup" title="Sign Up" description="User Auth SignUp">
            <Container size={'xs'} my={40}>
                <Title
                    align="center"
                    sx={(theme) => ({ fontFamily: `Greycliff CF, ${theme.fontFamily}`, fontWeight: 900 })}
                >
                    Welcome
                </Title>
                <Text color="dimmed" size="sm" align="center" mt={5}>
                    You already have an account؟{' '}
                    <Anchor href="/auth/signin" size="sm">
                        Login account
                    </Anchor>
                </Text>

                <Paper withBorder shadow="md" p={30} mt={30} radius="md">
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        signup();
                    }}>
                        <TextInput name="username" label="Username" placeholder="Your Username" required />
                        <PasswordInput name="password" label="Password" placeholder="Your Password" required mt="md" />
                        <Button type="submit" fullWidth mt="xl">
                            Sign up
                        </Button>
                    </form>
                </Paper>
            </Container>
        </Layout>
    )
}