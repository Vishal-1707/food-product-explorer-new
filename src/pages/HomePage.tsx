import React, { useState, useEffect } from 'react';
import { SearchBar } from '../components/SearchBar';
import { ProductCard } from '../components/ProductCard';
import { api } from '../services/api';
import { Product } from '../types/product';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Loader2 } from 'lucide-react';

const HomePage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  const loadProducts = async (reset = false) => {
    try {
      setLoading(true);
      setError(null);
      const newPage = reset ? 1 : page;
      const response = await api.searchProducts(searchQuery || 'food', newPage);
      
      setProducts(prev => reset ? response.products : [...prev, ...response.products]);
      setHasMore(response.products.length > 0);
      if (!reset) setPage(prev => prev + 1);
    } catch (err) {
      setError('Failed to load products. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts(true);
  }, [searchQuery]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setPage(1);
  };

  const handleBarcodeSearch = async (barcode: string) => {
    try {
      setLoading(true);
      setError(null);
      const product = await api.getProductByBarcode(barcode);
      setProducts([product]);
      setHasMore(false);
    } catch (err) {
      setError('Product not found. Please check the barcode and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8">Food Product Explorer</h1>
      
      <div className="mb-8">
        <SearchBar onSearch={handleSearch} onBarcodeSearch={handleBarcodeSearch} />
      </div>

      {error && (
        <div className="text-red-500 text-center mb-4">{error}</div>
      )}

      <InfiniteScroll
        dataLength={products.length}
        next={loadProducts}
        hasMore={hasMore}
        loader={
          <div className="flex justify-center py-4">
            <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
          </div>
        }
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.code} product={product} />
          ))}
        </div>
      </InfiniteScroll>

      {!loading && products.length === 0 && (
        <div className="text-center text-gray-500 mt-8">
          No products found. Try a different search term.
        </div>
      )}
    </div>
  );
};

export default HomePage;