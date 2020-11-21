import React, { Component } from "react";
import {Helmet} from 'react-helmet'

class PageHelmet extends Component{
    render(){
        return(
            <React.Fragment>
                <Helmet>
                    <title>Comprehensive Youth Guidance Program</title>
                    <meta name="description" content="The Comprehensive Youth Guidance Program" />
                </Helmet>
            </React.Fragment>
        )
    }
}


export default PageHelmet;
