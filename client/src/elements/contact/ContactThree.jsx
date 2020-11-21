import React, { Component } from "react";
import axios from "axios";
import moment from "moment"

import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"

class ContactThree extends Component{
    constructor(props){
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            company: '',
            detailedMessage: '',
            contactDate: moment(new Date().toISOString()).format("YYYY-MM-DD HH:mm:ss"),
            success: "",
            alert: ""
        };
        this.handelSubmit = this.handelSubmit.bind(this);
    }

     handelSubmit(e) {
        
        const {firstName, lastName, email, company, detailedMessage, contactDate} = this.state

        axios.post('https://like-hashim-backend.herokuapp.com/api/insert-form',
        {
            firstName: firstName,
            lastName: lastName,
            email: email,
            company: company,
            detailedMessage: detailedMessage,
            contactDate: contactDate
        }).then((response) => {
            if (response) {
                this.setState({
                    firstName: '',
                    lastName: '',
                    email: '',
                    company: '',
                    detailedMessage: '',
                    contactDate: moment(new Date().toISOString()).format("YYYY-MM-DD HH:mm:ss")
                })
                this.setState({success: 'green', alert: "Barak Allahu Feek, your info was sent to the database :)"})
            }
        }).catch((error) => {
                    if (error) {
                        this.setState({
                            success: 'red', alert: "Woops :[ The form wasn't sent, please refresh and try again or reach out on social media @litatthemasjid"
                        })
                    }
        });
        
        e.preventDefault()


    }
    
    render(){
        
        return(
            <div className="contact-form--1">
                <div className="container">
                    <div className="row row--35 align-items-start">
                        <div className="col-lg-6 order-2 order-lg-1">
                            <div className="section-title text-left mb--50">
                                <h2 className="title">{this.props.contactTitle}</h2>
                                <p className="description">Will this not soften our heart and make us strive to reconnect with our creator? Reach to volunteer [REMOTELY FROM HOME] out by: <a href="tel:+1(952)855-2202">(952)855-2202</a>, email:
                                    <a href="mailto:falmata.dawano@gmail.com"> falmata.dawano@gmail.com</a>, or the form below. Lets not crash the server insha Allah as it's still in development. Click the send button and wait few second to get success response!</p>
                            </div>
                            <div className="form-wrapper">
                                <form onSubmit={this.handelSubmit}>
                                { this.state.alert === '' ?
                                    <>
                                    
                                    <label htmlFor="item01">
                                        <input
                                            type="text"
                                            name="firstName"
                                            id="item01"
                                            value={this.state.firstName}
                                            onChange={(e)=>{this.setState({firstName: e.target.value});}}
                                            placeholder="First Name "
                                        />
                                    </label>

                                    <label htmlFor="item03">
                                        <input
                                            type="text"
                                            name="lastName"
                                            id="item02"
                                            value={this.state.lastName}
                                            onChange={(e)=>{this.setState({lastName: e.target.value});}}
                                            placeholder="Last Name"
                                        />
                                    </label>

                                    <label htmlFor="item02">
                                        <input
                                            type="text"
                                            name="email"
                                            id="item03"
                                            value={this.state.email}
                                            onChange={(e)=>{this.setState({email: e.target.value});}}
                                            placeholder="Your email"
                                        />
                                    </label>

                                    <label htmlFor="item04">
                                        <textarea
                                            type="text"
                                            id="item05"
                                            name="detailedMessage"
                                            value={this.state.detailedMessage}
                                            onChange={(e)=>{this.setState({detailedMessage: e.target.value});}}
                                            placeholder="A Detailed discription of your Skill or way to help with the effort..."
                                        />
                                    </label>
                                    </>
                                    : null}
                                    <div className="section-title text-left mb--50">{ this.state.success !== ""? <p style={{color: this.state.success, margin: '5px'}}>{this.state.alert}</p> : null}</div>
                                    { this.state.alert === '' ? <button className="rn-button-style--2 btn-solid" type="submit" value="submit" name="submit" id="mc-embedded-subscribe">Bismillah-Send</button>: null}
                                </form>
                            </div>
                        </div>
                        <div className="col-lg-6 order-1 order-lg-2">
                            <div className="thumbnail mb_md--30 mb_sm--30">
                                <img src={`${this.props.contactImages}`} alt="trydo"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default ContactThree;