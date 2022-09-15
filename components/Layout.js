import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';
import {Menu} from '@headlessui/react';
import DropdownLink from './DropdownLink';
import { Cookies } from 'js-cookie';

function Layout({children, title}) {
    const { status, data: session } = useSession();
    const logoutClickHandler = () => {
        signOut({callbackUrl: '/login'});
        Cookies.remove('cart');
       // dispatch({type: "CART_RESET"})
    }
  return (
    <div>
        <Head>
            <title>{title ? title + '-TimLee' : 'TIMLEE'}</title>
        </Head>
        <div className='flex min-h-screen flex-col jsutify-between'>
            <header>
                <nav className='flex h-12 items-center px-5 justify-between shadow-md'>
                    <Link href='/'>
                        <a className='text-lg font-bold'>Logo</a>
                    </Link>
                    <div>
                        <Link href='./cart'>
                            <a className='px-4'>Cart</a>
                        </Link>
                        {status === 'loading' ? (
                            'Loading'
                        ) : session?.user ? (
                            <Menu as='div' className='relative inline-block'>
                                <Menu.Button className='text-blue-600'>
                                    {session.user.email}
                                </Menu.Button>
                                <Menu.Item className="absolute right-0 w-26 origin-top-right shadow-lg bg-white">
                                    {/* <Menu.Item>
                                        <DropdownLink className="dropdown-link" href='/profile'>
                                            Profile
                                        </DropdownLink>
                                    </Menu.Item>
                                    <Menu.Item>
                                        <DropdownLink className="dropdown-link" href='/order-history'>
                                            Order History
                                        </DropdownLink>
                                    </Menu.Item> */}
                                    <Menu.Item>
                                        <a className='dropdown-link' href='#' onClick={logoutClickHandler}>
                                            Logout
                                        </a>
                                    </Menu.Item>
                                </Menu.Item>
                            </Menu>
                        ) : (
                            <Link href="/login">
                                <a className='p-2'>
                                    Login
                                </a>
                            </Link>
                        )}
                    </div>

                </nav>
            </header>
            <main>
                {children}
            </main>
            <footer>
                Copyright 2022 BeautyElements
            </footer>
        </div>
    </div>
  )
}

export default Layout