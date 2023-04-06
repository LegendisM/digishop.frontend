import { IProduct } from "@/services/product/product.interface";
import { Button, Card, Row, Text, Badge, Spacer } from "@nextui-org/react";
import { FaCartPlus } from "react-icons/fa";

export default function Product({ data }: { data: IProduct }) {
    return (
        <Card css={{ width: 260, height: 380 }} isHoverable>
            <Card.Image
                src={data.image}
                width="100%"
                height={225}
                objectFit="cover"
                alt={`Product ${data.title} Image`}
            />
            <Card.Body css={{ paddingTop: 12 }}>
                <Row align="baseline">
                    <Badge color={'primary'} variant={'flat'} size={'xs'} isSquared disableOutline>
                        {data.category}
                    </Badge>
                    <Spacer x={0.28} />
                    <Text b color="black">
                        {data.title}
                    </Text>
                </Row>
                <Row css={{ padding: 2.5 }}>
                    <Text span size={'small'} color="grey">
                        {data.description}
                    </Text>
                </Row>
            </Card.Body>
            <Card.Divider></Card.Divider>
            <Card.Footer>
                <Button auto flat size={'sm'} css={{ width: '100vw' }}>
                    ${data.price}
                </Button>
                <Spacer x={0.325} />
                <Button auto size={'sm'} css={{ marginLeft: 'auto' }}>
                    <FaCartPlus />
                </Button>
            </Card.Footer>
        </Card>
    )
}