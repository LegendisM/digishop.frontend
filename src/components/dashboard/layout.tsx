import { Box, Center, Navbar, Stack, Tooltip, UnstyledButton } from "@mantine/core";
import Auth from "../common/auth";
import Layout from "../layout";
import { IconUser, IconSettings, IconPhoneCall, IconLogout, IconBackspace } from "@tabler/icons-react";
import { useRouter } from "next/router";
import { useStyles } from "@/styles/dashboard/style";
import { useLocalStorage } from "@mantine/hooks";
import { MantineLogo } from "@mantine/ds";

interface NavbarLinkProps {
    icon: React.FC<any>;
    label: string;
    active?: boolean;
    onClick?(): void;
}

function NavbarLink({ icon: Icon, label, active, onClick }: NavbarLinkProps) {
    const { classes, cx } = useStyles();
    return (
        <Tooltip label={label} position="right" transitionProps={{ duration: 0 }}>
            <UnstyledButton onClick={onClick} className={cx(classes.link, { [classes.active]: active })}>
                <Icon size="1.2rem" stroke={1.5} />
            </UnstyledButton>
        </Tooltip>
    );
}

const pages = [
    { link: '/dashboard', label: 'Profile', icon: IconUser },
    { link: '/dashboard/product', label: 'Product', icon: IconSettings },
    { link: '/dashboard/support', label: 'Support', icon: IconPhoneCall },
];

export default function DashboardLayout({ children, label }: { children: React.ReactNode, label: string }) {
    const router = useRouter();
    const [token, setToken] = useLocalStorage({ key: 'token' });

    const links = pages.map((item, index) => (
        <NavbarLink
            {...item}
            key={item.label}
            active={item.label === label}
            onClick={() => router.push(item.link)}
        />
    ));

    const onBack = () => {
        router.push('/');
    }

    const onLogout = () => {
        setToken('');
        router.push('/auth/signin');
    }

    return (
        <Layout pageKey="dashboard" title={`Dashboard ${label}`} description="dashboard control panel" shell={{ header: <></>, footer: <></> }}>
            <Auth auth={true} message={true}>
                <Navbar width={{ base: 80 }} p="md">
                    <Center>
                        <MantineLogo type="mark" size={30} />
                    </Center>

                    <Navbar.Section grow mt={50}>
                        <Stack justify="center" spacing={0}>
                            {links}
                        </Stack>
                    </Navbar.Section>

                    <Navbar.Section>
                        <Stack justify="center" spacing={0}>
                            <NavbarLink icon={IconBackspace} label="Back" onClick={onBack} />
                            <NavbarLink icon={IconLogout} label="Logout" onClick={onLogout} />
                        </Stack>
                    </Navbar.Section>
                </Navbar>
                <Box>
                    {children}
                </Box>
            </Auth>
        </Layout>
    );
}