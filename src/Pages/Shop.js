import React, { useState, useEffect, useRef } from 'react';
import './Shop.css';
import { supabase } from '../supabaseClient';
import { CartState } from '../Context/Context';
import CartIcon from "../components/CartIcon";
import ShopQuantity from '../components/ShopQuantity';


// filter optio
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
    // Existing state
    const [expandedSections, setExpandedSections] = useState({
        categories: false,
        medium: false
    });

    // Get cart state
    const {
        state: { cart },
        dispatch,
    } = CartState();


    const [artworks, setArtworks] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState([]);
    const [selectedMedium, setSelectedMedium] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState('recommended');

    //  Toggle dropdown section visibility
    const dropDownFilter = (section) => {
        setExpandedSections(prev => ({
            ...prev,
            [section]: !prev[section]
        }));
    };

    // filter and sort artworks function
    const getFilteredAndSortedArtworks = () => {
        // start with a copy of all artworks
        let filteredArtworks = [...artworks];

        // apply search filter if there's a search term
        if (searchTerm) {
            filteredArtworks = filteredArtworks.filter(artwork => {
                // get the artwork title in lowercase for case-insensitive comparison
                const title = artwork.artwork_title?.toLowerCase() || '';
                // get the search term in lowercase
                const search = searchTerm.toLowerCase();
                // check if the title includes the search term
                return title.includes(search);
            });
        }



        // apply category filter if any categories are selected
        if (selectedCategory.length > 0) {
            filteredArtworks = filteredArtworks.filter(artwork => {
                // check if artwork medium is in
                return selectedCategory.includes(artwork.artwork_category);
            });
        }

        // apply medium filter if any mediums are selected
        if (selectedMedium.length > 0) {
            filteredArtworks = filteredArtworks.filter(artwork => {
                // check if artwork medium is in
                return selectedMedium.includes(artwork.artwork_medium);
            });
        }

        // apply sorting based on the selected option
        if (sortBy === 'newest') {
            // sort from newest to oldest
            filteredArtworks = sortByDate(filteredArtworks, false);
        }
        else if (sortBy === 'oldest') {
            // sort from oldest to newest
            filteredArtworks = sortByDate(filteredArtworks, true);
        }
        else {
            //  sort alphabetically by title (recommended filter)
            filteredArtworks = alphabeticalSort(filteredArtworks);
        }

        //return the filtered and sorted artworks
        return filteredArtworks;
    };

    // Price calculation function
    const calculateArtworkPrice = (artwork) => {
        // If artwork already has a price, use it
        if (artwork.artwork_price && artwork.artwork_price > 0) {
            return parseFloat(artwork.artwork_price);
        }

        // Default pricing based on category
        const basePrices = {
            'Painting': 2500.00,
            'Sculpture': 3500.00,
            'Mixed Media': 2800.00,
            'Digital': 1800.00,
            'Print': 1200.00,
            'Installation': 4500.00,
            'Default': 2000.00
        };

        return basePrices[artwork.artwork_category] || basePrices['Default'];
    };

    const getArtworks = async () => {
        try {
            setLoading(true);
            const { data, error } = await supabase
                .from('Artwork')
                .select('*')
                .order('art_creation_date', {ascending: false});

            if (error) {
                throw error;
            }

            // Add calculated prices to artworks
            const artworksWithPrices = data.map(artwork => ({
                ...artwork,
                artwork_price: calculateArtworkPrice(artwork)
            }));

            setArtworks(artworksWithPrices || []);
        } catch (error) {
            setError(error.message);
            console.error("Sorry! Couldn't fetch artworks! :(", error);
        } finally {
            setLoading(false);
        }
    };


    // Very simple alphabetical sort - step by step approach
    const alphabeticalSort = (artworks) => {
        // make a copy of the artworks array
        const result = [...artworks];
        let sorted = false;
        let passes = 0;

        // keep sorting until the array is fully sorted
        while (!sorted && passes < result.length) {
            sorted = true; // assume it is sorted unless made a swap

            // Compare each pair of adjacent artworks
            for (let i = 0; i < result.length - 1; i++) {
                // get the titles in lowercase for comparison
                const titleA = result[i].artwork_title?.toLowerCase() || '';
                const titleB = result[i + 1].artwork_title?.toLowerCase() || '';

                // If titles are in the wrong order, swap them
                if (titleA > titleB) {
                    // swap the artworks
                    const temp = result[i];
                    result[i] = result[i + 1];
                    result[i + 1] = temp;
                    sorted = false; //  made a swap, so it might not be sorted yet
                }
            }

            passes++;
        }

        return result;
    };

    //  selection sort of date--> can use because the database isn't large, and it is less memory heavy
    const sortByDate = (arr, ascending = true) => {
        const arrayArtworkSort = [...arr];
        for (let i = 0; i < arrayArtworkSort.length - 1; i++) {
            let target = i;
            for (let j = i + 1; j < arrayArtworkSort.length; j++) {
                const dateJndex = new Date(arrayArtworkSort[j].art_creation_date);
                const dateTarget = new Date(arrayArtworkSort[target].art_creation_date);

                if (ascending) {
                    // for oldest to newest --> find the smallest date
                    if (dateJndex < dateTarget) {
                        target = j;
                    }
                } else{
                    // For newest to oldest --> find the largest date
                    if (dateJndex > dateTarget) {
                        target = j;
                    }
                }
            }
            // swap the index elements
            if (target !== i) {
                [arrayArtworkSort[i], arrayArtworkSort[target]] = [arrayArtworkSort[target], arrayArtworkSort[i]];
            }
        }
        return arrayArtworkSort;
    };


    useEffect(() => {
        getArtworks();
    }, []);

    const [artworkData, setArtworkData] = useState(placeholderArtworks);
    const [currentIndex, setCurrentIndex] = useState(0);
    const carouselRef = useRef(null);
