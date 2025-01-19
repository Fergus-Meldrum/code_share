'use client';

import {useState} from 'react';

import {Modal} from '@/app/components/common/Modal';
import {addProduct, IProduct} from '@/app/services/productService';

import ProductForm from './productForm';

const AddProduct = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [product, setProduct] = useState<IProduct>({
        name: '',
        image: '',
        description: '',
        price: 0,
    });

    const handleSave = async () => {
        await addProduct(product);
    };

    return (
        <div>
            <button
                onClick={() => setIsModalOpen(true)}
                className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors'
            >
                Add a product
            </button>

            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleSave}
            >
                <ProductForm onUpdate={setProduct} />
            </Modal>
        </div>
    );
};

export default AddProduct;
