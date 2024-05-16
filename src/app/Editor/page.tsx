'use client'
import 'tailwindcss/tailwind.css';
import { useState } from 'react';
import ImagesInputs from '@/components/imagesInputs';
import { SupabaseClient, createClient } from '@supabase/supabase-js';

const URL = process.env.NEXT_PUBLIC_URL || ''
const API = process.env.NEXT_PUBLIC_API || ''
const supabase: SupabaseClient = createClient(URL, API)

interface Articles {
    id: number;
    image1: string;
    image2: string;
    title: string;
    movie: string;
    ingredients: string[];
    instructions: string[];
}


function Editor() {
    const [article, setArticle] = useState<Articles>({
        id: 0,
        image1: '',
        image2: '',
        title: '',
        movie: '',
        ingredients: [],
        instructions: []
    });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target
        setArticle(prevArticle => ({
            ...prevArticle,
            [name]: value
        }))
    }

    const addIngredient = () => {
        const ingredientInput = document.getElementById('ingredient-input') as HTMLInputElement
        if (ingredientInput && ingredientInput.value) {
            setArticle(prevArticle => ({
                ...prevArticle,
                ingredients: [...prevArticle.ingredients, ingredientInput.value]
            }))
            ingredientInput.value = ''
        }
    }


    const AddInstruction = () => {
        const instructionInput = document.getElementById('instruction-input') as HTMLInputElement
        if (instructionInput && instructionInput.value) {
            setArticle(prevArticle => ({
                ...prevArticle,
                instructions: [...prevArticle.instructions, instructionInput.value]
            }))
            instructionInput.value = ''
        }
    }


    const createArticle = async () => {
        try {
            console.log('creating article', article)
            const { data, error } = await supabase
                .from('articles')
                .insert([article]);
            if (error) {
                console.error('Error inserting data', error.message)
            } else {
                console.log('Data inserted successfuly', data)
                setArticle({
                    id: 0,
                    image1: '',
                    image2: '',
                    title: '',
                    movie: '',
                    ingredients: [],
                    instructions: []
                })
            }
        } catch (error: unknown) {
            console.error('Error', error as Error)
        }
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        createArticle()
    }


    return (
        <>
            <form className="bg-pink-100 p-4" onSubmit={handleSubmit}>
                <div className="flex mb-4 justify-center">
                    <ImagesInputs />
                </div>
                <div className='flex flex-col'>
                    <div className="flex mb-4 justify-center">
                        <label className="block mb-2 mr-3 font-semibold text-lg" htmlFor="title">Title</label>
                        <input className=" w-90" type="text" id='title' name='title' value={article.title} onChange={handleChange} />
                    </div>
                    <div className='text-center'>from</div>
                    <div className="flex mt-3 mb-4 justify-center">
                        <label className="block mb-2 mr-3 font-semibold text-lg" htmlFor="movie"> Movie / Book Name</label>
                        <input type="text" id='movie' name='movie' value={article.movie} onChange={handleChange} />
                    </div>
                </div>

                <div className="flex flex-col mb-4 place-items-center">
                    <label className="block mb-2 mr-8 text-center font-medium mt-10 text-2xl text-gray-800" htmlFor="ingredients">INGREDIENTS :</label>
                    <input itemID='ingredient-input' className='w-2/6' type="text" id='ingredients' name='ingredients' value={article.ingredients} onChange={handleChange} />
                    <button type='button' onClick={addIngredient} className="bg-purple-300 w-40 text-white hover:bg-purple-200 font-bold py-2 px-4 mt-3 rounded items-center">Add Ingredient</button>
                </div>
                <div className="flex flex-col mb-4 place-items-center">
                    <label className="block mb-2 mr-8 text-center mt-10 font-medium text-gray-800 text-2xl" htmlFor="text">INSTRUCTIONS :</label>
                    <input itemID='indtruction-input' className=' w-2/6' type="text" id='instructions' name='instructions' value={article.instructions} onChange={handleChange} />
                    <button type='button' onClick={AddInstruction} className="bg-purple-300 w-40 text-white hover:bg-purple-200 font-bold py-2 px-4 mt-3 rounded items-center">Add Instruction</button>
                </div>
                <div className='flex justify-end m-9 bg-pink-100'>
                    <button type='submit' className='bg-gray-500 w-1/5 text-white hover:bg-purple-600 font-bold py-2 px-4 mt-3 border-white rounded-xl'>Post</button>
                </div>
            </form>
        </>
    )
}

export default Editor