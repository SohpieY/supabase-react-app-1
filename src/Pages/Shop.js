import React, { useState, useEffect, useRef } from 'react';
import './Shop.css';

// Expanded artwork data
const placeholderArtworks = [
    {
        id: 1,
        title: 'Household Name',
        price: 520,
        categories: ['Mixed media', 'Linoprint'],
        image: '/images/artwork/household_name.jpg',
        currency: 'HKD'
    },
    {
        id: 2,
        title: 'Pearls to Adorn',
        price: 9780,
        categories: ['Paintings', 'Oils'],
        image: '/images/artwork/pearls_adorn.jpg',
        currency: 'HKD'
    },
    {
        id: 3,
        title: 'Rainforest Charm',
        price: 8720,
        categories: ['Paintings', 'Oils'],
        image: '/images/artwork/rainforest_charm.jpg',
        currency: 'HKD'
    },
    {
        id: 4,
        title: 'Olives and Oyster',
        price: 520,
        categories: ['Digital'],
        image: '/images/artwork/olives_oyster.jpg',
        currency: 'HKD'
    },
    // Additional artworks
    {
        id: 5,
        title: 'Urban Landscape',
        price: 1200,
        categories: ['Digital', 'Cityscape'],
        image: '/images/artwork/urban_landscape.jpg',
        currency: 'HKD'
    },
    {
        id: 6,
        title: 'Mountain Serenity',
        price: 3500,
        categories: ['Landscape', 'Watercolor'],
        image: '/images/artwork/mountain_serenity.jpg',
        currency: 'HKD'
    },
    {
        id: 7,
        title: 'Abstract Emotion',
        price: 2800,
        categories: ['Abstract', 'Acrylic'],
        image: '/images/artwork/abstract_emotion.jpg',
        currency: 'HKD'
    }
];

// FilterDropdown component
const FilterDropdown = ({ title, expanded, onToggle }) => {
    return (
        <div className="filter-dropdown">
            <button className="filter-header" onClick={onToggle}>
                <span>{title}</span>
                <span className={`arrow ${expanded ? 'expanded' : ''}`}>▼</span>
            </button>
            {expanded && (
                <div className="filter-content">
                    <div className="filter-placeholder">
                        Filter options will go here
                    </div>
                </div>
            )}
        </div>
    );
};

