import { Button, Link, Navbar, Spacer, Text } from "@nextui-org/react";

export default function Header() {
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
                    <Navbar.Link href="/" isActive>Home</Navbar.Link>
                    <Navbar.Link href="/products">Products</Navbar.Link>
                    <Navbar.Link href="/about">About</Navbar.Link>
                    <Navbar.Link href="/contact">Contact</Navbar.Link>
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
                    <Navbar.CollapseItem key={'item'} >
                        <Link href="#">{'item'}</Link>
                    </Navbar.CollapseItem>
                </Navbar.Collapse>
            </Navbar>
        </header>
    )
}