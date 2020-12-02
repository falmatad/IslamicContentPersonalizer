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
import axios from 'axios';
import ReactPlayer from 'react-player/youtube'
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
        category: 'Naseeha Sessions',
        title: 'Special Sessions that are filled with easy to understand Knowledge that you truly need, from those rooted in mercy',
    },
    {
        image: '02',
        bigImage: '/assets/images/portfolio/big/dp-big--portfolio-02.jpg',
        category: 'Every Day Deen',
        title: "You will slip, trip, and relapse...But..You should never despair of the mercy of Allah and give up. Take a step forward everyday.",
    },
    {
        image: '01',
        bigImage: '/assets/images/portfolio/big/dp-big--portfolio-01.jpg',
        category: 'Mentorship',
        title: "Get connected with others like you along your journey. System currently in development.",
    },
    {
        image: '03',
        bigImage: '/assets/images/portfolio/big/dp-big--portfolio-03.jpg',
        category: 'Seek Knowledge',
        title: "As your heart continues to soften, get introduced to advanced topics such as marriage, finance, business, and more by those who are upon the Sunnah of our prophet peace be upon him.",
    }
]


class KnowYourLordLikeHashim extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tab1: 0,
            isOpen: false,
            quranVideos: [],
            alAmaanVideos: [],
            shykJamelVideos: [],
            islamicUniversityVideos: [],
            loading: true
        };
        this.generateAccountAndContent = this.generateAccountAndContent.bind(this);
        this.getContent = this.getContent.bind(this);
        this.generateContentOnly = this.generateContentOnly.bind(this);
    }
    
    componentDidMount() {
        function waitForInstagram(){
            if(typeof window.instgrm !== "undefined"){
                window.instgrm.Embeds.process();
            }
            else{
                setTimeout(waitForInstagram, 250);
            }
        }

        waitForInstagram()
    }

    getContent(channel, tags) { 
    
        return axios.get(`http://localhost:5000/api/get-channel/${channel.id}`
        ).then((response) => {
            console.log(response)
            
            const tempDataArray = []
            if (channel.type == 'quran') {
                for (var i = 0; i < response.data.length; i++) {
                    tempDataArray.push({url: `${response.data[i].video_id}`, title: response.data[i].topic !== null ? response.data[i].topic : response.data[i].video_title, postedDate: response.data[i].posted_at})
                }
            } else {
                for (var i = 0; i < response.data.length; i++) {
                    tempDataArray.push({url: `${response.data[i].video_id}`, title: response.data[i].video_title, postedDate: response.data[i].posted_at})
                }
            }
            

            const personalized = tempDataArray.filter((video) => {
                var valid = false;
                if (tags.knowledge) {
                    for (var i = 0; i < tags.knowledge.length; i++) {
                        if (video.title.split(' ').some(operative => operative.replace(/\W/g, '').toLowerCase() == tags.knowledge[i])) {
                            valid = true
                        }
                    }
                } else {
                for (var i = 0; i < tags.length; i++) {
                    if (video.title.split(' ').some(operative => operative.replace(/\W/g, '').toLowerCase() == tags[i])) {
                        valid = true
                    }
                }
            }
                return valid
            })
            
        return personalized
            
        }).catch((error) => {
            if (error) {
                return error
            }
        });
    }

    generateAccountAndContent(channels, tags, user) {
        const readyData = []

            for (let i=0; i < channels.length; i++) {
                if (channels[i].type == 'knowledge' && tags.knowledge.length) {
                    console.log(tags.knowledge)
                    this.getContent(channels[i], tags.knowledge).then(data => {
                        readyData.push({knowledge: data})
                    }).catch((error) => {
                        if (error) {
                            this.setState({
                                success: 'red', alert: "Woops :[ The form wasn't sent, please refresh and try again or reach out on social media @litatthemasjid"
                            })
                            console.log(error)
                        }
                    });
                } else if (channels[i].type == 'quran'){
                    this.getContent(channels[i], tags.heartSoftner).then(data => {
                        readyData.push({quran: data})
                    }).catch((error) => {
                        if (error) {
                            this.setState({
                                success: 'red', alert: "Woops :[ The form wasn't sent, please refresh and try again or reach out on social media @litatthemasjid"
                            })
                            console.log(error)
                        }
                    });
                } else {
                    this.getContent(channels[i], tags.heartSoftner).then(data => {
                        readyData.push({heartSoftner: data})
                    }).catch((error) => { 
                        if (error) {
                            this.setState({
                                success: 'red', alert: "Woops :[ The form wasn't sent, please refresh and try again or reach out on social media @litatthemasjid"
                            })
                            console.log(error)
                        }
                    });
                }
        }

        readyData.push({user: user})

        console.log(readyData)
            axios.post('http://localhost:5000/api/post-user-and-content', [readyData]).then(response => {
                console.log(response)
            })

        return readyData
    }

    generateContentOnly(channels, tags) {
        
            for (let i=0; i < channels.length; i++) {

                if (channels[i].type == 'knowledge') {
                    
                    this.getContent(channels[i], tags.knowledge).then(data => {
                        console.log(tags.knowledge)
                        this.setState({
                            islamicUniversityVideos: [...data]
                        })
                    }).catch((error) => {
                        if (error) {
                            this.setState({
                                success: 'red', alert: "Woops :[ The form wasn't sent, please refresh and try again or reach out on social media @litatthemasjid"
                            })
                            console.log(error)
                        }
                    });
                } else if (channels[i].type == 'quran'){
                    this.getContent(channels[i], tags.heartSoftner).then(data => {
                        this.setState({
                            quranVideos: [...data]
                        })
                    }).catch((error) => {
                        if (error) {
                            this.setState({
                                success: 'red', alert: "Woops :[ The form wasn't sent, please refresh and try again or reach out on social media @litatthemasjid"
                            })
                            console.log(error)
                        }
                    });
                } else if (channels[i].type == 'al-amaan') {
                    this.getContent(channels[i], tags.heartSoftner).then(data => {
                        this.setState({
                            alAmaanVideos: [...data]
                        })
                    }).catch((error) => {
                        if (error) {
                            this.setState({
                                success: 'red', alert: "Woops :[ The form wasn't sent, please refresh and try again or reach out on social media @litatthemasjid"
                            })
                            console.log(error)
                        }
                    });
                } else if (channels[i].type == 'shyk-jamel') {
                    this.getContent(channels[i], tags.heartSoftner).then(data => {
                        this.setState({
                            shykJamelVideos: [...data],
                            loading: false
                        })
                        
                    }).catch((error) => {
                        if (error) {
                            this.setState({
                                success: 'red', alert: "Woops :[ The form wasn't sent, please refresh and try again or reach out on social media @litatthemasjid"
                            })
                            console.log(error)
                        }
                    });
                }
        }
        
    }

    render () {

        let title = "We are the Product of our Environment",
        description = " But we can detox. Start by knowing who Allah is, have an environment that we can put that knowledge into practice, and a company of knowledgable people that are rooted in mercy to talk to when we need them.";

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
                                            
                                            <h1 className="title" style={{color: 'rgb(67, 144, 245)'}}>Comprehensive Youth Guidance Program<br/>
                                            <TextLoop interval={1800}>
                                                <span style={{color: 'white'}}> Coming Soon! </span>
                                                <span style={{color: 'white'}}> Knowledge of Allah</span>
                                                <span style={{color: 'white'}}> Mentorship</span>
                                                <span style={{color: 'white'}}> Activities</span>
                                            </TextLoop>{" "}
                                            </h1>
                                            
                                            {value.description ? <p className="description" style={{fontWeight:'bold'}}>{value.description}</p> : ''}
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

                                        <blockquote className="instagram-media" data-instgrm-captioned data-instgrm-permalink="https://www.instagram.com/p/B9pqLIugDUf/?utm_source=ig_embed&utm_campaign=loading" data-instgrm-version={13} style={{background: '#FFF', border: 0, borderRadius: '3px', boxShadow: '0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15)', margin: '1px', maxWidth: '540px', minWidth: '326px', padding: 0, width: 'calc(100% - 2px)'}}><div style={{padding: '16px'}}> <a href="https://www.instagram.com/p/B9pqLIugDUf/?utm_source=ig_embed&utm_campaign=loading" style={{background: '#FFFFFF', lineHeight: 0, padding: '0 0', textAlign: 'center', textDecoration: 'none', width: '100%'}} target="_blank"> <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}> <div style={{backgroundColor: '#F4F4F4', borderRadius: '50%', flexGrow: 0, height: '40px', marginRight: '14px', width: '40px'}} /> <div style={{display: 'flex', flexDirection: 'column', flexGrow: 1, justifyContent: 'center'}}> <div style={{backgroundColor: '#F4F4F4', borderRadius: '4px', flexGrow: 0, height: '14px', marginBottom: '6px', width: '100px'}} /> <div style={{backgroundColor: '#F4F4F4', borderRadius: '4px', flexGrow: 0, height: '14px', width: '60px'}} /></div></div><div style={{padding: '19% 0'}} /> <div style={{display: 'block', height: '50px', margin: '0 auto 12px', width: '50px'}}><svg width="50px" height="50px" viewBox="0 0 60 60" version="1.1" xmlns="https://www.w3.org/2000/svg" xmlnsXlink="https://www.w3.org/1999/xlink"><g stroke="none" strokeWidth={1} fill="none" fillRule="evenodd"><g transform="translate(-511.000000, -20.000000)" fill="#000000"><g><path d="M556.869,30.41 C554.814,30.41 553.148,32.076 553.148,34.131 C553.148,36.186 554.814,37.852 556.869,37.852 C558.924,37.852 560.59,36.186 560.59,34.131 C560.59,32.076 558.924,30.41 556.869,30.41 M541,60.657 C535.114,60.657 530.342,55.887 530.342,50 C530.342,44.114 535.114,39.342 541,39.342 C546.887,39.342 551.658,44.114 551.658,50 C551.658,55.887 546.887,60.657 541,60.657 M541,33.886 C532.1,33.886 524.886,41.1 524.886,50 C524.886,58.899 532.1,66.113 541,66.113 C549.9,66.113 557.115,58.899 557.115,50 C557.115,41.1 549.9,33.886 541,33.886 M565.378,62.101 C565.244,65.022 564.756,66.606 564.346,67.663 C563.803,69.06 563.154,70.057 562.106,71.106 C561.058,72.155 560.06,72.803 558.662,73.347 C557.607,73.757 556.021,74.244 553.102,74.378 C549.944,74.521 548.997,74.552 541,74.552 C533.003,74.552 532.056,74.521 528.898,74.378 C525.979,74.244 524.393,73.757 523.338,73.347 C521.94,72.803 520.942,72.155 519.894,71.106 C518.846,70.057 518.197,69.06 517.654,67.663 C517.244,66.606 516.755,65.022 516.623,62.101 C516.479,58.943 516.448,57.996 516.448,50 C516.448,42.003 516.479,41.056 516.623,37.899 C516.755,34.978 517.244,33.391 517.654,32.338 C518.197,30.938 518.846,29.942 519.894,28.894 C520.942,27.846 521.94,27.196 523.338,26.654 C524.393,26.244 525.979,25.756 528.898,25.623 C532.057,25.479 533.004,25.448 541,25.448 C548.997,25.448 549.943,25.479 553.102,25.623 C556.021,25.756 557.607,26.244 558.662,26.654 C560.06,27.196 561.058,27.846 562.106,28.894 C563.154,29.942 563.803,30.938 564.346,32.338 C564.756,33.391 565.244,34.978 565.378,37.899 C565.522,41.056 565.552,42.003 565.552,50 C565.552,57.996 565.522,58.943 565.378,62.101 M570.82,37.631 C570.674,34.438 570.167,32.258 569.425,30.349 C568.659,28.377 567.633,26.702 565.965,25.035 C564.297,23.368 562.623,22.342 560.652,21.575 C558.743,20.834 556.562,20.326 553.369,20.18 C550.169,20.033 549.148,20 541,20 C532.853,20 531.831,20.033 528.631,20.18 C525.438,20.326 523.257,20.834 521.349,21.575 C519.376,22.342 517.703,23.368 516.035,25.035 C514.368,26.702 513.342,28.377 512.574,30.349 C511.834,32.258 511.326,34.438 511.181,37.631 C511.035,40.831 511,41.851 511,50 C511,58.147 511.035,59.17 511.181,62.369 C511.326,65.562 511.834,67.743 512.574,69.651 C513.342,71.625 514.368,73.296 516.035,74.965 C517.703,76.634 519.376,77.658 521.349,78.425 C523.257,79.167 525.438,79.673 528.631,79.82 C531.831,79.965 532.853,80.001 541,80.001 C549.148,80.001 550.169,79.965 553.369,79.82 C556.562,79.673 558.743,79.167 560.652,78.425 C562.623,77.658 564.297,76.634 565.965,74.965 C567.633,73.296 568.659,71.625 569.425,69.651 C570.167,67.743 570.674,65.562 570.82,62.369 C570.966,59.17 571,58.147 571,50 C571,41.851 570.966,40.831 570.82,37.631" /></g></g></g></svg></div><div style={{paddingTop: '8px'}}> <div style={{color: '#3897f0', fontFamily: 'Arial,sans-serif', fontSize: '14px', fontStyle: 'normal', fontWeight: 550, lineHeight: '18px'}}> View this post on Instagram</div></div><div style={{padding: '12.5% 0'}} /> <div style={{display: 'flex', flexDirection: 'row', marginBottom: '14px', alignItems: 'center'}}><div> <div style={{backgroundColor: '#F4F4F4', borderRadius: '50%', height: '12.5px', width: '12.5px', transform: 'translateX(0px) translateY(7px)'}} /> <div style={{backgroundColor: '#F4F4F4', height: '12.5px', transform: 'rotate(-45deg) translateX(3px) translateY(1px)', width: '12.5px', flexGrow: 0, marginRight: '14px', marginLeft: '2px'}} /> <div style={{backgroundColor: '#F4F4F4', borderRadius: '50%', height: '12.5px', width: '12.5px', transform: 'translateX(9px) translateY(-18px)'}} /></div><div style={{marginLeft: '8px'}}> <div style={{backgroundColor: '#F4F4F4', borderRadius: '50%', flexGrow: 0, height: '20px', width: '20px'}} /> <div style={{width: 0, height: 0, borderTop: '2px solid transparent', borderLeft: '6px solid #f4f4f4', borderBottom: '2px solid transparent', transform: 'translateX(16px) translateY(-4px) rotate(30deg)'}} /></div><div style={{marginLeft: 'auto'}}> <div style={{width: '0px', borderTop: '8px solid #F4F4F4', borderRight: '8px solid transparent', transform: 'translateY(16px)'}} /> <div style={{backgroundColor: '#F4F4F4', flexGrow: 0, height: '12px', width: '16px', transform: 'translateY(-4px)'}} /> <div style={{width: 0, height: 0, borderTop: '8px solid #F4F4F4', borderLeft: '8px solid transparent', transform: 'translateY(-4px) translateX(8px)'}} /></div></div> <div style={{display: 'flex', flexDirection: 'column', flexGrow: 1, justifyContent: 'center', marginBottom: '24px'}}> <div style={{backgroundColor: '#F4F4F4', borderRadius: '4px', flexGrow: 0, height: '14px', marginBottom: '6px', width: '224px'}} /> <div style={{backgroundColor: '#F4F4F4', borderRadius: '4px', flexGrow: 0, height: '14px', width: '144px'}} /></div></a><p style={{color: '#c9c8cd', fontFamily: 'Arial,sans-serif', fontSize: '14px', lineHeight: '17px', marginBottom: 0, marginTop: '8px', overflow: 'hidden', padding: '8px 0 7px', textAlign: 'center', textOverflow: 'ellipsis', whiteSpace: 'nowrap'}}><a href="https://www.instagram.com/p/B9pqLIugDUf/?utm_source=ig_embed&utm_campaign=loading" style={{color: '#c9c8cd', fontFamily: 'Arial,sans-serif', fontSize: '14px', fontStyle: 'normal', fontWeight: 'normal', lineHeight: '17px', textDecoration: 'none'}} target="_blank">A post shared by LitAtTheMasjid (@itslitatthemasjid)</a></p></div></blockquote>
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
                                    <h2> Practical Break Down of your Journey Ahead</h2>
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
                {/* End Area  */}  

            {/* Start Area */}
            
            <div id="contact" className="fix active-dark">
                <div className="rn-contact-area ptb--120 bg_color--1">
                    <ContactThree generateContentOnly={this.generateContentOnly} generateAccountAndContent={this.generateAccountAndContent} alAmaanVideos={this.state.alAmaanVideos} islamicUniversityVideos={this.state.islamicUniversityVideos} quranVideos={this.state.quranVideos} shykJamelVideos={this.state.shykJamelVideos} loading={this.state.loading}contactImages="/assets/images/about/about-9.jpg" contactTitle="Customized Guidance Program: no matter where you at in life" />
                </div>
            </div>

            {/* End COntact Area

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
