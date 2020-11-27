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
                                            <div>
                                                <span style={{color: 'white'}}> Appreciate the Honor of having </span>
                                            </div>
                                            <ul>
                                                <li>
                                                    A religion so strong, it's interconnected and weaved to never fail
                                                </li>

                                                <li>
                                                     A Perfect and High Lord yet Subtle and Merciful
                                                </li>

                                                <li>
                                                    A Perfect Prophet yet humble and low so he can be followed
                                                </li>

                                                <li>
                                                    2 lights that never die Quran and Sunnah
                                                    
                                                </li>
                                            </ul>
                                        </div>
                                    </TabPanel>

                                    <TabPanel>
                                       <div className="single-tab-content">
                                            <div>
                                                <span style={{color: 'white'}}> Caring for one another is not a sign of weakness  </span>
                                            </div>
                                           <ul>
                                               <li>
                                                   <p> "There has certainly come to you a Messenger from among yourselves. Grievous to him is what you suffer; [he is] concerned over you [i.e., your guidance] and to the believers is kind and merciful. (Quran: 9:128)" </p> 
                                               </li>
                                               
                                           </ul>
                                       </div>
                                    </TabPanel>

                                    <TabPanel>
                                       <div className="single-tab-content">
                                                <div>
                                                   <span style={{color: 'white'}}> Authentic and Relivent Meetup Ideas </span> 
                                               </div>
                                           <ul>
                                               <li>
                                                   <a>By Gender<span> - Divided into Activities and Events that cater to both genders</span></a>
                                               </li>
                                               <li>
                                                   <a>By Interest<span> - Based on Your Interest</span></a> 
                                               </li>
                                               <li>
                                                   <a>By Schedule<span> - Based on Your Schedule</span></a> 
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