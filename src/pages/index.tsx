import Product from '@/components/home/product'
import Layout from '@/components/layout'
import { Container, Col, Row, Divider, Text, Spacer, Grid, Card } from '@nextui-org/react'

export default function Home() {
  return (
    <Layout title='Digital Shop'>
      <Container css={{ marginTop: 25 }} lg>
        <Col>
          <Text b size={'large'}>
            [ICON]
            General Products
          </Text>
          <Spacer y={0.1} />
          <span>description of section</span>
          <Row>
            <Grid.Container gap={1}>
              <Grid>
                <Product title='hi' category='GENERAL' description='test' image='https://nextui.org/images/card-example-1.jpeg' price={222} />
              </Grid>
              <Grid>
                <Product title='hi2' category='GENERAL' description='test2' image='https://nextui.org/images/card-example-2.jpeg' price={55} />
              </Grid>
              <Grid>
                <Product title='hi3' category='GENERAL' description='test3' image='https://nextui.org/images/card-example-3.jpeg' price={22} />
              </Grid>
              <Grid>
                <Product title='hi3' category='GENERAL' description='test3' image='https://nextui.org/images/card-example-4.jpeg' price={22} />
              </Grid>
              <Grid>
                <Product title='hi3' category='GENERAL' description='test3' image='https://nextui.org/images/card-example-5.jpeg' price={22} />
              </Grid>
            </Grid.Container>
          </Row>
        </Col>
      </Container>
    </Layout>
  )
}
