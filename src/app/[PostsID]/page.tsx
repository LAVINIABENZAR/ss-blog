'use client'
import React from "react";
import 'tailwindcss/tailwind.css';
import { getPosts } from "@/utils/getPosts";
import { useState, useEffect } from "react";
import { Post } from "@/utils/postInterface";

const Posts = ({params}: {params: {PostsID: string}}) => {
   
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
            <div  key={post.id} className="p-7 bg-slate-400"> 
            <div>
              {post.title}
            </div>
            <h2>from</h2>
            <div>
              {post.movie}
            </div>
            <h2>Product ID {post.id}</h2>
            </div>
          ))}
        </>
      );

  };
  
  export default Posts;