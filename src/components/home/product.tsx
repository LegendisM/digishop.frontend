import { IProduct } from "@/common/interfaces/product/product.interface";
import { Badge, Button, Card, Group, Text, Image, Box } from "@mantine/core";
import { IconCash, IconTextCaption } from "@tabler/icons-react";

export default function Product({ data }: { data: IProduct }) {
    return (
        <Card shadow="sm" padding="sm" radius="md" miw={"300px"} withBorder>
            <Card.Section>
                <Image
                    src={data.cover}
                    height={200}
                    fit="cover"
                    alt={`Product ${data.name} Image`}
                />
            </Card.Section>

            <Group position="apart" mt="sm" mb="xs">
                <Text weight={500}>{data.name}</Text>
                <Group position="right">
                    {data.category.map((value, index) => (<Badge key={index} color={index % 2 == 0 ? "green" : "yellow"} variant="light">{value}</Badge>))}
                </Group>
            </Group>

            <Text size="sm" color="dimmed">
                <Group spacing={'5px'}>
                    <IconCash size={'18px'} />
                    <Text>
                        ${data.price}
                    </Text>
                </Group>
                <Group spacing={'5px'} mt={"xs"}>
                    <IconTextCaption size={'18px'} />
                    <Text>
                        {data.description}
                    </Text>
                </Group>
            </Text>

            <Button variant="gradient" fullWidth mt="md" radius="md">
                View Page
            </Button>
        </Card>
    )
}