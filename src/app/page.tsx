'use client'
import 'tailwindcss/tailwind.css';
import React from "react";
import Link from 'next/link';
import { Post } from '@/utils/postInterface';
// import PostsPage from '@/components/postsPage';

interface PostListProps {
  posts: Post[];
}


export default function Home({posts}: PostListProps) {
  return (
    <div className=' bg-slate-200'>
  
      <Link href='/Editor'><button className=' bg-red-200 p-5'>EDITOR</button></Link>
      <Link href='/Posts'><button className=' bg-red-200 p-5'>POSTS</button></Link>
    </div>
  );
}
