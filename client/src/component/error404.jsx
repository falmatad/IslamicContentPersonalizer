import React, { Component } from 'react';
import ScrollToTop from 'react-scroll-up';
import { FiChevronUp } from "react-icons/fi";
 class error404 extends Component {
    
    render() {
        return (
            <>
                {/* Start Page Error  */}
                <div className="error-page-inner bg_color--4">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="inner">
                                    <h1 className="title gradient">404!</h1>
                                    <h3 className="sub-title">Page not found</h3>
                                    <span>That Page Doesnt Exist</span>
                                    <div className="error-button">
                                        <a className="rn-button-style--2 btn-solid" href="/">Back To Personalization Form</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* End Page Error  */}

                {/* Start Back To Top */}
                <div className="backto-top">
                    <ScrollToTop showUnder={160}>
                        <FiChevronUp />
                    </ScrollToTop>
                </div>
                {/* End Back To Top */}
            </>
        )
    }
}
export default error404;
