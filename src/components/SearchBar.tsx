import React, { useState } from 'react';
import { Search, Barcode } from 'lucide-react';

interface SearchBarProps {
  onSearch: (query: string) => void;
  onBarcodeSearch: (barcode: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ onSearch, onBarcodeSearch }) => {
  const [searchType, setSearchType] = useState<'name' | 'barcode'>('name');
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    
    if (searchType === 'name') {
      onSearch(query);
    } else {
      onBarcodeSearch(query);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-3xl mx-auto">
      <div className="relative flex items-center">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          {searchType === 'name' ? (
            <Search className="h-5 w-5 text-gray-400" />
          ) : (
            <Barcode className="h-5 w-5 text-gray-400" />
          )}
        </div>
        <input
          type={searchType === 'barcode' ? 'number' : 'text'}
          className="block w-full pl-10 pr-32 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder={searchType === 'name' ? "Search products..." : "Enter barcode..."}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <div className="absolute inset-y-0 right-0 flex items-center">
          <select
            className="h-full py-0 pl-2 pr-7 border-transparent bg-transparent text-gray-500 sm:text-sm rounded-md"
            value={searchType}
            onChange={(e) => setSearchType(e.target.value as 'name' | 'barcode')}
          >
            <option value="name">Name</option>
            <option value="barcode">Barcode</option>
          </select>
        </div>
      </div>
    </form>
  );
};