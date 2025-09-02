// src/components/ArtworkForm.js
import React, { useState } from 'react';
import { supabase } from '../supabaseClient';

const CATEGORY_OPTIONS = [
    'Sculpture',
    'Painting',
    'Mixed Media',
    'Digital',
    'Print',
    'Installation'
];

const MEDIUM_OPTIONS = [
    'Oil Paint',
    'Acrylic',
    'Digital',
    'Fabric',
    'Clay',
    'Ink'
];

const ArtworkForm = ({ onArtworkAdded, onCancel }) => {
    const [formData, setFormData] = useState({
        title: '',
        category: '',
        medium: '',
        description: '',
        price: '',
        isForSale: false,
        creationDate: new Date().toISOString().split('T')[0],
        imageUrl: ''
    });
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState(null);

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    // In your ArtworkForm.js, modify the handleSubmit function:
    const handleSubmit = async (e) => {
        e.preventDefault();
        setUploading(true);
        setError(null);

        // Basic validation
        if (!formData.title || !formData.category || !formData.medium) {
            setError('Please fill in all required fields (Title, Category, Medium)');
            setUploading(false);
            return;
        }

        try {
            // First insert into the main Artwork table
            const { data: artworkData, error: artworkError } = await supabase
                .from('Artwork')
                .insert([{
                    artwork_title: formData.title,
                    artwork_category: formData.category,
                    artwork_medium: formData.medium,
                    artwork_description: formData.description,
                    art_creation_date: formData.creationDate,
                    main_img: formData.imageUrl,
                    is_for_sale: formData.isForSale
                }])
                .select();

            if (artworkError) {
                console.error('Artwork table insert error:', artworkError);
                throw new Error(`Failed to save artwork: ${artworkError.message}`);
            }

            const newArtwork = artworkData[0];

            // If the artwork is for sale, also insert into artwork_shop table
            if (formData.isForSale) {
                const { error: shopError } = await supabase
                    .from('artwork_shop')
                    .insert([{
                        artwork_id: newArtwork.artwork_id,
                        artwork_title: formData.title,
                        artwork_category: formData.category,
                        artwork_medium: formData.medium,
                        artwork_description: formData.description,
                        art_creation_date: formData.creationDate,
                        main_img: formData.imageUrl,
                        artwork_price: formData.price || 0
                    }]);

                if (shopError) {
                    console.error('Artwork_shop table insert error:', shopError);
                    console.warn('Artwork saved but could not add to shop:', shopError.message);
                } else {
                    // Add to the new artworks queue if it's for sale
                    // This will be handled by the parent component through onArtworkAdded
                }
            }

            // Notify parent component with the complete artwork data including shop info
            const completeArtwork = {
                ...newArtwork,
                artwork_price: formData.isForSale ? (formData.price || 0) : 0
            };

            onArtworkAdded(completeArtwork);

            // Reset form
            setFormData({
                title: '',
                category: '',
                medium: '',
                description: '',
                price: '',
                isForSale: false,
                creationDate: new Date().toISOString().split('T')[0],
                imageUrl: ''
            });

        } catch (err) {
            console.error('Error adding artwork:', err);
            setError(err.message || 'An unexpected error occurred. Please try again.');
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="new-artwork-form-overlay">
            <div className="new-artwork-form">
                <h2>Add New Artwork</h2>
                {error && (
                    <div className="error-message">
                        <strong>Error:</strong> {error}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="title">Title *</label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={formData.title}
                            onChange={handleInputChange}
                            required
                            disabled={uploading}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="category">Category *</label>
                        <select
                            id="category"
                            name="category"
                            value={formData.category}
                            onChange={handleInputChange}
                            required
                            disabled={uploading}
                        >
                            <option value="">Select a category</option>
                            {CATEGORY_OPTIONS.map(cat => (
                                <option key={cat} value={cat}>{cat}</option>
                            ))}
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="medium">Medium *</label>
                        <select
                            id="medium"
                            name="medium"
                            value={formData.medium}
                            onChange={handleInputChange}
                            required
                            disabled={uploading}
                        >
                            <option value="">Select a medium</option>
                            {MEDIUM_OPTIONS.map(med => (
                                <option key={med} value={med}>{med}</option>
                            ))}
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="description">Description</label>
                        <textarea
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                            rows="3"
                            disabled={uploading}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="creationDate">Creation Date</label>
                        <input
                            type="date"
                            id="creationDate"
                            name="creationDate"
                            value={formData.creationDate}
                            onChange={handleInputChange}
                            disabled={uploading}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="imageUrl">Image URL (Optional)</label>
                        <input
                            type="url"
                            id="imageUrl"
                            name="imageUrl"
                            value={formData.imageUrl}
                            onChange={handleInputChange}
                            placeholder="https://example.com/image.jpg"
                            disabled={uploading}
                        />
                    </div>

                    <div className="form-group checkbox-group">
                        <label>
                            <input
                                type="checkbox"
                                name="isForSale"
                                checked={formData.isForSale}
                                onChange={handleInputChange}
                                disabled={uploading}
                            />
                            This artwork is for sale
                        </label>
                    </div>

                    {formData.isForSale && (
                        <div className="form-group">
                            <label htmlFor="price">Price (HKD) *</label>
                            <input
                                type="number"
                                id="price"
                                name="price"
                                value={formData.price}
                                onChange={handleInputChange}
                                min="0"
                                step="0.01"
                                required={formData.isForSale}
                                disabled={uploading}
                            />
                        </div>
                    )}

                    <div className="form-actions">
                        <button
                            type="button"
                            onClick={onCancel}
                            disabled={uploading}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={uploading}
                        >
                            {uploading ? 'Adding...' : 'Add Artwork'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ArtworkForm;