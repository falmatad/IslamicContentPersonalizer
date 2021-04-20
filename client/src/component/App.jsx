import React, {Component} from 'react';
import ScrollToTop from 'react-scroll-up';
import { FiChevronUp } from "react-icons/fi";
import Helmet from "./common/Helmet";
import PersonalizationForm from './PersonalizationForm'
import 'react-image-lightbox/style.css';
import { trackPromise } from 'react-promise-tracker';
import axios from 'axios';

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
        return trackPromise(
        axios.get(`https://like-hashim-backend.herokuapp.com/api/get-channel/${channel.id}`
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
                        if (video.title.split(' ').some(operative => operative.replace(/\W/g, '').toLowerCase() === tags.knowledge[i])) {
                            valid = true
                        }
                    }
                } else {
                for (var i = 0; i < tags.length; i++) {
                    if (video.title.split(' ').some(operative => operative.replace(/\W/g, '').toLowerCase() === tags[i])) {
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
        }));
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

            axios.post('https://like-hashim-backend.herokuapp.com/api/post-user-and-content', [readyData]).then(response => {
                console.log(response)
            })

        return readyData
    }

    generateContentOnly(channels, tags) {
        
            for (let i=0; i < channels.length; i++) {

                if (channels[i].type === 'knowledge') {
                    
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
                } else if (channels[i].type === 'quran'){
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
                } else if (channels[i].type === 'al-amaan') {
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
                } else if (channels[i].type === 'shyk-jamel') {
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

        return (
        <div className={"active-light"}>
            <Helmet pageTitle="Create a Personalized Feed from your Masjid"/>
            
            <div id="contact" className="fix active-dark">
                <div className="rn-contact-area ptb--120 bg_color--1">
                    <PersonalizationForm generateContentOnly={this.generateContentOnly} generateAccountAndContent={this.generateAccountAndContent} alAmaanVideos={this.state.alAmaanVideos} islamicUniversityVideos={this.state.islamicUniversityVideos} quranVideos={this.state.quranVideos} shykJamelVideos={this.state.shykJamelVideos} loading={this.state.loading}contactImages="/assets/images/about/about-9.jpg" contactTitle="Customized Guidance Program: no matter where you at in life" />
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
