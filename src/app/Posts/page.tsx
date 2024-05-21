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
    instructions: { text: string, image: string }[];
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
                <img src={post.image1} alt="image" width={200}/>
                <h3>Ingredients:</h3>
                <ul>
                  {post.ingredients.map((ingredient) => (
                    <li>{ingredient}</li>
                  ))}
                </ul>
                <h3>Instructions</h3>
                <ul>
                    {post.instructions.map((instruction) => (
                        <>
                        <li>{instruction.text}</li>
                        <img src={instruction.image} width={200}  />
                        </>
                    ))}
                </ul>
            </div>
        ))}
        </>
    )
}