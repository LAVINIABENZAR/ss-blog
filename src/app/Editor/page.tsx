'use client'
import 'tailwindcss/tailwind.css';
import React, { useState } from 'react';
import ImagesInputs from '@/components/imagesInputs';
import { supabase } from '@/utils/supabase';
// interfaces //
interface Articles {
    id: number;
    image1: string;
    title: string;
    movie: string;
    ingredients: string[];
    instructions: { text: string, image: string }[];
    description: string;
}

const Editor: React.FC = () => {
    const [article, setArticle] = useState<Articles>({
        id: 0,
        image1: '',
        title: '',
        movie: '',
        ingredients: [],
        instructions: [{ text: '', image: '' }],
        description: ''
    });

    // state //
    const [ingredientInputs, setIngredientInputs] = useState<string[]>(['']);
    const [instructionInputs, setInstructionInputs] = useState<{ text: string, image: string }[]>([{ text: '', image: '' }]);
    const [images, setImages] = useState<{ [key: string]: string }>({ image1: '' });


    // handle ingredients and instructions //
    const handleIngredientChange = (index: number, value: string) => {
        const newIngredientInputs = [...ingredientInputs];
        newIngredientInputs[index] = value;
        setIngredientInputs(newIngredientInputs);
    };

    const handleInstructionChange = (index: number, key: 'text' | 'image', value: string) => {
        const newInstructionInputs = [...instructionInputs];
        newInstructionInputs[index] = {
            ...newInstructionInputs[index],
            [key]: value
        };
        setInstructionInputs(newInstructionInputs);
    };
    
    const handleInstructionImageChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = function (e) {
                const src = e.target?.result as string;
                handleInstructionChange(index, 'image', src);
            };
            reader.readAsDataURL(file);
        }
    };

    const addIngredientInput = () => {
        setIngredientInputs([...ingredientInputs, '']);
    };

    const addInstructionInput = () => {
        setInstructionInputs([...instructionInputs, {text: '', image: ''}]);
    };
    
    const saveIngredients = () => {
        setArticle(prevArticle => ({
            ...prevArticle,
            ingredients: ingredientInputs.filter(input => input.trim() !== '')
        }));
    };
    
    const saveInstructions = () => {
        setArticle(prevArticle => ({
            ...prevArticle,
            instructions: instructionInputs.filter(input => input.text.trim() !== '' || input.image.trim() !== '')
        }));
    };
    
    // create article function //
    const createArticle = async () => {
        saveIngredients();
        saveInstructions();
        
        const latestArticle = {
            ...article,
            ingredients: ingredientInputs.filter(input => input.trim() !== ''),
            instructions: instructionInputs.filter(input => input.text.trim() !== '' || input.image.trim() !== '')
        };
    
        try {
            const { id, ...articleWithoutId } = latestArticle;
            console.log('creating article', articleWithoutId);
            const { data, error } = await supabase
            .from('articles')
            .insert([articleWithoutId]);
            if (error) {
                console.error('Error inserting data', error.message);
            } else {
                console.log('Data inserted successfully', data);
                setArticle({
                    id: 0,
                    image1: '',
                    title: '',
                    movie: '',
                    ingredients: [],
                    instructions: [{ text: '', image: '' }],
                    description: ''
                });
                setIngredientInputs(['']);
                setInstructionInputs([{ text: '', image: '' }]);
                setImages({ image1: '' });
            }
        } catch (error: unknown) {
            console.error('Error', error as Error);
        }
    };

    // handle events //
    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setArticle(prevArticle => ({
            ...prevArticle,
            [name]: value
        }));
    };
    
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        createArticle();
    };

    const handleImageChange = (imageKey: string, src: string) => {
        setImages(prevImages => ({
            ...prevImages,
            [imageKey]: src
        }));
        setArticle(prevArticle => ({
            ...prevArticle,
            [imageKey]: src
        }));
    };

    return (
        <>
            <form className="bg-pink-100 p-4" onSubmit={handleSubmit}>
                <div className='flex flex-col'>
                    <div className="flex mb-4 justify-center">
                        <label className="block mb-2 mr-3 font-semibold text-lg" htmlFor="title">Title</label>
                        <input className="w-90 border-2 border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" type="text" id='title' name='title' value={article.title} onChange={handleChange} />
                    </div>
                    <div className='text-center'>from</div>
                    <div className="flex mt-3 mb-4 justify-center">
                        <label className="block mb-2 mr-3 font-semibold text-lg" htmlFor="movie">Movie / Book Name</label>
                        <input className='border-2 border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent' type="text" id='movie' name='movie' value={article.movie} onChange={handleChange} />
                    </div>
                </div>
                <section className='flex flex-col items-center justify-center mb-3'>
                    <label htmlFor="description">Description</label>
                    <textarea className="w-90 border-2 border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent h-44 w-5/12" name="description" id="description" value={article.description} onChange={handleChange}></textarea>
                </section>
                <ImagesInputs onImageChange={handleImageChange} images={images} />
    
                <div className="flex flex-col mb-4 place-items-center">
                    <label className="block mb-2 mr-8 text-center font-medium mt-10 text-2xl text-gray-800" htmlFor="ingredients">INGREDIENTS :</label>
                    {ingredientInputs.map((input, index) => (
                        <div key={index} className="mb-2">
                            <input
                                className='border-2 w-full border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                                type="text"
                                value={input}
                                onChange={(e) => handleIngredientChange(index, e.target.value)}
                            />
                        </div>
                    ))}
                    <button type='button' onClick={addIngredientInput} className="bg-purple-300 w-40 text-white hover:bg-purple-200 font-bold py-2 px-4 mt-3 rounded items-center">Add Ingredient</button>
                </div>
    
                <div className="flex flex-col mb-4 place-items-center">
                    <label className="block mb-2 mr-8 text-center mt-10 font-medium text-gray-800 text-2xl" htmlFor="instructions">INSTRUCTIONS :</label>
                    {instructionInputs.map((input, index) => (
                        <div key={index} className="mb-2">
                            <input
                                className=' border-2 w-60 border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                                type="text"
                                value={input.text}
                                onChange={(e) => handleInstructionChange(index, 'text', e.target.value)}
                            />
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => handleInstructionImageChange(index, e)}
                                className='border-2 border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                            />
                            {input.image && <img width={300} src={input.image} alt={`instruction-${index}`} className="mt-2" />}
                        </div>
                    ))}
                    <button type='button' onClick={addInstructionInput} className="bg-purple-300 w-40 text-white hover:bg-purple-200 font-bold py-2 px-4 mt-3 rounded items-center">Add Instruction</button>
                </div>
    
                <div className='flex justify-end m-9 bg-pink-100'>
                    <button type='submit' className='bg-gray-500 w-1/5 text-white hover:bg-purple-600 font-bold py-2 px-4 mt-3 border-white rounded-xl'>Post</button>
                </div>
            </form>
        </>
    );
    
};

export default Editor;
