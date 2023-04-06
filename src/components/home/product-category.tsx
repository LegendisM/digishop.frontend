import Product from '@/components/home/product';
import { IProduct } from '@/services/product/product.interface';
import { Container, Col, Row, Divider, Grid, Text } from '@nextui-org/react';

export default function ProductCategory({ title, description, products, icon }: { title: string, description: string, icon: React.ReactNode, products: IProduct[] }) {
    return (
        <Container css={{ marginTop: 28 }} lg>
            <Col>
                <Row justify='space-between'>
                    <Text b size={'large'}>
                        {title}
                    </Text>
                    {icon}
                    <Text span size={'small'} hideIn={'xs'}>
                        {description}
                    </Text>
                </Row>
                <Divider></Divider>
                <Row css={{ paddingTop: 8 }}>
                    <Grid.Container justify='center' gap={1}>
                        {products.map((product, index) => (
                            <Grid>
                                <Product data={product} />
                            </Grid>
                        ))}
                    </Grid.Container>
                </Row>
            </Col>
        </Container>
    );
}