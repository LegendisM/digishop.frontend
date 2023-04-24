import {
    createStyles,
    Header,
    Group,
    Button,
    Divider,
    Box,
    Burger,
    Drawer,
    ScrollArea,
    rem,
} from '@mantine/core';
import { MantineLogo } from '@mantine/ds';
import { useDisclosure } from '@mantine/hooks';
import Auth from './auth';
import { IconSettings, IconUser, IconUserBolt } from '@tabler/icons-react';
import { IconUserCircle } from '@tabler/icons-react';

const useStyles = createStyles((theme) => ({
    link: {
        display: 'flex',
        alignItems: 'center',
        height: '100%',
        paddingLeft: theme.spacing.md,
        paddingRight: theme.spacing.md,
        textDecoration: 'none',
        color: theme.colorScheme === 'dark' ? theme.white : theme.black,
        fontWeight: 500,
        fontSize: theme.fontSizes.sm,
        [theme.fn.smallerThan('sm')]: {
            height: rem(42),
            display: 'flex',
            alignItems: 'center',
            width: '100%',
        },
        ...theme.fn.hover({
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
        }),
    },
    subLink: {
        width: '100%',
        padding: `${theme.spacing.xs} ${theme.spacing.md}`,
        borderRadius: theme.radius.md,
        ...theme.fn.hover({
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[0],
        }),
        '&:active': theme.activeStyles,
    },
    dropdownFooter: {
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[0],
        margin: `calc(${theme.spacing.md} * -1)`,
        marginTop: theme.spacing.sm,
        padding: `${theme.spacing.md} calc(${theme.spacing.md} * 2)`,
        paddingBottom: theme.spacing.xl,
        borderTop: `${rem(1)} solid ${theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[1]
            }`,
    },
    hiddenMobile: {
        [theme.fn.smallerThan('sm')]: {
            display: 'none',
        },
    },
    hiddenDesktop: {
        [theme.fn.largerThan('sm')]: {
            display: 'none',
        },
    },
}));

export default function HeaderPro({ pageKey }: { pageKey: string }) {
    const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);
    const { classes, theme } = useStyles();

    return (
        <Box>
            <Header height={60} px="md">
                <Group position="apart" sx={{ height: '100%' }}>
                    <MantineLogo size={30} />

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