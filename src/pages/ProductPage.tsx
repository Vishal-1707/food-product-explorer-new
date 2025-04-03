import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { api } from '../services/api';
import { Product } from '../types/product';
import { ArrowLeft, AlertCircle, Loader2 } from 'lucide-react';

const ProductPage: React.FC = () => {
  const { barcode } = useParams<{ barcode: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProduct = async () => {
      if (!barcode) return;
      
      try {
        setLoading(true);
        const data = await api.getProductByBarcode(barcode);
        setProduct(data);
      } catch (err) {
        setError('Failed to load product details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [barcode]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="w-12 h-12 animate-spin text-blue-500" />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <div className="flex flex-col items-center gap-4">
          <AlertCircle className="w-16 h-16 text-red-500" />
          <p className="text-xl text-gray-600">{error || 'Product not found'}</p>
          <Link to="/" className="text-blue-500 hover:underline flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Link to="/" className="inline-flex items-center text-blue-500 hover:underline mb-8">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Products
      </Link>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="md:flex">
          <div className="md:w-1/2">
            <img
              src={product.image_url || 'https://images.unsplash.com/photo-1635321350281-e7330c94960e?w=800'}
              alt={product.product_name}
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="md:w-1/2 p-8">
            <h1 className="text-3xl font-bold mb-4">{product.product_name}</h1>
            
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">Categories</h2>
              <p className="text-gray-600">{product.categories || 'No categories available'}</p>
            </div>

            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">Nutrition Grade</h2>
              <div className={`inline-block px-4 py-2 rounded-full text-white font-bold ${
                product.nutrition_grades?.toLowerCase() === 'a' ? 'bg-green-500' :
                product.nutrition_grades?.toLowerCase() === 'b' ? 'bg-lime-500' :
                product.nutrition_grades?.toLowerCase() === 'c' ? 'bg-yellow-500' :
                product.nutrition_grades?.toLowerCase() === 'd' ? 'bg-orange-500' :
                product.nutrition_grades?.toLowerCase() === 'e' ? 'bg-red-500' :
                'bg-gray-500'
              }`}>
                {product.nutrition_grades?.toUpperCase() || 'Not Available'}
              </div>
            </div>

            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">Nutritional Values (per 100g)</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded">
                  <p className="text-gray-600">Energy</p>
                  <p className="font-semibold">{product.nutriments?.energy_100g || 0} kcal</p>
                </div>
                <div className="bg-gray-50 p-4 rounded">
                  <p className="text-gray-600">Fat</p>
                  <p className="font-semibold">{product.nutriments?.fat_100g || 0}g</p>
                </div>
                <div className="bg-gray-50 p-4 rounded">
                  <p className="text-gray-600">Carbohydrates</p>
                  <p className="font-semibold">{product.nutriments?.carbohydrates_100g || 0}g</p>
                </div>
                <div className="bg-gray-50 p-4 rounded">
                  <p className="text-gray-600">Proteins</p>
                  <p className="font-semibold">{product.nutriments?.proteins_100g || 0}g</p>
                </div>
              </div>
            </div>

            {product.ingredients_text && (
              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2">Ingredients</h2>
                <p className="text-gray-600">{product.ingredients_text}</p>
              </div>
            )}

            {product.labels && (
              <div>
                <h2 className="text-xl font-semibold mb-2">Labels</h2>
                <div className="flex flex-wrap gap-2">
                  {product.labels.split(',').map((label, index) => (
                    <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                      {label.trim()}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;