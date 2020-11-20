import React, { Component } from "react";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

class TabsTwo extends Component{
    render(){
        let 
        tab1 = "Knowledge of Allah",
        tab2 = "Mentorship",
        tab3 = "Activities";
        const { tabStyle } = this.props
        return(
            <div>
                {/* Start Tabs Area */}
                <div className="tabs-area">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <Tabs>
                                    <TabList  className={`${tabStyle}`}>
                                        <Tab>{tab1}</Tab>
                                        <Tab>{tab2}</Tab>
                                        <Tab>{tab3}</Tab>
                                    </TabList>

                                    <TabPanel>
                                        <div className="single-tab-content">
                                            <ul>
                                                <li>
                                                    <a href="/service">The Religion of Islam</a>
                                                    A religion so strong, it's interconnected and weaved to never fail better your designer jacket
                                                </li>

                                                <li>
                                                    <a href="/service"> A Perfect and High Lord yet Subtle and Merciful </a>
                                                    A lord that so many lied against and a lord that so many don't know
                                                </li>

                                                <li>
                                                    <a href="/service"> A Perfect Prophet yet humble and low so he can be followed</a>
                                                    Muhammed The Son of Abdullah - He was even decreed to be the greatest Human being on google's list
                                                </li>

                                                <li>
                                                    <a href="/service"> An Ummah that's lost but yet with 2 lights that never die</a>
                                                    Quran and Sunnah
                                                </li>
                                            </ul>
                                        </div>
                                        <codersrank-widget style={{"--header-bg-color": "rgb(152 154 165)"}} username="falmatad"></codersrank-widget>
                                    </TabPanel>

                                    <TabPanel>
                                       <div className="single-tab-content">
                                           <ul>
                                               <li>
                                                   <a href="/service"> Software Engineer <span> - Zefa Consulting Inc</span></a> 03/2020 - Current
                                               </li>
                                               <li>
                                                   <a href="/service"> Self Employed Coding Instructor <span> EveryoneShouldCode LLC</span></a> 06/2019 - Current
                                               </li>
                                               <li>
                                                   <a href="/service"> Public School Coding Instructor <span> - Youth Enrichment League</span></a> 10/2018 - Current
                                               </li>
                                           </ul>
                                       </div>
                                    </TabPanel>

                                    <TabPanel>
                                       <div className="single-tab-content">
                                           <ul>
                                               <li>
                                                   <a href="/service">Web Development<span> - Lambda School, Remote Agile Learning</span></a> 09/2019 - 01/2020
                                               </li>
                                           </ul>
                                       </div>
                                    </TabPanel>
                                    
                                </Tabs>
                            </div>
                        </div>
                    </div>
                </div>
                {/* End Tabs Area */}
            </div>
        )
    }
}



export default TabsTwo;