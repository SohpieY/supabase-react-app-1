import { useState } from 'react';
import './About.css';
import NavBar from '../components/Navbar';

export default function About() {
    const [activeSection, setActiveSection] = useState(null);

    const sections = [
        {
            id: 'experience',
            title:'',
            content: (
                /*<div className="experience-title"> Experience </div>*/
                <div className="experience-content">
                    <h2 className="experience-title">Experience</h2>
                    <table>
                        <thead>
                        <tr>
                            <th>YEAR</th>
                            <th>COMPANY</th>
                            <th>POSITION</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>2024/11 - 2025/03</td>
                            <td>CONDITION 2025</td>
                            <td>GRAPHIC DESIGNER ART DIRECTOR<br/>BRANDING TEAM</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            )
        },
        {
            id: 'education',
            title: '',
            content: (

                <div className="education-content">
                    <h2 className="education-title">Education</h2>
                    <h3 className="education-paragraph"></h3>

                </div>


            )
        },
        {
            id: 'bio',
            title: '', // Empty because we handle it in content
            content: (
                <div className="bio-content">

                    <div className="section-header">Bio</div>
                    <div className="bio-left">
                        <span className="bio-title">Tina Won</span>
                        <img
                            src="images/tina_placeholder_aboutme.jpg"
                            className="profile-image"
                            alt="Tina Won"
                        />
                    </div>
                    <div className="bio-right">
                        <p>I'm Tina Won, a visual artist and aspiring biologist raised and based in Hong Kong. I was born in Beijing to Chinese parents. I am bilingual: fluent in both Mandarin and English. Currently attending High School as a senior, and soon will be abroad studying Biology.</p>
                        <p>My work explores the intricate relationship between humanity and nature, drawing inspiration from both my Chinese heritage and scientific interests. My dual passion for visual arts and biology manifests in pieces that examine ecological systems, biological structures, and environmental consciousness.</p>
                        <div className="contact-info">
                            <p><span>email</span> tinawoao26@student.cis.edu.hk</p>
                            <p><span>instagram</span> doonphie</p>
                            <p><span>linkedin</span> linkedin.com/in/tina-won</p>
                            <p><span>resume</span> download here</p>
                        </div>
                    </div>
                </div>
            )
        }
    ];

    const handleSectionClick = (index) => {
        if (index === sections.length - 1) return; // Top layer can't be clicked
        setActiveSection(activeSection === index ? null : index);
    };

    return (
        <body>
        <div>
            <NavBar></NavBar>
        </div>
        <div className="about-page">
            <h1 className="about-heading">About Me 𓆝 𓆟 𓆞 𓆝 𓆟</h1>

            <div className="about-sections-container">
                <div className="about-sections">
                    {sections.map((section, index) => (
                        <div
                            key={section.id}
                            className={`about-section ${section.id === 'bio' ? 'bio-section' : ''} ${
                                activeSection !== null && index > activeSection ? 'peek-left' : ''
                            } ${
                                activeSection === index ? 'active' : ''
                            }`}
                            onClick={() => handleSectionClick(index)}
                        >
                            <h2>{section.title}</h2>
                            <div className="section-content">
                                {section.content}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
        </body>

    );
}

/*
import { useState } from 'react';
import './About.css';

export default function About() {
    const [activeSection, setActiveSection] = useState(null);

    const sections = [
        {
            id: 'experience',
            title: 'experience',
            content: (
                <div className="experience-content">
                    <table>
                        <thead>
                        <tr>
                            <th>YEAR</th>
                            <th>COMPANY</th>
                            <th>POSITION</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>2024/11 - 2025/03</td>
                            <td>CONDITION 2025</td>
                            <td>GRAPHIC DESIGNER ART DIRECTOR<br/>BRANDING TEAM</td>
                        </tr>
                        {/!* Add all other experience rows here *!/}
                        </tbody>
                    </table>
                </div>
            )
        },
        {
            id: 'education',
            title: 'education',
            content: <div>Educational details...</div>
        },
        {
            id: 'bio',
            title: '', // Title is handled in content
            content: (
                <div className="bio-content">
                    <div className="bio-left">
                        {/!* Your exact image path *!/}
                        <img
                            src="/images/tina_placeholder_aboutme.jpg"
                            className="profile-image"
                            alt="Tina Wan Portrait"
                        />
                        <h2 className="bio-title">tina wan</h2>
                    </div>
                    <div className="bio-right">
                        <p>I'm Tina Wan, a visual artist and aspiring biologist...</p>
                        <div className="contact-info">
                            <p><span>email</span> tinawoao26@student.cis.edu.hk</p>
                            <p><span>instagram</span> doonphie</p>
                            <p><span>linkedin</span> linkedin.com/in/tina-wan</p>
                            <p><span>resume</span> download here</p>
                        </div>
                    </div>
                </div>
            )
        }
    ];

    const handleSectionClick = (index) => {
        if (index === sections.length - 1) return; // Top layer can't be clicked
        setActiveSection(activeSection === index ? null : index);
    };

    return (
        <div className="about-page">
            <h1 className="about-heading">about me</h1>

            <div className="about-sections-container">
                <div className="about-sections">
                    {sections.map((section, index) => (
                        <div
                            key={section.id}
                            className={`about-section ${
                                activeSection !== null && index > activeSection ? 'peek-left' : ''
                            } ${
                                activeSection === index ? 'active' : ''
                            }`}
                            onClick={() => handleSectionClick(index)}
                        >
                            <h2>{section.title}</h2>
                            <div className="section-content">
                                {section.content}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}*/