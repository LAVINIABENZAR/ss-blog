'use client'
import React, { useEffect, useState } from "react";
import { PostgrestResponse, createClient } from "@supabase/supabase-js";

const URL = process.env.NEXT_PUBLIC_URL || ''
const API = process.env.NEXT_PUBLIC_API || ''
const supabase = createClient(URL, API)

interface Posts {
    id: number,
    image1: string;
    image2: string;
    title: string;
    movie: string;
    ingredients: string[];
    instructions: string[];
    description: string
}

export default function Posts() {
    const [posts, setPosts] = useState<Posts[]>([])

    useEffect(() => {
        getPosts()
    }, [])

    async function getPosts() {
        const {data}: PostgrestResponse<Posts> = await supabase
         .from('articles')
         .select()
         setPosts(data || [])
    } 

    return(
        <>
        {posts.map((post) => (
            <div>
                <h2>
                    {post.title}
                </h2>
                <span>from</span>
                <h3>
                    {post.movie}
                </h3>
                <section>
                    {post.description}
                </section>
                <img src={post.image1} alt="image"/>
                <ul>
                  {post.ingredients.map((ingredient) => (
                    <li>{ingredient}</li>
                  ))}
                </ul>
                <ul>
                    {post.instructions.map((instruction) => (
                        <li>{instruction}</li>
                    ))}
                </ul>
            </div>
        ))}
        </>
    )
}