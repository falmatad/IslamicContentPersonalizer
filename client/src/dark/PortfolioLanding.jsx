import React, {Component} from 'react';
import ScrollToTop from 'react-scroll-up';
import { FiChevronUp } from "react-icons/fi";
import Helmet from "../component/common/Helmet";
import TextLoop from "react-text-loop";
import HeaderThree from "../component/header/HeaderThree";
import FooterTwo from "../component/footer/FooterTwo";
import TabTwo from "../elements/tab/TabTwo";
import ContactThree from "../elements/contact/ContactThree";
// import PortfolioList from "../elements/portfolio/PortfolioList";
import ServiceList from "../elements/service/ServiceList";
import BlogContent from "../elements/blog/BlogContent";
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import {FaTwitter ,FaInstagram ,FaFacebookF , FaLinkedinIn } from "react-icons/fa";

const SocialShare = [
    {Social: <FaFacebookF /> , link: 'https://www.facebook.com/'},
    {Social: <FaLinkedinIn /> , link: 'https://www.linkedin.com/in/'}
]

const SlideList = [
    {
        textPosition: 'text-left',
        category: 'Welcome to my World',
        description: '',
        buttonText: '',
        buttonLink: ''
    }
]

const PortfolioList = [
    {
        images: '7',
        category: 'Freelancer',
        title: 'The Language of Developer'
    },
    {
        images: '1',
        category: 'Freelancer',
        title: 'The new Thinking for Design'
    },
    {
        images: '2',
        category: 'Freelancer',
        title: 'The new Thinking for Design'
    },
    {
        images: '3',
        category: 'Freelancer',
        title: 'Getting tickets to the big show'
    },
    {
        images: '8',
        category: 'Freelancer',
        title: 'You can see your Portfolio'
    },
    {
        images: '9',
        category: 'Freelancer',
        title: 'Getting tickets to the big show'
    },
]


const TabOne = [
    
    {
        image: '01',
        bigImage: '/assets/images/portfolio/big/dp-big--portfolio-04.jpg',
        category: 'Frontend Developer',
        title: 'Daryeel Health'
    },
    {
        image: '02',
        bigImage: '/assets/images/portfolio/big/dp-big--portfolio-01.jpg',
        category: 'Web Designer',
        title: 'Essentialisim - Landing Page'
    },
    {
        image: '03',
        bigImage: '/assets/images/portfolio/big/dp-big--portfolio-03.jpg',
        category: 'Frontend Developer ',
        title: 'A Better Proffesor App'
    },
]

class PortfolioLanding extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tab1: 0,
            isOpen: false,
        };
    }
    
    render () {
        let title = 'A bit about me',
        description = 'I am a collage dropout that learned how to write JavaScript Web Apps at a BootCamp in three months, worked on a Front End Project for 5 months, and learned NodeJs with MySQL in one month. Hire me please! Thanks';
        const PostList = BlogContent.slice(0 , 3);

        const { tab1, isOpen } = this.state;

        return (
        <div className={"active-light"}>
            <Helmet pageTitle="Portfolio Landing" />

            {/* <HeaderThree homeLink="/" logo="symbol-light" color="color-dark"/> */}
            {/* Start Slider Area   */}
            <div id="home" className="fix">
                        
                <div className="slider-wrapper">
                    {/* <div className="social-share-inner">
                            <ul className="social-share social-style--2 color-white d-flex justify-content-start liststyle">
                                {SocialShare.map((val , i) => (
                                    <li key={i}><a href={`${val.link}`}>{val.Social}</a></li>
                                ))}
                            </ul>
                        </div>
                        <div className="header-btn">
                            <a className="rn-btn" href="https://themeforest.net/checkout/from_item/25457315?license=regular">
                                <span>Download CV</span>
                            </a>
                        </div> */}
                    {/* Start Single Slide */}
                    {SlideList.map((value , index) => (
                        <div className="slide personal-portfolio-slider slider-paralax slider-style-3 d-flex align-items-center justify-content-center bg_image bg_image--25 " key={index}>
                            <div className="container">
                                <div className="row">
                                    <div className="col-lg-12">
                                        <div className={`inner ${value.textPosition}`}>
                                            
                                            <h1 className="title">Hi, I’m Falmata Dawano! <br/>
                                            <TextLoop>
                                                <span> Frontend Developer</span>
                                                <span> Backend Developer</span>
                                                <span> Web Designer</span>
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
                                    <h2>Projects Based on Skills</h2>
                                    <p>There are many variations of passages of Lorem Ipsum available, <br />but the majority have suffered alteration.</p>
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
                                                        <a href="#portfolio-details">
                                                            <img src={`/assets/images/portfolio/dp-portfolio-${value.image}.jpg`} alt="Portfolio Images"/>
                                                        </a>
                                                    </div>
                                                </div>
                                                <div className="content">
                                                    <div className="inner">
                                                        <p>{value.category}</p>
                                                        <h4><a href="#portfolio-details">{value.title}</a></h4>
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
                    <ContactThree contactImages="/assets/images/about/about-9.jpg" contactTitle="Hire Me." />
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

export default PortfolioLanding;
