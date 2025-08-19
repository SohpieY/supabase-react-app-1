// Enhanced Works.js with filtering, sorting, and search
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

const STYLE_OPTIONS = [
    'Realistic',
    'Abstract',
    'Illustrative',
    'Patterned',
    'Human Figures',
    'Animals'
];

export default function Works() {
    // Existing state
    const [expandedSections, setExpandedSections] = useState({
        categories: false,
        medium: false,
        style: false
    });

    const [artworks, setArtworks] = useState([]);
    const [categories, setCategories] = useState(['all']);
    const [mediums, setMediums] = useState(['all']);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [selectedMedium, setSelectedMedium] = useState('all');
    const [selectedFilters, setSelectedFilters] = useState({
        categories: [],
        medium: [],
        style: []
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState('recommended'); // 'recommended', 'newest', 'oldest'

    const toggleSection = (section) => {
        setExpandedSections(prev => ({
            ...prev,
            [section]: !prev[section]
        }));
    };
    /*how */
/*
    // Debugging version to understand why no artworks are found
    useEffect(() => {
        const fetchArtworks = async () => {
            setLoading(true);
            setError(null);

            try {
                // First, let's check what data exists in the table
                const { data: allData, error: allError } = await supabase
                    .from('Artwork')
                    .select('*');

                console.log('All Artwork Data:', allData);
                console.log('All Artwork Error:', allError);

                // Create base query
                let query = supabase
                    .from('Artwork')
                    .select('*');

                // Add category filter - using full field name
                if (selectedCategory !== 'all') {
                    query = query.eq('artwork_category', selectedCategory);
                    console.log('Filtering by category:', selectedCategory);
                }

                // Add medium filter - using full field name
                if (selectedMedium !== 'all') {
                    query = query.eq('artwork_medium', selectedMedium);
                    console.log('Filtering by medium:', selectedMedium);
                }

                // Add search filter - using full field names
                if (searchTerm) {
                    query = query.or(`artwork_title.ilike.%${searchTerm}%,artwork_description.ilike.%${searchTerm}%`);
                    console.log('Searching for term:', searchTerm);
                }

                // Add sorting - using full field names
                switch (sortBy) {
                    case 'newest':
                        query = query.order('art_creation_date', { ascending: false });
                        console.log('Sorting: Newest first');
                        break;
                    case 'oldest':
                        query = query.order('art_creation_date', { ascending: true });
                        console.log('Sorting: Oldest first');
                        break;
                    case 'recommended':
                    default:
                        // Sort by title using full field name
                        query = query.order('artwork_title', { ascending: true });
                        console.log('Sorting: By title');
                        break;
                }

                const { data, error } = await query;

                console.log('Filtered Artwork Data:', data);
                console.log('Filtered Artwork Error:', error);

                if (error) throw error;

                // Log unique categories and mediums from the fetched data
                if (data && data.length > 0) {
                    const uniqueCategories = [...new Set(data.map(item => item.artwork_category))];
                    const uniqueMediums = [...new Set(data.map(item => item.artwork_medium))];

                    console.log('Unique Categories in Results:', uniqueCategories);
                    console.log('Unique Mediums in Results:', uniqueMediums);
                }

                setArtworks(data || []);
            } catch (err) {
                console.error('Fetch Artworks Error:', err);
                setError(`Failed to fetch artworks: ${err.message}`);
            } finally {
                setLoading(false);
            }
        };

        fetchArtworks();
    }, [selectedCategory, selectedMedium, searchTerm, sortBy]);
*/

    // Fetch unique categories from database with detailed logging
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const { data, error } = await supabase
                    .from('Artwork')
                    .select('artwork_category')
                    .neq('artwork_category', null)
                    .order('artwork_category', { ascending: true });

                console.log('Categories Fetch Data:', data);
                console.log('Categories Fetch Error:', error);

                if (error) throw error;

                const uniqueCategories = [...new Set(data.map(item => item.artwork_category))];
                console.log('Unique Categories:', uniqueCategories);

                setCategories(['all', ...uniqueCategories]);
            } catch (err) {
                console.error('Failed to fetch categories:', err);
            }
        };

        fetchCategories();
    }, []);

