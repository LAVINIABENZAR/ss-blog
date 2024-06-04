import 'tailwindcss/tailwind.css';
import React, { useState } from 'react';

interface ImagesInputsProps {
    onImageChange: (imageKey: string, src: string) => void;
    images: { [key: string]: string };
}

const ImagesInputs: React.FC<ImagesInputsProps> = ({ onImageChange, images }) => {
    const handleFileInput = (event: React.ChangeEvent<HTMLInputElement>, imageKey: string) => {
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
        <div className="flex justify-center flex-wrap gap-4">
            {Object.keys(images).map(imageKey => (
                <div key={imageKey} className='flex flex-col items-center justify-center w-fit h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100'>
                    {images[imageKey] ? (
                        <img className='w-full h-full object-contain' src={images[imageKey]} alt={imageKey} />
                    ) : (
                        <label htmlFor={imageKey} className='flex flex-col items-center justify-center p-52 cursor-pointer'>
                            <span>Upload {imageKey}</span>
                        </label>
                    )}
                    <input type="file" id={imageKey} className='hidden' name={imageKey} onChange={(e) => handleFileInput(e, imageKey)} accept='image/*' />
                </div>
            ))}
        </div>
    );
};

export default ImagesInputs;



