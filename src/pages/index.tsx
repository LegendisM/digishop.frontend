import ProductCategory from '@/components/home/product-category';
import Layout from '@/components/layout';
import { GLOBAL_CONFIG } from '@/constants/config';

export default function HomePage() {
  return (
    <Layout pageKey='home' title="Home" description={GLOBAL_CONFIG.description}>
      <ProductCategory
        key={1}
        title='General'
        category='General'
        description='Main category'
        limit={8}
      />
      <ProductCategory
        key={2}
        title='Special'
        category='Special'
        description='Products with incredible features'
        limit={8}
      />
      <ProductCategory
        key={3}
        title='Free'
        category='Free'
        description='Free products to trust us'
        limit={8}
      />
    </Layout>
  )
}
