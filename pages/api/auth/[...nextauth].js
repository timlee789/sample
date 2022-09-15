import React from 'react';
import NextAuth from 'next-auth/next';
import CredentialsProvider  from 'next-auth/providers/credentials';
import GoodleProvider  from 'next-auth/providers/google';
import db from '../../../utils/db';
import User from '../../../models/Users';
import bcryptjs from 'bcryptjs';


export default NextAuth ({
    session: {
        strategy: 'jwt',
    },
    callbacks: {
            async jwt({token, user}) {
                if(user?._id) token._id = user._id;
                if(user?.isAdmin) token.isAdmin = user.isAdmin;
                return token;
            },
            async session({session, token}) {
                if(token?._id) session.user._id = token._id;
                if(token?.isAdmin) session.user.isAdmin = token.isAdmin;
                return session;
            }
    },
    providers: [
            CredentialsProvider({
                async authorize(credentials) {
                    await db.connect();
                    const user = await User.findOne({
                        email: credentials.email,
                    });
                    await db.disconnect();
                    if(user && bcryptjs.compareSync(credentials.password, user.password)) {
                        return {
                            _id: user._id,
                            name: user.name,
                            email: user.email,
                            image: "f",
                            isAdmin: user.isAdmin,
                        }
                    }
                    throw new Error('Invalid email or password')
                }
            }),
            // GoodleProvider({
            //     clientId: process.env.GOOGLE_ID,
            //     clientSecret: process.env.GOOGLE_SECRET,
            //     authorization: {
            //         params: {
            //             prompt: "consent",
            //             access_type: "offline",
            //             response_type: "code"
            //         }
            //     }
            // })
    ]
})
