// src/Pages/Works.js
import './Works.css';
import { useState } from 'react';

export default function Works() {
    const [expandedSections, setExpandedSections] = useState({
        categories: false,
        medium: false,
        style: false
    });

    const toggleSection = (section) => {
        setExpandedSections(prev => ({
            ...prev,
            [section]: !prev[section]
        }));
    };

    // Placeholder data for the portfolio grid
    const placeholderItems = Array.from({ length: 6 }, (_, i) => ({ id: i + 1 }));


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
                            <h3 className="cabinet-title">The Cabinet (2024)</h3>
                            <h4 className="cabinet-subtitle">Medium: Oil Paint on Wood <br/> <br/> Description: </h4>
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

            {/* Portfolio Gallery Section */}
            <div className="portfolio-container">
                <div className="portfolio-sidebar">
                    <div className="portfolio-header">
                        <h1>My Work</h1>
                        <p>
                            A collection of all my past professional and personal work! Some are refined,
                            and some are pieces I've done in my free time. Please explore as you wish! ᕕ( ᐛ )ᕗ
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