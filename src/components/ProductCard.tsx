import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../types/product';
import { AlertCircle } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

const getNutritionGradeColor = (grade: string): string => {
  const grades: Record<string, string> = {
    'a': 'bg-green-500',
    'b': 'bg-lime-500',
    'c': 'bg-yellow-500',
    'd': 'bg-orange-500',
    'e': 'bg-red-500',
  };
  return grades[grade.toLowerCase()] || 'bg-gray-500';
};

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <Link to={`/product/${product.code}`} className="block">
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
        <div className="relative aspect-square">
          {product.image_url ? (
            <img
              src={product.image_url}
              alt={product.product_name}
              className="w-full h-full object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = 'https://images.unsplash.com/photo-1635321350281-e7330c94960e?w=400';
              }}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-100">
              <AlertCircle className="w-12 h-12 text-gray-400" />
            </div>
          )}
          <div className={`absolute top-2 right-2 w-8 h-8 ${getNutritionGradeColor(product.nutrition_grades)} rounded-full flex items-center justify-center text-white font-bold uppercase`}>
            {product.nutrition_grades || '?'}
          </div>
        </div>
        <div className="p-4">
          <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2">
            {product.product_name || 'Unknown Product'}
          </h3>
          <p className="text-sm text-gray-600 line-clamp-1">
            {product.categories || 'Uncategorized'}
          </p>
        </div>
      </div>
    </Link>
  );
};