export default function Shop() {
    const [artworkData, setArtworkData] = useState(placeholderArtworks);
    const [currentIndex, setCurrentIndex] = useState(0);
    const carouselRef = useRef(null);

    // State for portfolio section
    const [expandedSections, setExpandedSections] = useState({
        categories: false,
        medium: false,
        style: false
    });

    // Placeholder data for the portfolio grid
    const placeholderItems = Array.from({ length: 6 }, (_, i) => ({ id: i + 1 }));

    const toggleSection = (section) => {
        setExpandedSections(prev => ({
            ...prev,
            [section]: !prev[section]
        }));
    };

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) =>
                (prevIndex + 1) % artworkData.length
            );
        }, 3000);

        return () => clearInterval(interval);
    }, [artworkData.length]);

    const handleNextClick = () => {
        setCurrentIndex((prevIndex) =>
            (prevIndex + 1) % artworkData.length
        );
    };

    const handlePrevClick = () => {
        setCurrentIndex((prevIndex) =>
            (prevIndex - 1 + artworkData.length) % artworkData.length
        );
    };

    return (
        <div className="shop-page">
            {/* Existing top image section */}
            <div className="shop-top-img">
                <img className="shop-mainimg center" src="/images/shop/shop_backgroundimg.png" alt="shop-middle"/>
                <img className="shop-mainimg left" src="/images/shop/shop_backgroundimg.png" alt="shop-left"/>
                <img className="shop-mainimg right" src="/images/shop/shop_backgroundimg.png" alt="shop-right"/>
                <h1 className="shop-title-heading">shop</h1>
            </div>

            {/* New arrivals carousel section */}
            <div className="new-arrivals-carousel">
                <h2>New ✧.*</h2>

                <div className="carousel-container">
                    {/* Left arrow button */}
                    <button
                        className="carousel-arrow left-arrow"
                        onClick={handlePrevClick}
                    >
                        ‹
                    </button>

                    <div className="carousel-wrapper" ref={carouselRef}>
                        <div
                            className="carousel-track"
                            style={{
                                transform: `translateX(-${currentIndex * (300 + 32)}px)`,
                                transition: 'transform 0.5s ease'
                            }}
                        >
                            {artworkData.map((artwork) => (
                                <div key={artwork.id} className="artwork-carousel-item">
                                    <div className="artwork-image-container">
                                        {artwork.image ? (
                                            <img src={artwork.image} alt={artwork.title} />
                                        ) : (
                                            <div>No Image</div>
                                        )}
                                    </div>
                                    <div className="artwork-text-container">
                                        <h3 className="artwork-title">{artwork.title}</h3>
                                        <p className="artwork-price">
                                            {artwork.price.toLocaleString()} {artwork.currency}
                                        </p>
                                        <div className="artwork-tags">
                                            {artwork.categories.map((category, index) => (
                                                <span key={index} className="tag">{category}</span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right arrow button */}
                    <button
                        className="carousel-arrow right-arrow"
                        onClick={handleNextClick}
                    >
                        ›
                    </button>
                </div>
            </div>

            {/* Infinite Moving Banner */}
            <div className="infinite-banner">
                <div className="banner-track">
                    <div className="banner-content">
                        <div className="banner-text">
                            pottery_
                            <img
                                src="/images/banner/pottery_shop.png"
                                alt="sculpture icon"
                                className="banner-icon"
                            />
                            prints_
                            <img
                                src="/images/banner/print_shop.jpg"
                                alt="print icon"
                                className="banner-icon"
                            />
                            paintings_
                            <img
                                src="/images/banner/painting_shop.jpg"
                                alt="print icon"
                                className="banner-icon"
                            />
                            sculptures_
                            <img
                                src="/images/banner/sculpture_shop.png"
                                alt="print icon"
                                className="banner-icon"
                            />
                            mixed media_
                            <img
                                src="/images/banner/mixedmedia_Shop.jpg"
                                alt="print icon"
                                className="banner-icon"
                            />
                            fabric_
                            <img
                                src="/images/banner/fabric_shop.jpg"
                                alt="print icon"
                                className="banner-icon"
                            />
                        </div>

                    </div>
                </div>
            </div>


            {/* Portfolio Container Section */}
            <div className="portfolio-container">
                <div className="portfolio-sidebar">
                    <div className="portfolio-header">
                        <h1>Shop Collection</h1>
                        <p>
                            Here are some of my personal work that are up for purchase! Feel free to browse through my store!
                        </p>
                    </div>

                    <div className="sort-section">
                        <h3>Sort</h3>
                        <div className="sort-options">
                            <label className="sort-option">
                                <input type="radio" name="sort" value="recommended" defaultChecked />
                                <span>Recommended</span>
                            </label>
                            <label className="sort-option">
                                <input type="radio" name="sort" value="newest" />
                                <span>Date Created: New to Old</span>
                            </label>
                            <label className="sort-option">
                                <input type="radio" name="sort" value="oldest" />
                                <span>Date Created: Old to New</span>
                            </label>
                        </div>
                    </div>

                    <div className="filter-section">
                        <FilterDropdown
                            title="Categories"
                            expanded={expandedSections.categories}
                            onToggle={() => toggleSection('categories')}
                        />

                        <FilterDropdown
                            title="Medium"
                            expanded={expandedSections.medium}
                            onToggle={() => toggleSection('medium')}
                        />

                        <FilterDropdown
                            title="Style"
                            expanded={expandedSections.style}
                            onToggle={() => toggleSection('style')}
                        />
                    </div>
                </div>

                <div className="portfolio-gallery">
                    <div className="gallery-grid">
                        {placeholderItems.map(item => (
                            <div key={item.id} className="gallery-item">
                                <div className="item-placeholder">
                                    {/* Placeholder content */}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}