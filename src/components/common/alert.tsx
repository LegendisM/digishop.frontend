import { Card, Text } from "@nextui-org/react";
import { BsInfoCircle } from "react-icons/bs";

export default function Alert(data: { title: string, content: string }) {
    return (
        <Card variant="flat" css={{ background: '$successLightActive' }}>
            <Card.Header css={{ alignItems: 'center' }}>
                <BsInfoCircle/>
                <Text b size={'lg'} css={{ marginLeft: 8 }}>
                    {data.title}
                </Text>
            </Card.Header>
            <Card.Body css={{ paddingTop: 0 }}>
                <Text>
                    {data.content}
                </Text>
            </Card.Body>
        </Card>
    );
}