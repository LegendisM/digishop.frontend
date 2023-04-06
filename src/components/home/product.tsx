import { Button, Card, Col, Row, Text, Badge, Spacer } from "@nextui-org/react";

export default function Product({ title, category, description, price, image }: { title: string, category: string, description: string, price: number, image: string }) {
    return (
        <Card css={{ width: 260, height: 380 }}>
            <Card.Image
                src={image}
                width="100%"
                height={225}
                objectFit="cover"
                alt={`Product ${title} Image`}
            />

            <Card.Body css={{ paddingTop: 12 }}>
                <Row>
                    <Badge color={'primary'} variant={'flat'} size={'xs'} isSquared disableOutline>
                        {category}
                    </Badge>
                    <Spacer x={0.28} />
                    <Text b color="black">
                        {title}
                    </Text>
                </Row>
                <Row css={{ padding: 2.5 }}>
                    <Text span size={'small'} color="grey">
                        {description}
                    </Text>
                </Row>
            </Card.Body>
            <Card.Divider></Card.Divider>
            <Card.Footer>
                <Row justify="space-between" align="baseline">
                    <Button size={'sm'}>
                        Buy
                    </Button>
                    <Button auto flat size={'sm'}>
                        ⭐
                    </Button>
                </Row>
            </Card.Footer>
        </Card>
    )
}