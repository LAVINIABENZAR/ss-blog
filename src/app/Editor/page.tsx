'use client'
import 'tailwindcss/tailwind.css';
import ImagesInputs from '@/components/imagesInputs';
import { SupabaseClient, createClient } from '@supabase/supabase-js';

const URL = process.env.NEXT_PUBLIC_URL || ''
const API = process.env.NEXT_PUBLIC_API || ''
const supabase: SupabaseClient = createClient(URL, API)

function Editor() {
    return (
        <>
            <form className="bg-pink-100 p-4">
                <div className="flex mb-4 justify-center">
                     <ImagesInputs/>
                </div>
                <div className='flex flex-col'>
                <div className="flex mb-4 justify-center">
                    <label className="block mb-2 mr-3 font-semibold text-lg" htmlFor="text">Title</label>
                    <input className=" w-90" type="text" />
                </div> 
                <div className='text-center'>from</div>
                <div className="flex mt-3 mb-4 justify-center">
                    <label className="block mb-2 mr-3 font-semibold text-lg" htmlFor="text"> Movie / Book Name</label>
                    <input  type="text" />
                </div>
                </div>
                
                <div className="flex flex-col mb-4 place-items-center">
                    <label className="block mb-2 mr-8 text-center font-medium mt-10 text-2xl text-gray-800" htmlFor="text">INGREDIENTS :</label>
                    <input className='w-2/6' type="text" />
                    <button className="bg-purple-300 w-40 text-white hover:bg-purple-200 font-bold py-2 px-4 mt-3 rounded items-center">Add Ingredient</button>
                </div>
                <div className="flex flex-col mb-4 place-items-center">
                    <label className="block mb-2 mr-8 text-center mt-10 font-medium text-gray-800 text-2xl" htmlFor="text">INSTRUCTIONS :</label>
                    <input className=' w-2/6'  type="text" />
                    <button className="bg-purple-300 w-40 text-white hover:bg-purple-200 font-bold py-2 px-4 mt-3 rounded items-center">Add Instruction</button>
                </div>
                <div className='flex justify-end m-9'>
                <button className='bg-gray-500 w-1/5 text-white hover:bg-purple-600 font-bold py-2 px-4 mt-3 border-white rounded-xl '>Post</button>
                </div>
            </form>
        </>
    )
}

export default Editor