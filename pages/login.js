import React from 'react'
import Layout from '../components/Layout';
import {useForm} from 'react-hook-form';
import { signIn } from 'next-auth/react';

export default function LoginScreen() {
    
    const {
        handleSubmit,
        register,
    } = useForm();

    const submitHandler = async ({email, password}) => {
        try {
            const result = await signIn('credentials', {redirect: false, email, password});

        } catch (error) {
            console.log(error);
        }
    }
  return (
        <Layout title='Login'>
            <form className='mx-auto max-w-screen-md' onSubmit={handleSubmit(submitHandler)}>
                <h1 className='mb-4 text-xl'>Login</h1>
                <div className='mb-4'>
                    <label htmlFor='email'>Email</label>
                    <input 
                        type='email'
                        className='w-full'
                        id='email'
                        autoFocus
                        {...register('email',{required: "Please enter email"})}
                        ></input>
                </div>
                <div>
                    <label>Password</label>
                    <input 
                        type='password'
                        className='w-full'
                        id='email'
                        autoFocus
                        {...register('password', {required: "Please enter password"})}
                        ></input>
                </div>
                <div className='mb-4'>
                    <button className='primary-button mt-4'>Login</button>
                </div>
            </form>
        </Layout>

    
  )
}
