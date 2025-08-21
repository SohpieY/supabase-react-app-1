import './Works.css';
import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

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

            setArtworks(data || []);
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

                    {/*updated ver*/}
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
                                            {/*{artwork.artwork_description && (
                                                <p className="artwork-description">{artwork.artwork_description}</p>
                                            )}
                                            {artwork.date && (
                                                <p className="artwork-date">{new Date(artwork.date).getFullYear()}</p>
                                            )}*/}
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