'use client'
import 'tailwindcss/tailwind.css';
import { useState, ChangeEvent } from 'react';


const Editor: React.FC = () => {
    const [images, setImages] = useState<{ image1: string | null, image2: string | null }>({ image1: null, image2: null })

    const handleFileInput = (event: ChangeEvent<HTMLInputElement>, imageKey: 'image1' | 'image2') => {
        const file = event.target.files?.[0]

        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader()

            reader.onload = function (e) {
                const src = e.target?.result as string;
                setImages(prevImages => ({ ...prevImages, [imageKey]: src }))
            }
            reader.readAsDataURL(file)
        }
    }


    return (
        <>
            <form className="bg-pink-300 p-4">
                <div className="flex mb-4 justify-center">
                    <div className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                        {images.image1 ? (
                            <img className="w-full h-full object-cover" src={images.image1} alt='image1' />
                        ) : (
                            <label htmlFor="file1" className="flex flex-col items-center justify-center w-full h-full cursor-pointer">
                                <span>Upload Image 1</span>
                            </label>
                        )}
                        <input id="file1" className="hidden" type="file" name="file1" onChange={(e) => handleFileInput(e, 'image1')} accept="image/*" />
                    </div>
                    <div className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                        {images.image2 ? (
                            <img className="w-full h-full object-cover" src={images.image2} alt='image2' />
                        ) : (
                            <label htmlFor="file2" className="flex flex-col items-center justify-center w-full h-full cursor-pointer">
                                <span>Upload Image 2</span>
                            </label>
                        )}
                        <input id="file2" className="hidden" type="file" name="file2" onChange={(e) => handleFileInput(e, 'image2')} accept="image/*" />
                    </div>
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