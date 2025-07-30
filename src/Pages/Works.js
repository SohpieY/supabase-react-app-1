// src/Pages/Works.js
import './Works.css';

export default function Works() {
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
                    {/*<img src={"images/artwork/AW1_apples_mainpage.png"} alt={"applepainting"}/>*/}
                    {/*<img src={"/images/artwork/AW2_thread_mainpage.png"} alt={"thread-artwork"}/>*/}
                    {/*<img src={"/images/artwork/AW4_Dog_mainpage.png"} alt={"dog-artwork"}/>*/}
                    {/*<img src={"/images/artwork/AW6_laying_mainpage.png"} alt={"layingpainting"}/>*/}
                    {/*<img src={"/images/artwork/AW7_flowers_mainpage.png"} alt={"patternpainting"}/>*/}
                    {/*<img src={"/images/artwork/AW9_tablecloth_print.png"} alt={"tablecloth"}/>*/}
                    {/*<img src={"/images/artwork/AW13_cabinet_painting.png"} alt={"cabinetpainting"}/>*/}
                    {/*<img src={"/images/artwork/AW12_fishes_mixedmedia.png"} alt={"fishesprint"}/>*/}
                </div>

                <h1 className="works-secondtitle">my work</h1>
            </div>

            <div className="season-picks">
                <h1 className={"season-title"}>Summer Favorites</h1>
                <h2 className={"season-subtitle"}>My work catalogue seasonal picks</h2>
                <div className="season-painting">
                    <img className={"thread-artwork-season"} src={"/images/artwork/AW2_thread_mainpage.png"} alt={"thread-artwork"}/>
                    <img className={"cabinet-painting-season"} src={"/images/artwork/AW13_cabinet_painting.png"} alt={"cabinetpainting"}/>
                    <img className={"fishes-mixedmedia-season"} src={"/images/artwork/AW12_fishes_mixedmedia.png"} alt={"fishesprint"}/>
                    <img className={"pattern-painting-season"} src={"/images/artwork/AW7_flowers_mainpage.png"} alt={"patternpainting"}/>
                </div>


            </div>

        </div>
    );
}