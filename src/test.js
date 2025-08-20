import './Works.css';
import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

// Keep your existing filter options
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

export default function Works() {
    // Existing state
    const [expandedSections, setExpandedSections] = useState({
        categories: false,
        medium: false
    });

    const [artworks, setArtworks] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState([]);
    const [selectedMedium, setSelectedMedium] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState('recommended');

    // 🔍 Toggle dropdown section visibility
    const toggleSection = (section) => {
        setExpandedSections(prev => ({
            ...prev,
            [section]: !prev[section]
        }));
    };

    // 🔢 Selection Sort implementation for date sorting
    const selectionSort = (arr, ascending = true) => {
        const sortedArray = [...arr];
        for (let i = 0; i < sortedArray.length - 1; i++) {
            let extremeIndex = i;
            for (let j = i + 1; j < sortedArray.length; j++) {
                const compareResult = new Date(sortedArray[j].created_at) - new Date(sortedArray[extremeIndex].created_at);
                if (ascending ? compareResult < 0 : compareResult > 0) {
                    extremeIndex = j;
                }
            }
            // Swap elements
            if (extremeIndex !== i) {
                [sortedArray[i], sortedArray[extremeIndex]] = [sortedArray[extremeIndex], sortedArray[i]];
            }
        }
        return sortedArray;
    };

    // 🎨 Filter and sort artworks
    const getFilteredAndSortedArtworks = () => {
        let filtered = [...artworks];

        // Apply search filter
        if (searchTerm) {
            filtered = filtered.filter(artwork =>
                artwork.artwork_title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                artwork.artwork_description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                artwork.artwork_category?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                artwork.artwork_medium?.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // Apply category filter
        if (selectedCategory.length > 0) {
            filtered = filtered.filter(artwork =>
                selectedCategory.includes(artwork.artwork_category)
            );
        }

        // Apply medium filter
        if (selectedMedium.length > 0) {
            filtered = filtered.filter(artwork =>
                selectedMedium.includes(artwork.artwork_medium)
            );
        }

        // Apply sorting
        switch (sortBy) {
            case 'newest':
                filtered = selectionSort(filtered, false);
                break;
            case 'oldest':
                filtered = selectionSort(filtered, true);
                break;
            default:
                break;
        }

        return filtered;
    };

    const fetchArtworks = async () => {
        try {
            setLoading(true);
            const { data, error } = await supabase
                .from('Artwork')
                .select('*');

            if (error) {
                throw error;
            }

            setArtworks(data || []);
        } catch (error) {
            setError(error.message);
            console.error('Error fetching artworks:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchArtworks();
    }, []);

    return (
        <div className="works-page">
            {/* Your existing gallery sections */}

            <div className="portfolio-container">
                <div className="portfolio-sidebar">
                    {/* Search Section */}
                    <div className="search-section">
                        <input
                            type="text"
                            placeholder="Search artworks..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="search-input"
                        />
                    </div>

                    {/* Sort Section */}
                    <div className="sort-section">
                        <h3>Sort</h3>
                        <div className="sort-options">
                            <label className="sort-option">
                                <input
                                    type="radio"
                                    name="sort"
                                    value="recommended"
                                    checked={sortBy === 'recommended'}
                                    onChange={() => setSortBy('recommended')}
                                />
                                <span>Recommended</span>
                            </label>
                            <label className="sort-option">
                                <input
                                    type="radio"
                                    name="sort"
                                    value="newest"
                                    checked={sortBy === 'newest'}
                                    onChange={() => setSortBy('newest')}
                                />
                                <span>Date Created: New to Old</span>
                            </label>
                            <label className="sort-option">
                                <input
                                    type="radio"
                                    name="sort"
                                    value="oldest"
                                    checked={sortBy === 'oldest'}
                                    onChange={() => setSortBy('oldest')}
                                />
                                <span>Date Created: Old to New</span>
                            </label>
                        </div>
                    </div>

                    {/* Filter Section */}
                    <div className="filter-section">
                        {/* Categories Filter */}
                        <div className="filter-dropdown">
                            <button
                                className="filter-header"
                                onClick={() => toggleSection('categories')}
                            >
                                <span>Categories</span>
                                <span className={`arrow ${expandedSections.categories ? 'expanded' : ''}`}>▼</span>
                            </button>
                            {expandedSections.categories && (
                                <div className="filter-content">
                                    {CATEGORY_OPTIONS.map(category => (
                                        <label key={category} className="filter-option">
                                            <input
                                                type="checkbox"
                                                checked={selectedCategory.includes(category)}
                                                onChange={(e) => {
                                                    if (e.target.checked) {
                                                        setSelectedCategory([...selectedCategory, category]);
                                                    } else {
                                                        setSelectedCategory(selectedCategory.filter(c => c !== category));
                                                    }
                                                }}
                                            />
                                            <span>{category}</span>
                                        </label>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Medium Filter */}
                        <div className="filter-dropdown">
                            <button
                                className="filter-header"
                                onClick={() => toggleSection('medium')}
                            >
                                <span>Medium</span>
                                <span className={`arrow ${expandedSections.medium ? 'expanded' : ''}`}>▼</span>
                            </button>
                            {expandedSections.medium && (
                                <div className="filter-content">
                                    {MEDIUM_OPTIONS.map(medium => (
                                        <label key={medium} className="filter-option">
                                            <input
                                                type="checkbox"
                                                checked={selectedMedium.includes(medium)}
                                                onChange={(e) => {
                                                    if (e.target.checked) {
                                                        setSelectedMedium([...selectedMedium, medium]);
                                                    } else {
                                                        setSelectedMedium(selectedMedium.filter(m => m !== medium));
                                                    }
                                                }}
                                            />
                                            <span>{medium}</span>
                                        </label>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Gallery Grid */}
                <div className="portfolio-gallery">
                    {loading && <div className="loading">Loading artworks...</div>}
                    {error && <div className="error">{error}</div>}

                    <div className="gallery-grid">
                        {getFilteredAndSortedArtworks().map(artwork => (
                            <div key={artwork.artwork_id} className="gallery-item">
                                <div className="artwork-card">
                                    {artwork.main_img && (
                                        <img
                                            src={artwork.main_img}
                                            alt={artwork.artwork_title || 'Artwork'}
                                            className="artwork-image"
                                        />
                                    )}
                                    <div className="artwork-info">
                                        <h3>{artwork.artwork_title}</h3>
                                        <p className="artwork-category">{artwork.artwork_category}</p>
                                        <p className="artwork-medium">{artwork.artwork_medium}</p>
                                        {artwork.artwork_description && (
                                            <p className="artwork-description">{artwork.artwork_description}</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}