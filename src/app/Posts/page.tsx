'use client'
import React from "react";
import { getPosts } from "@/utils/getPosts";
import { useState, useEffect } from "react";
import { Post } from "@/utils/postInterface";

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
    
    
  };
  
  export default Posts;