'use client'
import { useEffect, useState } from 'react';
import { getPosts } from '@/utils/getPosts';
import { Post } from '@/utils/postInterface';

interface BlogPostOrops {
  params: {
      Post: string
  }
} 

const PostDetails = ({params: {Post}}: BlogPostOrops) => {
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchPost = async (id: string) => {
    try {
      const data = await getPosts();
      console.log('data', data)
      const singlePost = data.find(post => post.id.toString() === id) || null;
      console.log('single post', singlePost)
      setPost(singlePost)
    } catch (error: unknown) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPost(Post)
  },[]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <div className="p-7 bg-slate-400">
      <div>{post.title}</div>
      <h2>from</h2>
      <div>{post.movie}</div>
      <br />
      <h2>Desscription</h2>
      <div>{post.description}</div>
      <h2>Product ID {post.id}</h2>
    </div>
  );
};

export default PostDetails;
