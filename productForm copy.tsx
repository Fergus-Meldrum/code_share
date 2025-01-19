import Image from 'next/image';
import {Dispatch, SetStateAction, useEffect, useState} from 'react';

import {IProduct} from '@/app/services/productService';

interface ProductFormProps {
    onUpdate: Dispatch<SetStateAction<IProduct>>;
}

const ProductForm = ({onUpdate}: ProductFormProps) => {
    const usePrice = (initialPrice: number) => {
        const [price, setPrice] = useState<number>(initialPrice);

        const updatePrice = (value: number) => {
            setPrice(Number(value.toFixed(2)));
        };

        return [price, updatePrice] as const;
    };

    const [selectedImage, setSelectedImage] = useState<string>('');
    const [productName, setProductName] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [price, setPrice] = usePrice(0);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setSelectedImage(imageUrl);
        }
    };

    useEffect(() => {
        onUpdate({
            name: productName,
            image: selectedImage,
            description: description,
            price: price,
        });
    }, [selectedImage, productName, description, price, onUpdate]);

    return (
        <div className='flex flex-col gap-4'>
            <div className='relative h-64 w-64 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center'>
                <input
                    type='file'
                    accept='image/*'
                    onChange={handleImageChange}
                    className='absolute inset-0 opacity-0 cursor-pointer z-10'
                />

                {selectedImage ? (
                    <Image
                        src={selectedImage}
                        alt='Selected product'
                        fill
                        className='object-contain p-1'
                    />
                ) : (
                    <div className='absolute inset-0 flex flex-col items-center justify-center text-gray-500'>
                        <svg
                            className='w-12 h-12 mb-2'
                            fill='none'
                            stroke='currentColor'
                            viewBox='0 0 24 24'
                        >
                            <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                strokeWidth={2}
                                d='M12 6v6m0 0v6m0-6h6m-6 0H6'
                            />
                        </svg>
                        <span>Click to upload image</span>
                    </div>
                )}
            </div>
            <input
                className='border-2 border-gray-300 rounded-md p-2'
                placeholder='Product name'
                type='text'
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
            ></input>
            <textarea
                className='border-2 border-gray-300 rounded-md p-2'
                placeholder='Short description'
                rows={2}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            <div className='relative '>
                <span className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500'>
                    $
                </span>
                <input
                    className='pl-6 p-2 border-2 border-gray-300 rounded-md w-full'
                    placeholder='0.00'
                    type='number'
                    min='0'
                    step='0.01'
                    value={price || ''}
                    onChange={(e) => {
                        const value =
                            e.target.value === '' ? 0 : Number(e.target.value);
                        setPrice(value);
                    }}
                />
            </div>
        </div>
    );
};

export default ProductForm;
