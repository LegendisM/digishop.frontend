import ProductCategory from '@/components/home/product-category';
import Layout from '@/components/layout';
import { GlobalConfig } from '@/constants/config';

export default function HomePage() {
  return (
    <Layout pageKey='home' title="Home" description={GlobalConfig.description}>
      <ProductCategory
        title='General'
        category='GENERAL'
        description='test description'
        limit={8}
      />
      <ProductCategory
        title='Special'
        category='SPECIAL'
        description='test description 2'
        limit={8}
      />
    </Layout>
  )
}
