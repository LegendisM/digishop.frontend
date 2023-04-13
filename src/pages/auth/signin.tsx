import { IAuthResponseDto } from "@/common/interfaces/auth/auth.dto";
import { useAxios } from "@/common/services/api.service";
import Alerts, { AlertColors } from "@/components/common/alerts";
import Layout from "@/components/layout";
import { GetApiRoute } from "@/constants/api.config";
import { Anchor, Button, Container, Paper, PasswordInput, TextInput, Title, Text, Space, Box } from "@mantine/core";
import { hasLength, useForm } from "@mantine/form";

export default function SignInPage() {
    const form = useForm({
        initialValues: {
            username: '',
            password: '',
        },
        validate: {
            username: hasLength({ min: 3, max: 25 }, 'Username must be 3-25 characters long'),
            password: hasLength({ min: 3, max: 25 }, 'Password must be 3-25 characters long'),
        }
    });
    const [{ data, loading, error }, signin] = useAxios<IAuthResponseDto>({
        url: GetApiRoute('auth', 'signin'),
        method: 'POST',
        data: form.values
    });

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

                <Paper withBorder shadow="md" p={30} pb={25} mt={30} radius="md">
                    <Box component="form" onSubmit={form.onSubmit((values) => { signin(); })}>
                        <TextInput
                            name="username"
                            label="Username"
                            placeholder="Your Username"
                            required
                            {...form.getInputProps('username')}
                        />
                        <PasswordInput
                            name="password"
                            label="Password"
                            placeholder="Your Password"
                            mt="md"
                            required
                            {...form.getInputProps('password')}
                        />
                        <Button type="submit" fullWidth mt="xl" loading={loading}>
                            Sign in
                        </Button>
                    </Box>
                    <Space h={'md'} />
                    <Alerts
                        messages={[
                            {
                                condition: data != undefined,
                                color: data?.state ? AlertColors.success : AlertColors.error,
                                title: 'Info',
                                content: data?.message ?? "Invalid"
                            },
                            {
                                condition: error != undefined,
                                color: AlertColors.error,
                                title: "Error",
                                content: error?.message ?? "Invalid"
                            },
                        ]}
                    />
                </Paper>
            </Container>
        </Layout >
    )
}