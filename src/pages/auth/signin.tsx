import { IAuthResponseDto } from "@/common/interfaces/auth/auth.dto";
import Layout from "@/components/layout";
import { GetApiRoute } from "@/constants/api.config";
import { Anchor, Button, Checkbox, Container, Group, Paper, PasswordInput, TextInput, Title, Text, Divider } from "@mantine/core";
import useAxios from "axios-hooks";

export default function SignInPage() {
    const [{ data, loading, error }, signin] = useAxios<IAuthResponseDto>({
        url: GetApiRoute('auth', 'signin'),
        method: 'POST',
        data: { username: 'LegendisM', password: 'LegendisM1212' }
    }, { manual: true });

    return (
        <Layout pageKey="signin" title="Sign In" description="User Auth SignIn">
            <Container size={'xs'} my={40}>
                <Title
                    align="center"
                    sx={(theme) => ({ fontFamily: `Greycliff CF, ${theme.fontFamily}`, fontWeight: 900 })}
                >
                    Welcome back!
                </Title>
                <Text color="dimmed" size="sm" align="center" mt={5}>
                    Do not have an account yet?{' '}
                    <Anchor href="/auth/signup" size="sm">
                        Create account
                    </Anchor>
                </Text>

                <Paper withBorder shadow="md" p={30} mt={30} radius="md">
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        signin();
                    }}>
                        <TextInput name="username" label="Username" placeholder="Your Username" required />
                        <PasswordInput name="password" label="Password" placeholder="Your Password" required mt="md" />
                        <Button type="submit" fullWidth mt="xl">
                            Sign in
                        </Button>
                    </form>
                </Paper>
            </Container>
        </Layout >
    )
}