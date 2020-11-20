import React, {Component} from 'react';
import ScrollToTop from 'react-scroll-up';
import { FiChevronUp } from "react-icons/fi";
import Helmet from "../component/common/Helmet";
import TextLoop from "react-text-loop";
import TabTwo from "../elements/tab/TabTwo";
import ContactThree from "../elements/contact/ContactThree";
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import {FaLinkedinIn } from "react-icons/fa";
const SocialShare = [
    {Social: <FaLinkedinIn /> , link: 'https://www.linkedin.com/in/'}
]

const SlideList = [
    {
        textPosition: 'text-left',
        category: 'Welcome to the World of Guidance',
        description: '',
        buttonText: '',
        buttonLink: ''
    }
]

const TabOne = [
    
    {
        image: '04',
        bigImage: '/assets/images/portfolio/big/dp-big--portfolio-04.jpg',
        category: 'Rooted In Mercy ',
        title: 'We all crave good company, good advice, and good envrionment',
    },
    {
        image: '03',
        bigImage: '/assets/images/portfolio/big/dp-big--portfolio-03.jpg',
        category: 'People of Knowledge',
        title: "There are people of knowledge around your block that you didn't even know existed",
    },
    {
        image: '01',
        bigImage: '/assets/images/portfolio/big/dp-big--portfolio-01.jpg',
        category: 'Mentorship',
        title: "There are many that regret not connecting, but it's never too late",
    },
    {
        image: '02',
        bigImage: '/assets/images/portfolio/big/dp-big--portfolio-02.jpg',
        category: 'Rooted in Knowledge',
        title: "Interactive way to gain the basic foundational knowledge of your deen",
    }
]

class KnowYourLordLikeHashim extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tab1: 0,
            isOpen: false,
        };
    }
    
    render () {
        let title = 'A bit about the Project',
        description = " The thing that saved Hashim was the little knowlede of Allah that he had, having an envrionment that he could put that knowledge into practice, and people of knowledge that are rooted in mercy, to talk to when he slipped and tripped. We all deserve that insha Allah.";

        const { tab1, isOpen } = this.state;

        return (
        <div className={"active-light"}>
            <Helmet pageTitle="Portfolio Landing" />
            <div id="home" className="fix">
                        
                <div className="slider-wrapper">
                    
                    {SlideList.map((value , index) => (
                        <div className="slide personal-portfolio-slider slider-paralax slider-style-3 d-flex align-items-center justify-content-center bg_image bg_image--25" key={index}>
                            <div className="container">
                                <div className="row">
                                    <div className="col-lg-12">
                                        <div className={`inner ${value.textPosition}`}>
                                            
                                            <h1 className="title" style={{color: 'white'}}>Comprehensive Youth Guidance Program<br/>
                                            <TextLoop interval={1800}>
                                                <span> Knowledge of Allah</span>
                                                <span> Mentorship</span>
                                                <span> Activities</span>
                                                <span> Volunteer Now </span>
                                            </TextLoop>{" "}
                                            </h1>
                                            
                                            {value.description ? <p className="description">{value.description}</p> : ''}
                                            {value.buttonText ? <div className="slide-btn"><a className="rn-button-style--2 btn-primary-color" href={`${value.buttonLink}`}>{value.buttonText}</a></div> : ''}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                    {/* End Single Slide */}
                </div>
            </div>
            {/* End Slider Area   */} 

            {/* Start About Area */}
            <div id="about" className="fix active-dark">
                <div className="about-area ptb--120  bg_color--1">
                    <div className="about-wrapper">
                        <div className="container">
                            <div className="row row--35 align-items-center">
                                <div className="col-lg-5">
                                    <div className="thumbnail">
                                        <img className="w-100" src="/assets/images/about/about-8.jpg" alt="About Images"/>
                                    </div>
                                </div>
                                <div className="col-lg-7">
                                    <div className="about-inner inner">
                                        <div className="section-title">
                                            <h2 className="title">{title}</h2>
                                            <p className="description">{description}</p>
                                        </div>
                                        <div className="row mt--30">
                                            <TabTwo tabStyle="tab-style--1" />
                                        </div>
                                        
                                    </div>
                                    {/* <div style={{marginTop:'20px'}}>
                                        <a className="rn-btn" href="/assets/pdf/MyResumeFalmataDawano.pdf" download='falmata-dawano-resume'>
                                            <span>Download a small Progam Information Booklet</span>
                                        </a>
                                    </div> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* End About Area */}

            {/* Start Service Area  */}

            <div id="portfolio" className="fix">
            <div className="rn-portfolio-area ptb--120 bg_color--1 line-separator">
                    <div className="container">
                        <div className="row align-items-end">
                            <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                                <div className="section-title text-center">
                                    <h2> Detailed Programs, Each with Mentorship and real world Application. In collaboration with Al Amaan Center</h2>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            {TabOne.map((value , index) => (
                                <div className="col-lg-6" key={index}>
                                    {isOpen && (

                                        <Lightbox
                                            mainSrc={TabOne[tab1].bigImage}
                                            nextSrc={TabOne[(tab1 + 1) % TabOne.length]}
                                            prevSrc={TabOne[(tab1 + TabOne.length - 1) % TabOne.length]}
                                            onCloseRequest={() => this.setState({ isOpen: false })}
                                            onMovePrevRequest={() =>
                                            this.setState({
                                                tab1: (tab1 + TabOne.length - 1) % TabOne.length,
                                            })
                                            }
                                            onMoveNextRequest={() =>
                                                this.setState({
                                                    tab1: (tab1 + 1) % TabOne.length,
                                                })
                                            }
                                        />
                                    )}
                                    <div className="item-portfolio-static">
                                        <div onClick={() => this.setState({ isOpen: true, tab1: index })}>
                                            <div className="portfolio-static">
                                                <div className="thumbnail-inner">
                                                    <div className="thumbnail">
                                                        <a href="#">
                                                            <img src={`/assets/images/portfolio/big/dp-big--portfolio-${value.image}.jpg`} alt="Portfolio Images"/>
                                                        </a>
                                                    </div>
                                                </div>
                                                <div className="content">
                                                    <div className="inner">
                                                        <p>{value.category}</p>
                                                        <h4><a href="#">{value.title}</a></h4>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                </div>
                {/* End Portfolio Area  */}  
            
            {/* End Service Area  */} 

            {/* Start COntact Area */}
            <div id="contact" className="fix active-dark">
                <div className="rn-contact-area ptb--120 bg_color--1">
                    <ContactThree contactImages="/assets/images/about/about-9.jpg" contactTitle="Commit to Help with Whatever Skill You got" />
                </div>
            </div>
            {/* End COntact Area */}

            {/* Start Back To Top */}
            <div className="backto-top">
                <ScrollToTop showUnder={160}>
                    <FiChevronUp />
                </ScrollToTop>
            </div>
            {/* End Back To Top */}
            
        </div>
        )
    }
}

export default KnowYourLordLikeHashim;
