'use client'
import React from "react";
import type { GetStaticProps } from "next";
import 'tailwindcss/tailwind.css';
import { getPosts } from "@/utils/getPosts";
import { useState, useEffect } from "react";
import { Post } from "@/utils/postInterface";
import Link from "next/link";




const Posts = ({params}: {params: {PostsID: string}}) => {
   
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

  const {PostsID} = params
    const fetchPosts = async () => {
      try {
        const data = await getPosts();
        setPosts(data);
      } catch (error: unknown) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    useEffect(() => {
        fetchPosts();
      }, [PostsID]);
    
      if (loading) {
        return <div>Loading...</div>;
      }
    
  
      return (
        <>
        {posts.map((post) => (
            <Link href={`/Post/${post.id}`} key={post.id}>
                <div className="p-7 bg-slate-400">
                    <div>{post.title}</div>
                    <h2>from</h2>
                    <div>{post.movie}</div>
                    <h2>Product ID {post.id}</h2>
                </div>
            </Link>
        ))}
    </>
      );

  };

  export async function GetStaticProps() {
    const posts = await getPosts()
   return {
    props: {
       posts
    }
   }
  }
  
  export default Posts;