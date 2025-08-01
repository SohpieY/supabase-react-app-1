import './Works.css';
import StackAnimation from '../components/StackAnimation';

export default function Works() {
    return (
        <div className="works-page">
            {/* Gallery Section */}
            <div className="works-gallery">
                <h1 className="works-title">Here's some of</h1>
                <StackAnimation />
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