import { Box, Burger, Flex, Navbar } from "@mantine/core";
import Auth from "../common/auth";
import Layout from "../layout";
import { IconUser, IconSettings, IconPhoneCall, IconLogout } from "@tabler/icons-react";
import { useRouter } from "next/router";
import { useStyles } from "@/styles/dashboard/style";
import { useDisclosure, useLocalStorage } from "@mantine/hooks";
import { MantineLogo } from "@mantine/ds";

const pages = [
    { link: '', label: 'Profile', icon: IconUser },
    { link: 'product', label: 'Product', icon: IconSettings },
    { link: 'support', label: 'Support', icon: IconPhoneCall },
];

export default function DashboardLayout({ children, label }: { children: React.ReactNode, label: string }) {
    const router = useRouter();
    const { classes, cx } = useStyles();
    const [opened, { toggle }] = useDisclosure(true);
    const [token, setToken] = useLocalStorage({ key: 'token' });

    const links = pages.map((item) => (
        <a
            key={item.label}
            className={cx(classes.link, { [classes.linkActive]: item.label === label })}
            href={`/dashboard/${item.link}`}
        >
            <item.icon className={classes.linkIcon} stroke={1.5} />
            <span>{item.label}</span>
        </a>
    ));

    const logout = () => {
        setToken('');
        router.push('/auth/signin');
    }

    return (
        <Layout pageKey="dashboard" title={`Dashboard ${label}`} description="dashboard control panel" shell={{ header: <></>, footer: <></> }}>
            <Auth auth={true} message={true}>
                <Navbar p="md" width={opened ? { sm: 200, lg: 300 } : { sm: 55, lg: 65 }}>
                    <Navbar.Section>
                        <Flex className={classes.header} justify={'space-between'} align="center">
                            <MantineLogo size={28} inverted />
                            <Burger opened={opened} onClick={toggle}></Burger>
                        </Flex>
                    </Navbar.Section>

                    <Navbar.Section grow hidden={!opened}>
                        {links}
                    </Navbar.Section>

                    <Navbar.Section className={classes.footer} hidden={!opened}>
                        <Box component='a' className={classes.link} onClick={logout}>
                            <IconLogout className={classes.linkIcon} stroke={1.5} />
                            <span>Logout</span>
                        </Box>
                    </Navbar.Section>
                </Navbar>
                <Box>
                    {children}
                </Box>
            </Auth>
        </Layout>
    );
}