"use client";

import React, { useState } from 'react';
import { usePostEntity } from '@/APIs';
import { Iitem } from '../../types/itemsTypes';
import { toast } from 'react-hot-toast';
import { uploadAsset } from '@/utils/assetsUpload';

export default function Dashboard() {
  const [formData, setFormData] = useState<Partial<Iitem>>({
    name: '',
    type: 'TRAVEL_PACKAGE',
    description: '',
    price: 0,
    location: '',
    duration: 0,
    amenities: [],
    images: [],
    isAvailable: true
  });

  const [isUploading, setIsUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string>('');

  const createItem = usePostEntity<Iitem, Partial<Iitem>>('items');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.images?.length) {
      toast.error('Please upload an image');
      return;
    }
    createItem.mutate(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'price' || name === 'duration' ? Number(value) : value
    }));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsUploading(true);
      const result = await uploadAsset(file);
      setFormData(prev => ({
        ...prev,
        images: [result.secure_url]
      }));
      setPreviewUrl(result.secure_url);
      toast.success('Image uploaded successfully');
    } catch (error) {
      toast.error('Failed to upload image');
      console.error('Upload error:', error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-900 to-black p-8">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold text-black mb-6">Add New Item</h1>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-black mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 border rounded text-black"
              required
            />
          </div>

          <div>
            <label className="block text-black mb-1">Type</label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="w-full p-2 border rounded text-black"
              required
            >
              <option value="TRAVEL_PACKAGE">Travel Package</option>
              <option value="PROPERTY">Property</option>
            </select>
          </div>

          <div>
            <label className="block text-black mb-1">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full p-2 border rounded text-black"
              required
            />
          </div>

          <div>
            <label className="block text-black mb-1">Price</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="w-full p-2 border rounded text-black"
              required
            />
          </div>

          <div>
            <label className="block text-black mb-1">Location</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full p-2 border rounded text-black"
            />
          </div>

          <div>
            <label className="block text-black mb-1">Duration (days)</label>
            <input
              type="number"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              className="w-full p-2 border rounded text-black"
            />
          </div>

          <div>
            <label className="block text-black mb-1">Image</label>
            <div className="space-y-2">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="w-full p-2 border rounded text-black"
                disabled={isUploading}
              />
              {isUploading && (
                <p className="text-sky-400">Uploading image...</p>
              )}
              {previewUrl && (
                <div className="mt-2">
                  <img 
                    src={previewUrl} 
                    alt="Preview" 
                    className="w-32 h-32 object-cover rounded"
                  />
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              name="isAvailable"
              checked={formData.isAvailable}
              onChange={(e) => setFormData(prev => ({ ...prev, isAvailable: e.target.checked }))}
              className="mr-2"
            />
            <label className="text-black">Available</label>
          </div>

          <button
            type="submit"
            className="w-full bg-sky-400 text-white py-2 px-4 rounded hover:bg-sky-500 transition-colors"
            disabled={createItem.isPending || isUploading}
          >
            {createItem.isPending ? 'Creating...' : 'Create Item'}
          </button>
        </form>
      </div>
    </div>
  );
}