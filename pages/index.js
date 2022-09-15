import { useSession } from 'next-auth/react';
import Layout from '../components/Layout';
import ProductItem from '../components/ProductItem';
import UseReducer from '../components/useReducer'
import Product from '../models/Product';
import styles from '../styles/Home.module.css'
import db from '../utils/db'

export default function Home({products}) {
  const {status, data: session} = useSession();
  return (
    <Layout title="Home Page">
    <div className='gird grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4'>
      {status === 'loading' ? (
        'Loading'
      ) : session?.user ? (
        <div>
          {session.user.name}
        {session.user.email}
        </div>
        
      ) : (
        <div>You have to login</div>
      )}
      
      
        {products.map((prod) => (
          <ProductItem product={prod} />
        ))}

     
    </div>
    </Layout>
  )
}

export async function getServerSideProps() {
  await db.connect();
  const products = await Product.find().lean();
  return {
    props:{ products: products.map(db.convertDocToObj)}
  }
}