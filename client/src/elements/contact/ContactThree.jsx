import React, { Component, Fragment } from "react";
import axios from "axios";
import {
    Card,
    CardBody,
    FormGroup,
    Label,
    Form,
    Input,
    Table,
    Row,
  } from "reactstrap";
  import {
    Colxx,
  } from "../../component/common/CustomBootstrap";
  import Select from "react-select";
  import { Wizard, Steps, Step } from "react-albus";
  import ReactQuill from "react-quill";
  import "react-quill/dist/quill.snow.css";
  import "react-quill/dist/quill.bubble.css";
  import CustomSelectInput from "../../component/common/CustomSelectInput";
  import { TopNavigation } from "../../component/wizard/TopNavigation";
  import { BottomNavigation } from "../../component/wizard/BottomNavigation";
  import ReactPlayer from 'react-player/lazy';
  import moment from "moment";
import TagsInput from "react-tagsinput";
import "react-tagsinput/react-tagsinput.css";

import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import { FaGlassMartiniAlt } from "react-icons/fa";

const quillModules = {
    toolbar: [
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image"],
      ["clean"],
    ],
  };
  
  const quillFormats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
  ];

const genders = [
    {
        value: 'Sister'
    },
    {
        value: 'Brother'
    }

]
const selectGender = genders.map(genderType => {
    return { label: genderType.value, value: genderType.value.toLocaleLowerCase()};
});

const neededKnowledge = [
    {
        label: 'The knowledge of what Imaan is and Who Allah is',
        value: 'Tawheed'
    },
    {
        label: 'The knowledge of How to prepare The heart for Imaan',
        value: 'Tazkiya'
    },
    {
        label: 'The knowledge of how to worship Allah',
        value: 'Zaad Zad'
    },
    {
        label: "The knowledge of how Islam takes society out of darkness",
        value: 'Maqasid'
    },
    {
        label: 'The knowledge of how to understand the Quran',
        value: 'Tafseer'
    },
    {
        label: 'The knowledge of Islamic History',
        value: 'Seerah'
    },
    {
        label: 'The knowledge of how to Convey Islam to Muslims and Non Muslims',
        value: 'Dawa Dawah Daawa'
    },
    {
        label: 'The Wnowledge of Why the Scholars Disagreed',
        value: 'Al-Khilaf Disagreements'
    }
]
const selectneededKnowledge = neededKnowledge.map(subject => {
    return { label: subject.label, value: subject.value.toLocaleLowerCase()};
});

class ContactThree extends Component{
    constructor(props){
        super(props);
        this.state = {
            id:'',
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            gender: '',
            aboutYou: '',
            tags1: [],
            tags2: [],
            tags3: [],
            nextLabel: "",
            userType: 'No Account',
            feedBack: '',
            success: '',
            alert: ''
        };
        this.handelSubmit = this.handelSubmit.bind(this);
        this.onClickNext = this.onClickNext.bind(this);
        this.onClickPrev = this.onClickPrev.bind(this);
        this.topNavClick = this.topNavClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.onInputChange = this.onInputChange.bind(this)
        this.handleFeedBack = this.handleFeedBack.bind(this)
    }

    topNavClick(stepItem, push) {
        push(stepItem.id);
      }
    
      onClickNext(goToNext, steps, step) {
        step.isDone = true;
        if (steps.indexOf(step) <= 0) {
            this.setState({ nextLabel: "Next" });
        } else if (steps.indexOf(step) <= 1) {
          this.setState({ nextLabel: "Next" });
        } else if (steps.indexOf(step) === 2) {
            this.handelSubmit()
          this.setState({ nextLabel: "Send Us FeedBack!" });
          if (this.state.id) {
            this.setState({ nextLabel: "Update Profile" });
          }
        } else if (steps.indexOf(step) === 4) {
          this.handleFeedBack()
          this.setState({ nextLabel: "Done!" });
        }
    
        // if (steps.length - 1 <= steps.indexOf(step)) {
        //   this.props.history.push("/app/claims/pharmacy");
        // }
        goToNext();
      }
    
      onClickPrev(goToPrev, steps, step) {
        if (steps.indexOf(step) <= 0) {
          return;
        }
        if (this.state.nextLabel === "Done") {
          return;
        } else {
          this.setState({ nextLabel: "Next" });
        }
        goToPrev();
      }
    
      handleChange(selected, value) {
        this.setState({ [selected]: value});
      }
      
