import Link from "next/link";
import { IconLock } from "@tabler/icons-react";
import { createContext, useContext, useEffect, useState } from "react";
import { Flex, Paper, Container, Button, Title, Text, Space, LoadingOverlay, Box, Group, Skeleton } from "@mantine/core";
import { GET_API_ROUTE } from "@/constants/api.config";
import { useAxios } from "@/common/service/api.service";
import { IAuthUser } from "@/common/interfaces/auth/auth.interface";
import { IUser } from "@/common/interfaces/user/user.interface";

export const AuthContext = createContext<IAuthUser>({ auth: false } as IAuthUser);

export function AuthProvider(data: { children: React.ReactNode }) {
    const [auth, setAuth] = useState<IAuthUser>({ auth: false } as IAuthUser);
    const [{ data: fetchData, loading }] = useAxios<IUser>({
        url: GET_API_ROUTE('user', 'fetch')
    }, { manual: false });

    const onEvent = (type: 'SIGNIN' | 'SIGNOUT') => {
        setAuth({
            auth: (type == "SIGNIN"),
            user: (type == "SIGNOUT" ? undefined : auth.user)
        } as IAuthUser);
    }

    useEffect(() => {
        setAuth({
            auth: fetchData != null && fetchData.id !== null,
            user: fetchData ?? null
        } as IAuthUser);
    }, [fetchData]);

    return (
        <AuthContext.Provider value={{ ...auth, ...{ onEvent } }}>
            <Group position="center">
                <LoadingOverlay visible={loading} />
            </Group>
            <Skeleton visible={loading}>
                {data.children}
            </Skeleton>
        </AuthContext.Provider >
    )
}

export default function Auth(data: { children: React.ReactNode, auth: boolean, roles?: string[], message?: boolean }) {
    const { roles = [] } = data;
    const { auth, user } = useContext(AuthContext);

    return (
        <>
            {auth == data.auth ? ((roles.length == 0) || (roles.some((role) => user?.roles.includes(role))) ? data.children : <InvalidAuth solve={false} />) : (data.message == true ? <InvalidAuth /> : null)}
        </>
    );
}

export function InvalidAuth(data: { message?: string, solve?: boolean }) {
    const { message = "Access Denied", solve = true } = data;

    return (
        <Container size={'sm'} my={40}>
            <Paper p={30} mt={30} shadow="lg" radius={'md'} bg={'#721f1f59'}>
                <Flex justify={'center'} align={'center'} direction={'column'}>
                    <IconLock size={'55px'} />
                    <Space h={'sm'} />
                    <Title sx={{ fontSize: '1.35rem' }}>
                        {message}
                    </Title>
                    <Space h={'xs'} />
                    <Box hidden={!solve}>
                        <Text>
                            Login to your account first
                        </Text>
                        <Space h={'lg'} />
                        <Group position={'center'}>
                            <Link href={'/auth/signin'}>
                                <Button variant={'default'}>Login</Button>
                            </Link>
                        </Group>
                    </Box>
                    <Box hidden={solve}>
                        You do not have sufficient access to this section
                    </Box>
                </Flex>
            </Paper>
        </Container>
    )
}