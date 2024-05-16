import 'tailwindcss/tailwind.css';
import React, { useState, useEffect } from 'react';

interface ImagesInputsProps {
    onImageChange: (imageKey: 'image1' | 'image2', src: string) => void;
    images: { image1: string; image2: string };
}

function ImagesInputs({ onImageChange, images }: ImagesInputsProps) {
    const handleFileInput = (event: React.ChangeEvent<HTMLInputElement>, imageKey: 'image1' | 'image2') => {
        const file = event.target.files?.[0];
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = function (e) {
                const src = e.target?.result as string;
                onImageChange(imageKey, src);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <>
            <div className='flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100'>
                {images.image1 ? (
                    <img className='w-full h-full object-cover' src={images.image1} alt='image 1' />
                ) : (
                    <label htmlFor="file1" className='flex flex-col items-center justify-center w-full h-full cursor-pointer'>
                        <span>Upload Image 1</span>
                    </label>
                )}
                <input type="file" id='file1' className='hidden' name='file1' onChange={(e) => handleFileInput(e, 'image1')} accept='image/*' />
            </div>
            <div className='flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100'>
                {images.image2 ? (
                    <img className='w-full h-full object-cover' src={images.image2} alt='image 2' />
                ) : (
                    <label htmlFor="file2" className='flex flex-col items-center justify-center w-full h-full cursor-pointer'>
                        <span>Upload Image 2</span>
                    </label>
                )}
                <input type="file" id='file2' className='hidden' name='file2' onChange={(e) => handleFileInput(e, 'image2')} accept='image/*' />
            </div>
        </>
    );
}

export default ImagesInputs;