      onInputChange(e) {
          const value = e.target.value

        this.setState({[e.target.name]: value})
      }
     handleFeedBack() {
        const {feedBack} = this.state
        if(feedBack !== '') {
            axios.post('https://like-hashim-backend.herokuapp.com/api/feed-back-form',
        {
            feedBack: feedBack
        }).then((response) => {
            if (response) {
                this.setState({
                    feedBack: ''
                })
                this.setState({success: 'green', alert: "Thanks, your info was sent to me :)"})
            }
        }).catch((error) => {
                    if (error) {
                        this.setState({
                            success: 'red', alert: "Woops :[ The form wasn't sent, please refresh and try again"
                        })
                    }
        });
        }
       
     }
     handelSubmit(e) {
         
            const commonWords = ['i','a','about','an','and','are','as','at','be','by','com','de','en','for','from','how','in','is','it','la','of','on','or','that','the','this','to','was','what','when','where','who','will','with','und','the','www'];
            const {firstName, lastName, email, gender, tags1, tags2, tags3, userType, aboutYou} = this.state
           
            if (firstName && lastName && email && tags1 && tags2 && tags3 && aboutYou) {

            // Convert to lowercase
            let aboutYouLowerCase = aboutYou.toLowerCase();
    
            // replace unnesessary chars. leave only chars, numbers and space
            aboutYouLowerCase = aboutYouLowerCase.replace(/[^\w\d ]/g, '');
    
            const result = aboutYouLowerCase.split(' ');
    
            // remove $commonWords
            const aboutYouResult = result.filter(function (word) {
                return commonWords.indexOf(word) === -1;
            });
            
            // Unique words
            // const aboutYouResult = result.unique();

            let user = { firstName, lastName, email, gender}

            let mappedTags3 = tags3.map(tag => {
                let tempArray = tag.value.split(' ')
                return tempArray
            }).flat(2)

            let allTags = {heartSoftner: [...tags1, ...tags2, ...aboutYouResult], knowledge: [...mappedTags3]}

            const channels = [{type: 'al-amaan', id: 'UC7hxIHncBbcHKUxGM67KZ4g'}, {type: 'shyk-jamel', id: 'UCpOuNtadjyviGvy7p4Va5tA'}, {type: 'quran', id: 'UCPZvLwo3dIUoRMGSRPGWY3A'}, {type: 'knowledge', id: 'UC8DILJwxM8wNTz6XDo2ZbNw'}]
            
            console.log(allTags.knowledge)
            
        
            if (userType == 'No Account') {
                this.props.generateContentOnly(channels, allTags)
            } else {
                this.props.generateAccountAndContent(channels, user, allTags)
            }

        } else {
            
            return
        }

    }
    
