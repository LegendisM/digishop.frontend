import ProductCategory from '@/components/home/product-category';
import Layout from '@/components/layout';
import { Config } from '@/constants/config';

export default function HomePage() {
  return (
    <Layout title={Config.title} description={Config.description}>
      <ProductCategory
        title='General'
        description='test description'
        products={[
          {
            id: 'f52111',
            title: 'product 1',
            category: 'GENERAL',
            description: 'description test 123',
            image: 'https://nextui.org/images/card-example-1.jpeg',
            price: 254
          },
          {
            id: '423vg5,',
            title: 'product 2',
            category: 'GENERAL',
            description: 'description test 421',
            image: 'https://nextui.org/images/card-example-2.jpeg',
            price: 1029
          },
        ]}
      />
      <ProductCategory
        title='Special'
        description='test description 2'
        products={[
          {
            id: 'f52111',
            title: 'product 1',
            category: 'GENERAL',
            description: 'description test 123',
            image: 'https://nextui.org/images/card-example-1.jpeg',
            price: 254
          },
          {
            id: '423vg5,',
            title: 'product 2',
            category: 'GENERAL',
            description: 'description test 421',
            image: 'https://nextui.org/images/card-example-2.jpeg',
            price: 1029
          },
        ]}
      />
    </Layout>
  )
}
