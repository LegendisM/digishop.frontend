import { Card, Container, Text, User, Spacer } from "@nextui-org/react";
import Link from "next/link";

export default function Footer() {
    return (
        <footer id="footer">
            <Container css={{ marginTop: 20, paddingBottom: 15 }} lg>
                <Card css={{ padding: 15, paddingBottom: 2 }} isHoverable>
                    <Card.Body css={{ alignItems: 'center' }}>
                        <User src="/images/avatars/legendism.png" name="Hamidreza Mohammadi" bordered>
                            Full Stack Developer
                            <br />
                            <User.Link href="https://github.com/LegendisM">@Github</User.Link>
                            <span> | </span>
                            <User.Link href="tel://+989016493605">+989016493605</User.Link>
                        </User>
                    </Card.Body>
                    <Card.Divider />
                    <Card.Footer css={{ justifyContent: 'center' }}>
                        <Text b size={'md'}>
                            Developed by <Link href={'https://www.instagram.com/legendism76'}>LegendisM</Link> With <span style={{ color: 'red' }}>❤</span>
                        </Text>
                    </Card.Footer>
                </Card>
            </Container>
        </footer>
    )
}