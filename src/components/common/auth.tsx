import { Flex, Paper, Container, Button, Title, Text, Space } from "@mantine/core";
import { useLocalStorage, useTimeout } from "@mantine/hooks"
import { IconLock } from "@tabler/icons-react";
import { useState } from "react";

export default function Auth(data: { children: React.ReactNode, auth: boolean, message?: boolean }) {
    const [token, setToken] = useLocalStorage({ key: 'token' });
    const isAuth = (token && typeof token == "string" && token.length > 0) == true;

    return (
        <>
            {isAuth == data.auth ? data.children : (data.message == true ? <InvalidAuth /> : null)}
        </>
    )
}

export function InvalidAuth() {
    const [hidden, setHidden] = useState(true);
    const { start, clear } = useTimeout(() => setHidden(false), 1000, { autoInvoke: true });

    return (
        <Container size={'sm'} my={40} hidden={hidden}>
            <Paper p={30} mt={30} shadow="lg" radius={'md'} bg={'#721f1f59'}>
                <Flex justify={'center'} align={'center'} direction={'column'}>
                    <IconLock size={'55px'} />
                    <Space h={'sm'} />
                    <Title sx={{ fontSize: '1.35rem' }}>
                        Access Denied
                    </Title>
                    <Space h={'xs'} />
                    <Text>
                        Login to your account first
                    </Text>
                    <Space h={'lg'} />
                    <Button component="a" href={'/auth/signin'} variant={'default'}>Login</Button>
                </Flex>
            </Paper>
        </Container>
    )
}