    render(){

        return (
            <Card className="card">
              <CardBody className="wizard wizard-default">
                <Wizard>
                  <TopNavigation
                    className="justify-content-center"
                    disableNav={true}
                    topNavClick={this.topNavClick}
                  />
                  <Steps>
                    <Step id="step1" name="Basic Info">
                      <div className="wizard-basic-step">
                        <Form
                          className="av-tooltip tooltip-label-bottom"
                          autoComplete="off"
                        >
                          <div className="col-12 row">
                            <FormGroup className="col-6 input-group-sm">
                            <Label>First Name</Label>
                                <Input
                                    className="form-control form-control-sm"
                                    name="firstName"
                                    type="text"
                                    placeholder="First Name"
                                    value={this.state.firstName}
                                    onChange={this.onInputChange}
                                />
                              <Label>Last Name</Label>
                                <Input
                                    className="form-control form-control-sm"
                                    name="lastName"
                                    type="text"
                                    placeholder="Last Name"
                                    value={this.state.lastName}
                                    onChange={this.onInputChange}
                                />
                                <Label>Email</Label>
                                <Input
                                    className="form-control form-control-sm"
                                    name="email"
                                    type='email'
                                    placeholder="Email"
                                    value={this.state.email}
                                    onChange={this.onInputChange}
                                />
                            </FormGroup>
                        
                            <FormGroup className="col-6 input-group-sm">
                                <Label>Brother or a Sister?</Label>
                                <Select
                                  components={{ Input: CustomSelectInput }}
                                  className="react-select"
                                  classNamePrefix="react-select"
                                  placeholder="Select Options"
                                  value={this.state.gender}
                                  name="gender"
                                  onChange={(value) => {
                                    this.handleChange("gender", value);
                                  }}
                                  options={selectGender}
                                  style={{height:'5px'}}
                                />
                            </FormGroup>
                        </div>
                        </Form>
                      </div>
                    </Step>
                    <Step id="step2" name="Personalize">
                        <div className="wizard-basic-step">
                        <Form
                          className="av-tooltip tooltip-label-bottom"
                          autoComplete="off"
                        >
                            <div className="col-12 row">
                            <FormGroup className="col-6">
                                <Label>Aspect of my Religion I struggle with:</Label>
                                <TagsInput
                                    value={this.state.tags1}
                                    name="tags1"
                                    onChange={(value) => {
                                        this.handleChange("tags1", value);
                                      }}
                                    inputProps={{ placeholder:'Type a single word and hit enter. Please watch spelling' }}                                
                                    />
                                <Label>The state of my heart and soul right now:</Label>
                                <TagsInput
                                    value={this.state.tags2}
                                    name="tags2"
                                    onChange={(value) => {
                                        this.handleChange("tags2", value);
                                      }}
                                    inputProps={{ placeholder:'Type a single word and hit enter. Please watch spelling' }}
                                />
                            </FormGroup>
                            
                            <FormGroup className="col-6">
                                <Label>I should really learn about: (Start with 1 or 2 subjects..you can always update your profile)</Label>
                                <Select
                                  components={{ Input: CustomSelectInput }}
                                  className="react-select"
                                  classNamePrefix="react-select"
                                  placeholder="Select Options"
                                  value={this.state.tags3}
                                  name="tags3"
                                  onChange={(value) => {
                                    this.handleChange("tags3", value);
                                  }}
                                  isMulti
                                  options={selectneededKnowledge}
                                />
                              </FormGroup>
                            </div>
                            </Form>
                      </div>
                    </Step>
                    <Step id="step3" name="Describe Youself">
                    <div className="wizard-basic-step">
                    <FormGroup className="col-12">
                        <Label>If you are the type to describe your situation in a written format, poar your heart out Here (we do not save any of your response, only your personalized page in the coming releases of this service for you to return to your profile next time.)</Label>
                          <ReactQuill
                            theme="snow"
                            value={this.state.aboutYou}
                            onChange={(value) => {
                              this.handleChange("aboutYou", value);
                            }}
                            modules={quillModules}
                            formats={quillFormats}
                          />
                        </FormGroup>
                      </div>
                    </Step>
                    <Step id="step4" name="Result Summary">
                      <div className="wizard-basic-step text-left">
                        <Row>
                          <Colxx xxs="12" className="mb-4">
                            <CardBody className="d-flex flex-column justify-content-between mb-3 invoice-contents">
                              <div className="d-flex flex-column">
                                <div className="d-flex flex-row justify-content-between pt-2 pb-2">
                                  <div className="d-flex align-self-center">
                                    <h3 style={{color: 'rgb(67, 144, 245)', marginTop:'20px'}}>PUBLIC DEMO TEST</h3>
                                  </div>
                                  <div className="d-flex w-30 text-right align-self-center flex-column">
                                    <h3 style={{color: 'rgb(67, 144, 245)', marginTop:'20px'}}>Comprihensive Guidance Program</h3>
                                    <p className="text-small text-semi-muted mb-0">
                                      Minnetonka, Minnesota
                                      <br />
                                      +1 952 855 2202
                                    </p>
                                  </div>
                                </div>
                                <div className="border-bottom pt-4 mb-3" />
                                <div className="d-flex flex-column p-2 bg-semi-muted mb-3 justify-content-center text-center">
                                  <p className="text-semi-muted mb-0">
                                    DEMO Profile Created:{" "}
                                    {moment().format("MM/DD/YYYY - LT").toString()}
                                  </p>
                                </div>
                                <div className="d-flex flex-column border mb-2 pt-4">
                                  <h4 style={{color: 'rgb(67, 144, 245)', marginTop:'20px'}} className="mb-3 text-center">Double Check Your Personalized Content. Currently this is in Beta stage. Final version will be out soon</h4>
                                  <div className="d-flex flex-row justify-content-between mb-3">
                                    <div className="d-flex flex-column w-70 mr-2 p-2 bg-semi-muted">
                                      <h4 className="text-muted text-extra-small mb-2">
                                        Details:&#32;
                                      </h4>
                                      <p className="mb-0">
                                        {this.state.firstName}{" "}
                                        {this.state.lastName}
                                      </p>
                                      <h4 className="text-muted text-extra-small mb-2">
                                        Profile Type:&#32;
                                      </h4>
                                        <p className="mb-0">{this.state.userType}</p>
                                    </div>
                                    <div className="d-flex flex-column w-70 mr-2 p-2 bg-semi-muted">
                                      <h4 className="text-semi-muted">
                                          Group:&#32;
                                        </h4>
                                          <p className="mb-0"></p>
                                    </div>
                                  </div>
                                  
                                    <Table borderless >
                                      <thead>
                                        <tr>
                                          <th className="text-muted text-extra-small mb-2">
                                            Heart Softners
                                          </th>
                                          <th className="text-muted text-extra-small mb-2">
                                            Long Term Knowledge 
                                          </th>
                                          <th className="text-muted text-extra-small mb-2">
                                            Ayat of Al-Quran
                                          </th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                      {this.state.tags1.length &&
                                        this.state.tags2.length && this.state.tags3 ? (
                                            <tr>
                                                <td style={{height: '0',
                                                        overflow: 'hidden',
                                                        paddingTop: '</tr>591.44px / 1127.34px * 100%',
                                                        position: 'relative'}}>
                                                { this.props.alAmaanVideos.length && this.props.shykJamelVideos.length?
                                                    
                                                  <ReactPlayer
                                                    url={[...this.props.alAmaanVideos.map(alvideo => {
                                                        return alvideo.url
                                                    }), ...this.props.shykJamelVideos.map(shykvideo => {
                                                        return shykvideo.url
                                                    })]}
                                                    
                                                    width='100%'
                                                    height='100%'
                                                    controls={true}
                                                    /> : <p>Please go back and create more Personalized Tags</p>
                                                }
                                                </td>
                                                <td
                                                style={{height: '0',
                                                overflow: 'hidden',
                                                paddingTop: '</tr>591.44px / 1127.34px * 100%',
                                                position: 'relative'}}>
                                                    {this.props.islamicUniversityVideos.length ?
                                                  <ReactPlayer
                                                    url={this.props.islamicUniversityVideos?.map(univideo => {
                                                        return univideo.url
                                                    })}
                                                    width='100%'
                                                    height='100%'
                                                    controls={true}
                                                    /> : <p>Please go back and create more Personalized Tags</p>
                                                }
                                                </td>
                                                <td
                                                style={{height: '0',
                                                overflow: 'hidden',
                                                paddingTop: '</tr>591.44px / 1127.34px * 100%',
                                                position: 'relative'}}>
                                                 { this.props.quranVideos.length ? <ReactPlayer
                                                    url={this.props.quranVideos.map(quranVideo => {
                                                        return quranVideo.url
                                                    })}
                                                    width='100%'
                                                    height='100%'
                                                    controls={true}
                                                    />
                                                    : <p>Please go back and create more Personalized Tags</p>}
                                                </td>
                                            </tr>
                                            ) : null}
                                      </tbody>
                                    </Table>
                                  
                                </div>
                              </div>
      
                              <div className="d-flex flex-column">
                                <Table className="d-flex justify-content-end">
                                  <tbody>
                                    <tr>
                                      <td className="text-semi-muted">
                                        Be Truthful to Yourself
                                      </td>
                                    </tr>
                                  </tbody>
                                </Table>
                                <p className="text-muted text-small text-center">
                                  This profile was created based on your response. If curated list does not match you, please try again{" "}
                                </p>
                              </div>
                            </CardBody>
                          </Colxx>
                        </Row>
                      </div>
                    </Step>
                    <Step id="step5" hideTopNav={true} hideBottomNav={true}>
                      <div className="wizard-basic-step text-center">
                        <h2 style={{color: 'rgb(67, 144, 245)', marginTop:'20px'}} className="mb-2">Please Give Us Feedback!</h2>
                        <Form>
                        <FormGroup>
                                <Input
                                    className="form-control form-control-sm"
                                    name="feedBack"
                                    type="text"
                                    placeholder="Feed Back"
                                    value={this.state.feedBack}
                                    onChange={this.onInputChange}
                                />
                        </FormGroup>
                        </Form>
                        {/* <p>
                          {this.state.id
                            ? "Claim updated successfully!"
                            : "Claim created successfully!"}
                        </p> */}
                      </div>
                    </Step>
                  </Steps>
      
                  <BottomNavigation
                    onClickNext={this.onClickNext}
                    onClickPrev={this.onClickPrev}
                    className="justify-content-center"
                    prevLabel="Previous"
                    nextLabel={this.state.nextLabel || "Next"}
                  />
                </Wizard>
              </CardBody>
            </Card>
          );
    }
}
export default ContactThree;