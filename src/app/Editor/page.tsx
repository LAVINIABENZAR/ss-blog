import 'tailwindcss/tailwind.css';

function Editor() {
    return (
        <>
            <div className="bg-pink-300 p-4">
                <div className="flex mb-4 justify-center">
                    <label htmlFor="file" className='flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600'></label>
                    <input id='file' className="mr-2 hidden" type="file" name="file" multiple />
                    <label htmlFor="file" className='flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600'></label>
                    <input id='file' className="mr-2 hidden" type="file" name="file" multiple />
                    
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
            </div>


        </>
    )
}

export default Editor