// Fetch unique mediums from database with detailed logging
    useEffect(() => {
        const fetchMediums = async () => {
            try {
                const { data, error } = await supabase
                    .from('Artwork')
                    .select('artwork_medium')
                    .neq('artwork_medium', null)
                    .order('artwork_medium', { ascending: true });

                console.log('Mediums Fetch Data:', data);
                console.log('Mediums Fetch Error:', error);

                if (error) throw error;

                const uniqueMediums = [...new Set(data.map(item => item.artwork_medium))];
                console.log('Unique Mediums:', uniqueMediums);

                setMediums(['all', ...uniqueMediums]);
            } catch (err) {
                console.error('Failed to fetch mediums:', err);
            }
        };

        fetchMediums();
    }, []);


    // Handle checkbox filters
    const handleFilterChange = (filterType, value, checked) => {
        setSelectedFilters(prev => {
            const newFilters = { ...prev };
            if (checked) {
                newFilters[filterType] = [...newFilters[filterType], value];
            } else {
                newFilters[filterType] = newFilters[filterType].filter(item => item !== value);
            }
            return newFilters;
        });
    };

    return (
        <div className="works-page">
            {/* Gallery Section */}
            <div className="works-gallery">
                <h1 className="works-title">Here's some of</h1>
                <div className="stack">
                    <img className={"apples-painting"} src={"images/artwork/AW1_apples_mainpage.png"} alt={"applepainting"}/>
                    <img className={"thread-artwork"} src={"/images/artwork/AW2_thread_mainpage.png"} alt={"thread-artwork"}/>
                    <img className={"dog-artwork"} src={"/images/artwork/AW4_Dog_mainpage.png"} alt={"dog-artwork"}/>
                    <img className={"laying-painting"} src={"/images/artwork/AW6_laying_mainpage.png"} alt={"layingpainting"}/>
                    <img className={"pattern-painting"} src={"/images/artwork/AW7_flowers_mainpage.png"} alt={"patternpainting"}/>
                    <img className={"tablecloth-print"} src={"/images/artwork/AW9_tablecloth_print.png"} alt={"tablecloth"}/>
                    <img className={"cabinet-painting"} src={"/images/artwork/AW13_cabinet_painting.png"} alt={"cabinetpainting"}/>
                    <img className={"fishes-mixedmedia"} src={"/images/artwork/AW12_fishes_mixedmedia.png"} alt={"fishesprint"}/>
                </div>
                <h1 className="works-secondtitle">my work</h1>
            </div>

            <div className="season-picks">
                <h1 className={"season-title"}>Summer Favorites</h1>
                <h2 className={"season-subtitle"}>My work catalogue seasonal picks</h2>
                <div className="painting-miseenplace">
                    <div className="thread-artwork-season">
                        <img
                            src="/images/artwork/AW2_thread_mainpage.png"
                            className="thread-img-misenplace"
                            alt="Thread artwork"
                        />
                        <div className="thread-text">
                            <h3 className="thread-title">Memory Threads (2024)</h3>
                            <h4 className="thread-subtitle">Medium: Mixed media (Image transfer &
                                stitching) <br/> <br/>Description: </h4>
                            <p className="thread-desc">
                                In my three-panel mixed media piece, I
                                show how memories can fade and become
                                jumbled over time. The background of the
                                butcher's market starts to lose its clarity and
                                original shape, reflecting how details of
                                specific moments, especially the seemingly
                                mundane ones, can slip away. However, my
                                grandparents' silhouettes remain clear and
                                strong, reminding the audience that it's the
                                people in our memories who leave a lasting
                                mark
                            </p>
                        </div>
                    </div>

                    <div className="pattern-artwork-season">
                        <div className="pattern-text">
                            <h3 className="pattern-title">Deflowering (2025) </h3>
                            <h4 className="pattern-subtitle">Medium: Oil on Canvas <br/> <br/> Description: </h4>
                            <p className="pattern-desc">
                                This expressive abstract painting explores
                                the fluid dynamics of natural forms through a
                                sophisticated interplay of movement and texture.
                                Working within an earthy palette of warm browns,
                                taupes, and cream tones, I create a composition
                                that pulses with organic energy and rhythmic flow.
                            </p>
                        </div>
                        <img
                            src="/images/artwork/AW7_flowers_mainpage.png"
                            className="pattern-img-misenplace"
                            alt="pattern artwork"
                        />
                    </div>

                    <div className="fishes-artwork-season">
                        <div className="fishes-text">
                            <h3 className="fishes-title">Exploring Hong Kong: Fishes(2024)</h3>
                            <h4 className="fishes-subtitle">Medium: Mixed Media on Wood <br/> <br/> Description: </h4>
                            <p className="fishes-desc">
                                The artwork explores themes of memory,
                                cultural identity, and the personal
                                significance we attach to everyday objects,
                                transforming a simple storage piece into a
                                contemplative display of meaningful possessions.
                                Central to the composition is a detailed fish skeleton,
                                symbolizing Hong Kong's maritime heritage and renowned
                                seafood culture—evoking both the visual spectacle of wet
                                markets and the aromatic essence of Cantonese cuisine.
                                Organic floral motifs and botanical elements weave throughout
                                the piece, referencing traditional Chinese medicine and the
                                olfactory experiences of herb shops in old districts.
                            </p>
                        </div>
                        <img
                            src="/images/artwork/AW12_fishes_mixedmedia.png"
                            className="fishes-img-misenplace"
                            alt="fishes artwork"
                        />
                    </div>

                    <div className="cabinet-artwork-season">
                        <img
                            src="/images/artwork/AW13_cabinet_painting.png"
                            className="cabinet-img-misenplace"
                            alt="Cabinet artwork"
                        />
                        <div className="cabinet-text">
                            <h3 className="cabinet-title">Roots and Branches</h3>
                            <h4 className="cabinet-subtitle">Medium: Oil Paint, Acrylic on Wood<br/> <br/> Description: </h4>
                            <p className="cabinet-desc">
                                The artwork explores themes of memory,
                                cultural identity, and the personal
                                significance we attach to everyday objects,
                                transforming a simple storage piece into a
                                contemplative display of meaningful possessions.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            {/* Enhanced Portfolio Gallery Section */}
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

                    <div className="filter-section">
                        <FilterDropdown
                            title="Categories"
                            expanded={expandedSections.categories}
                            onToggle={() => toggleSection('categories')}
                            options={CATEGORY_OPTIONS}
                            selectedFilters={selectedFilters.categories}
                            onFilterChange={(value, checked) => handleFilterChange('categories', value, checked)}
                        />

                        <FilterDropdown
                            title="Medium"
                            expanded={expandedSections.medium}
                            onToggle={() => toggleSection('medium')}
                            options={MEDIUM_OPTIONS}
                            selectedFilters={selectedFilters.medium}
                            onFilterChange={(value, checked) => handleFilterChange('medium', value, checked)}
                        />

                        <FilterDropdown
                            title="Style"
                            expanded={expandedSections.style}
                            onToggle={() => toggleSection('style')}
                            options={STYLE_OPTIONS}
                            selectedFilters={selectedFilters.style}
                            onFilterChange={(value, checked) => handleFilterChange('style', value, checked)}
                        />
                    </div>
                </div>

                <div className="portfolio-gallery">
                    {loading && <div className="loading">Loading artworks...</div>}
                    {error && <div className="error">{error}</div>}

                    {/*updated ver*/}
                    <div className="gallery-grid">
                        {!loading && !error && artworks.length > 0 ? (
                            artworks.map(artwork => (
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
                                            {artwork.art_creation_date && (
                                                <p className="artwork-date">{new Date(artwork.art_creation_date).getFullYear()}</p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            !loading && !error && (
                                <div className="no-results">
                                    <p>No artworks found matching your criteria.</p>
                                    <button
                                        onClick={() => {
                                            setSelectedCategory('all');
                                            setSelectedMedium('all');
                                            setSearchTerm('');
                                            setSelectedFilters({ categories: [], medium: [], style: [] });
                                        }}
                                        className="clear-filters-btn"
                                    >
                                        Clear all filters
                                    </button>
                                </div>
                            )
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

// Enhanced FilterDropdown component
const FilterDropdown = ({ title, expanded, onToggle, options, selectedFilters, onFilterChange }) => {
    return (
        <div className="filter-dropdown">
            <button className="filter-header" onClick={onToggle}>
                <span>{title}</span>
                <span className={`arrow ${expanded ? 'expanded' : ''}`}>▼</span>
            </button>
            {expanded && (
                <div className="filter-content">
                    {options.map((option) => (
                        <label key={option} className="filter-option">
                            <input
                                type="checkbox"
                                name={title.toLowerCase()}
                                value={option}
                                checked={selectedFilters.includes(option)}
                                onChange={(e) => onFilterChange(option, e.target.checked)}
                            />
                            <span>{option}</span>
                        </label>
                    ))}
                </div>
            )}
        </div>
    );
};