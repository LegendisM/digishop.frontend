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
                        <a href="/" className={classes.link}>
                            Home
                        </a>
                        <a href="/search" className={classes.link}>
                            Search
                        </a>
                        <a href="/support" className={classes.link}>
                            Support
                        </a>
                    </Group>

                    <Group className={classes.hiddenMobile}>
                        <Auth auth={false}>
                            <Button href='/auth/signin' component='a' variant="default">Login</Button>
                            <Button href='/auth/signup' component='a'>Sign up</Button>
                        </Auth>
                        <Auth auth={true}>
                            <Button leftIcon={<IconUserCircle />} href='/dashboard' component='a' variant="default">Profile</Button>
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

                    <a href="/" className={classes.link}>
                        Home
                    </a>
                    <a href="/search" className={classes.link}>
                        Search
                    </a>
                    <a href="/support" className={classes.link}>
                        Support
                    </a>

                    <Divider my="sm" color={theme.colorScheme === 'dark' ? 'dark.5' : 'gray.1'} />

                    <Group position="center" grow pb="xl" px="md">
                        <Auth auth={false}>
                            <Button href='/auth/signin' component='a' variant="default">Login</Button>
                            <Button href='/auth/signup' component='a'>Sign up</Button>
                        </Auth>
                        <Auth auth={true}>
                            <Button leftIcon={<IconUserCircle />} href='/dashboard' component='a' variant="default">Profile</Button>
                        </Auth>
                    </Group>
                </ScrollArea>
            </Drawer>
        </Box>
    )
}