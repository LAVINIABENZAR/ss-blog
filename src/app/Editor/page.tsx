'use client'
import 'tailwindcss/tailwind.css';
import ImagesInputs from '@/components/imagesInputs';

function Editor() {


    return (
        <>
            <form className="bg-pink-300 p-4">
                <div className="flex mb-4 justify-center">
                     <ImagesInputs/>
                </div>

                <div className="flex mb-4 justify-center">
                    <label className="block mb-2" htmlFor="text">Title</label>
                    <input className=" w-90" type="text" />
                </div>
                <div className="flex mb-4 justify-center">
                    <label className="block mb-2" htmlFor="text">From Movie / Book Name</label>
                    <input className="w-90" type="text" />
                </div>
                <div className="flex mb-4">
                    <label className="block mb-2 mr-8" htmlFor="text">Ingredients</label>
                    <input className="w-full" type="text" />
                    <button className="mt-2">Add Ingredient</button>
                </div>
                <div className="flex mb-4">
                    <label className="block mb-2 mr-8" htmlFor="text">Instructions</label>
                    <input className="w-full" type="text" />
                    <button className="mt-2">Add Instruction</button>
                </div>
                <button className='bg-purple-400 text-white hover:bg-purple-600 font-bold py-2 px-4 mt-3 rounded items-center'>Post</button>

            </form>
        </>
    )
}

export default Editor