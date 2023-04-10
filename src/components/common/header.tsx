import { Button, Link, Navbar, Spacer, Text } from "@nextui-org/react";

export default function Header({ pageKey }: { pageKey: string }) {
    const links: { key: string, name: string, href: string }[] = [
        { key: "home", name: "Home", href: "/" },
        { key: "about", name: "About", href: "/#footer" },
        { key: "contact", name: "Contact", href: "/#footer" },
    ];

    return (
        <header>
            <Navbar variant={'floating'} shouldHideOnScroll isBordered>
                <Navbar.Brand css={{ "@xs": { w: "12%" } }}>
                    <Navbar.Toggle showIn={'xs'} />
                    <Spacer x={0.35} />
                    <Text b>
                        Digital Shop
                    </Text>
                </Navbar.Brand>
                <Navbar.Content variant={'highlight-rounded'} hideIn={'xs'} enableCursorHighlight>
                    {
                        links.map((link) => (<Navbar.Link href={link.href} isActive={link.key == pageKey}>{link.name}</Navbar.Link>))
                    }
                </Navbar.Content>
                <Navbar.Content>
                    <Navbar.Link href="/auth/signin">
                        Login
                    </Navbar.Link>
                    <Navbar.Item>
                        <Button auto flat as={Link} href="/auth/signup">
                            Sign Up
                        </Button>
                    </Navbar.Item>
                </Navbar.Content>
                <Navbar.Collapse>
                    <Navbar.CollapseItem key='home'>
                        <Link href="/">Home</Link>
                    </Navbar.CollapseItem>
                    <Navbar.CollapseItem key='about'>
                        <Link href="/#footer">About</Link>
                    </Navbar.CollapseItem>
                    <Navbar.CollapseItem key='contact'>
                        <Link href="/#footer">Contact</Link>
                    </Navbar.CollapseItem>
                </Navbar.Collapse>
            </Navbar>
        </header>
    )
}