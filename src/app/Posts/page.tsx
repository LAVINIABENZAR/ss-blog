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
        </>
    )
}