'use client'
import React, { useEffect, useState } from "react";
import 'tailwindcss/tailwind.css';
import { getPosts } from "@/utils/getPosts";
import { Post } from "@/utils/postInterface";
import Link from "next/link";
 

const Posts = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

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
    }, []);
    
    if (loading) {
      return <div>Loading...</div>;
    }

    return (
      <>
        {posts.map((post) => (
          <Link href={`/Posts/${post.id}`} key={post.id}>
            <div className="p-7 bg-slate-400">
              <div>{post.title}</div>
              <h2>from</h2>
              <div>{post.movie}</div>
              <h2>Product ID {post.id}</h2>
            </div></Link>
            
        ))}
      </>
    );
};

export default Posts;