/*

    const toggleSection = (section) => {
        setExpandedSections(prev => ({
            ...prev,
            [section]: !prev[section]
        }));
    };
*/

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

            <div className="shop-icon"> <CartIcon/></div>

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


            {/*  Portfolio Gallery Section */}
            <div className="portfolio-container">
                <div className="portfolio-sidebar">
                    <div className="portfolio-header">
                        <h1>My Work</h1>
                        <p>
                            A collection of all my past professional and personal work! Some are refined,
                            and some are pieces I've done in my free time. Please explore as you wish! ᕕ( ᐛ )ᕗ
                        </p>
                    </div>

                    {/* Add search functionality */}
                    <div className="search-section">
                        <input
                            type="text"
                            placeholder="Search artworks..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="search-input"
                        />
                    </div>

                    <div className="sort-section">
                        <h3>Sort</h3>
                        <div className="sort-options">
                            <label className="sort-option">
                                <input
                                    type="radio"
                                    name="sort"
                                    value="recommended"
                                    checked={sortBy === 'recommended'}
                                    onChange={(e) => setSortBy(e.target.value)}
                                />
                                <span>Recommended</span>
                            </label>
                            <label className="sort-option">
                                <input
                                    type="radio"
                                    name="sort"
                                    value="newest"
                                    checked={sortBy === 'newest'}
                                    onChange={(e) => setSortBy(e.target.value)}
                                />
                                <span>Date Created: New to Old</span>
                            </label>
                            <label className="sort-option">
                                <input
                                    type="radio"
                                    name="sort"
                                    value="oldest"
                                    checked={sortBy === 'oldest'}
                                    onChange={(e) => setSortBy(e.target.value)}
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
                                onClick={() => dropDownFilter('categories')}
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
                                onClick={() => dropDownFilter('medium')}
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

                <div className="portfolio-gallery">
                    {loading && <div className="loading">Loading artworks...</div>}
                    {error && <div className="error">{error}</div>}

                    {/*inserted cart*/}
                    <div className="gallery-grid">
                        {!loading && !error && artworks.length > 0 ? (
                            getFilteredAndSortedArtworks().map(artwork => (
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
                                            <p className="artwork-price">
                                                HKD {calculateArtworkPrice(artwork).toFixed(2)}
                                            </p>

                                            {/* Add to Cart / Quantity Controls */}
                                            {cart.some((item) => item.id === artwork.artwork_id) ? (
                                                <div className="cart-controls">
                                                    <div className="quantity-section">
                                                        <label>Quantity: </label>
                                                        <ShopQuantity
                                                            quantity={cart.find(item => item.id === artwork.artwork_id)?.qty || 1}
                                                            onQuantityChange={(newQty) =>
                                                                dispatch({
                                                                    type: "CHANGE_CART_QTY",
                                                                    payload: {
                                                                        id: artwork.artwork_id,
                                                                        qty: newQty
                                                                    },
                                                                })
                                                            }
                                                            maxQuantity={10} // Add the maxQuantity prop
                                                        />
                                                    </div>
                                                    <button
                                                        className="remove-from-cart-btn"
                                                        onClick={() =>
                                                            dispatch({
                                                                type: "REMOVE_FROM_CART",
                                                                payload: { id: artwork.artwork_id },
                                                            })
                                                        }
                                                    >
                                                        Remove from Cart
                                                    </button>
                                                </div>
                                            ) : (
                                                <button
                                                    className="add-to-cart-btn"
                                                    onClick={() =>
                                                        dispatch({
                                                            type: "ADD_TO_CART",
                                                            payload: {
                                                                id: artwork.artwork_id,
                                                                name: artwork.artwork_title,
                                                                price: calculateArtworkPrice(artwork),
                                                                image: artwork.main_img,
                                                                category: artwork.artwork_category,
                                                                medium: artwork.artwork_medium,
                                                                qty: 1
                                                            },
                                                        })
                                                    }
                                                >
                                                    Add to Cart - HKD {calculateArtworkPrice(artwork).toFixed(2)}
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : ( <p>No artworks found</p> )}
                    </div>
                </div>
            </div>
        </div>
    );
}