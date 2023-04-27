import {
    Header,
    Group,
    Button,
    Divider,
    Box,
    Burger,
    Drawer,
    ScrollArea,
    rem,
    useMantineColorScheme,
    ActionIcon,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import Auth from './auth';
import { IconMoonStars, IconSun } from '@tabler/icons-react';
import { IconUserCircle } from '@tabler/icons-react';
import Logo from './logo';
import { useStyles } from '@/styles/common/header-style';
import Link from 'next/link';

export default function HeaderPro({ pageKey }: { pageKey: string }) {
    const { classes, theme } = useStyles();
    const { colorScheme, toggleColorScheme } = useMantineColorScheme();
    const dark = colorScheme === 'dark';
    const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);

    return (
        <Box>
            <Header className={classes.header} height={60} px="md">
                <Group position="apart" sx={{ height: '100%' }}>
                    <Logo />

                    <Group sx={{ height: '100%' }} spacing={0} className={classes.hiddenMobile}>
                        <Link href={'/'} className={classes.link}>
                            Home
                        </Link>
                        <Link href={'/search'} className={classes.link}>
                            Search
                        </Link>
                        <Link href={'/support'} className={classes.link}>
                            Support
                        </Link>
                    </Group>

                    <Group className={classes.hiddenMobile}>
                        <Auth auth={false}>
                            <Link href={'/auth/signin'}>
                                <Button variant="default">Login</Button>
                            </Link>
                            <Link href={'/auth/signup'}>
                                <Button>Sign up</Button>
                            </Link>
                        </Auth>
                        <Auth auth={true}>
                            <Link href={'/dashboard'}>
                                <Button leftIcon={<IconUserCircle />} variant="default">Profile</Button>
                            </Link>
                        </Auth>
                        <ActionIcon
                            size={'lg'}
                            variant="light"
                            color={dark ? 'yellow' : 'blue'}
                            onClick={() => toggleColorScheme()}
                            title="Toggle color scheme"
                        >
                            {dark ? <IconSun size="1.25rem" /> : <IconMoonStars size="1.25rem" />}
                        </ActionIcon>
                    </Group>

                    <Burger opened={drawerOpened} onClick={toggleDrawer} className={classes.hiddenDesktop} />
                </Group>
            </Header>

            <Drawer
                opened={drawerOpened}
                onClose={closeDrawer}
                size="100%"
                padding="md"
                title="Navigation"
                className={classes.hiddenDesktop}
                zIndex={1000000}
            >
                <ScrollArea h={`calc(100vh - ${rem(60)})`} mx="-md">
                    <Divider my="sm" color={theme.colorScheme === 'dark' ? 'dark.5' : 'gray.1'} />

                    <Link href={'/'} className={classes.link}>
                        Home
                    </Link>
                    <Link href={'/search'} className={classes.link}>
                        Search
                    </Link>
                    <Link href={'/support'} className={classes.link}>
                        Support
                    </Link>

                    <Divider my="sm" color={theme.colorScheme === 'dark' ? 'dark.5' : 'gray.1'} />

                    <Group position="center" grow pb="xl" px="md">
                        <Auth auth={false}>
                            <Link href={'/auth/signin'}>
                                <Button variant="default">Login</Button>
                            </Link>
                            <Link href={'/auth/signup'}>
                                <Button>Sign up</Button>
                            </Link>
                        </Auth>
                        <Auth auth={true}>
                            <Link href={'/dashboard'}>
                                <Button leftIcon={<IconUserCircle />} variant="default">Profile</Button>
                            </Link>
                        </Auth>
                    </Group>
                </ScrollArea>
            </Drawer>
        </Box>
    )
}