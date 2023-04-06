import ProductCategory from '@/components/home/product-category';
import Layout from '@/components/layout';
import { Divider, Spacer } from '@nextui-org/react';
import { FcApproval, FcLike } from "react-icons/fc";

export default function Home() {
  return (
    <Layout title='Digital Shop'>
      <ProductCategory
        title='General'
        description='test description'
        icon={<FcApproval />}
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
        icon={<FcLike />}
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
