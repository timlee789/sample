import React from 'react'
import Product from '../../models/Product';
import db from '../../utils/db';
import Layout from '../../components/Layout';
import Link from 'next/link';
import Image from 'next/Image';

function ProductScreen({product}) {
  const addToCartHandler = () => {

  }
  console.log(product)
  return (
    <Layout title={product.name}>
        <div className='py-2'>
            <Link href='/' >Back to Home</Link>
        </div>
        <div className='grid md:grid-cols-4 md:gap-3'>
                <div className='md:col-span-2'>
                        <Image src={product.image} alt={product.name} width={640} height={800} layout='responsive'></Image>
                </div>
                <div>
                    <ul>
                        <li><h1 className='text-2xl mb-5'>{product.name}</h1></li>
                        <li>{product.rating} of { product.numReviews} reviews</li>
                        <li>Category: {product.category}</li>    
                        <li>Brand: {product.brand}</li>
                        <li>description: {product.description}</li>
                        <li>
                        </li>
                    </ul>
               
                  {/* <select value={selected} onChange={handleChange} className='my-10'>
                    {options.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.text}
                        </option>
                    ))}
                  </select> */}
                </div>
                <div>
                    <div className='card p-5'>
                        <div className='mb-2 flex justify-between'>
                            <div>Price</div>
                            <div>${product.price}</div>
                        </div>
                        <div className='mb-2 flex justify-between'>
                            <div>Status</div>
                            <div>{product.countInStock > 0 ? 'In Sotck' : 'Unavailable'}</div>
                        </div>
                        <button className='primary-button w-full' onClick={addToCartHandler}>Add to Cart</button>
                    </div>
                </div>
        </div>
    </Layout>
  )
}

export async function getServerSideProps(context) {
    const {params} = context;
    const {_id} = params;
    await db.connect();
    const product = await Product.findOne({_id}).lean();
    await db.disconnect();
    
    return {
        props: {
            product: product ? db.convertDocToObj(product) : null,
        }
    }
}

export default ProductScreen