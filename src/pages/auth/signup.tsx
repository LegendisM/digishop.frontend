import Layout from "@/components/layout";
import { Anchor, Button, Container, Paper, PasswordInput, TextInput, Title, Text, Box, Space } from "@mantine/core";
import { hasLength, useForm } from "@mantine/form";
import { useAxios } from "@/common/services/api.service";
import { IAuthResponseDto } from "@/common/interfaces/auth/auth.dto";
import { GetApiRoute } from "@/constants/api.config";
import Alerts, { AlertColors } from "@/components/common/alerts";

export default function SignUpPage() {
    const form = useForm({
        initialValues: {
            username: '',
            password: ''
        },
        validate: {
            username: hasLength({ min: 3, max: 25 }, 'Username must be 3-25 characters long'),
            password: hasLength({ min: 3, max: 25 }, 'Password must be 3-25 characters long'),
        }
    });
    const [{ data, loading, error }, signup] = useAxios<IAuthResponseDto>({
        url: GetApiRoute('auth', 'signup'),
        method: 'POST',
        data: form.values
    });

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
                    <Box component="form" onSubmit={form.onSubmit((values) => { signup(); })}>
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
                        <Button type="submit" fullWidth mt="xl">
                            Sign up
                        </Button>
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
                    </Box>
                </Paper>
            </Container>
        </Layout>
    )
}