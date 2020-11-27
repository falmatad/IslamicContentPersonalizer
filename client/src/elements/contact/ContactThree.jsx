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
  import moment from "moment";

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

const hiddenStruggle = [
    {
        value: 'Sister'
    },
    {
        value: 'Brother'
    }

]
const selectHiddenStruggle = hiddenStruggle.map(genderType => {
    return { label: genderType.value, value: genderType.value.toLocaleLowerCase()};
});

const visibleStruggle = [
    {
        value: 'Sister'
    },
    {
        value: 'Brother'
    }

]
const selectVisibleStruggle = visibleStruggle.map(option => {
    return { label: option.value, value: option.value.toLocaleLowerCase()};
});


const deepDownLack = [
    {
        value: 'Sister'
    },
    {
        value: 'Brother'
    }

]
const selectDeepDownLack = deepDownLack.map(option => {
    return { label: option.value, value: option.value.toLocaleLowerCase()};
});


const neededKnowledge = [
    {
        value: 'Sister'
    },
    {
        value: 'Brother'
    }

]
const selectneededKnowledge = neededKnowledge.map(option => {
    return { label: option.value, value: option.value.toLocaleLowerCase()};
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
            age: '',
            gender: [],
            aboutYou: '',
            tags1: [],
            tags2: [],
            tags3: [],
            tags4: [],
            createDate: moment(new Date().toISOString()).format("YYYY-MM-DD HH:mm:ss"),
            success: "",
            alert: "",
            nextLabel: ""
        };
        this.handelSubmit = this.handelSubmit.bind(this);
        // this.filterit = this.filterit.bind(this);
        this.onClickNext = this.onClickNext.bind(this);
        this.onClickPrev = this.onClickPrev.bind(this);
        this.topNavClick = this.topNavClick.bind(this);
    }

    topNavClick(stepItem, push) {
        push(stepItem.id);
      }
    
      onClickNext(goToNext, steps, step) {
        step.isDone = true;
    
        if (steps.indexOf(step) <= 1) {
          this.setState({ nextLabel: "Next" });
        } else if (steps.indexOf(step) === 2) {
          this.setState({ nextLabel: "Submit Profile" });
          if (this.state.id) {
            this.setState({ nextLabel: "Update Profile" });
          }
        } else if (steps.indexOf(step) === 3) {
            this.setState({
                claimId: `PH${new Array(9)
                  .fill()
                  .map((a, i) => (a = i))
                  .sort(() => Math.random() - 0.5)
                  .join("")}`,
              });
          this.handelSubmit()
          this.setState({ nextLabel: "Done" });

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
        this.setState({ [selected]: value });
      }

     handelSubmit(e) {
            const commonWords = ['i','a','about','an','and','are','as','at','be','by','com','de','en','for','from','how','in','is','it','la','of','on','or','that','the','this','to','was','what','when','where','who','will','with','und','the','www'];
            const {aboutYou} = this.state
    
            // Convert to lowercase
            aboutYou = aboutYou.toLowerCase();
    
            // replace unnesessary chars. leave only chars, numbers and space
            aboutYou = aboutYou.replace(/[^\w\d ]/g, '');
    
            const result = aboutYou.split(' ');
    
            // remove $commonWords
            const aboutYouResult = result.filter(function (word) {
                return commonWords.indexOf(word) === -1;
            });
    
            // Unique words
            // const aboutYouResult = result.unique();
            
            // falmata.dawano@gmail.com

        
        const {firstName, lastName, email, gender, tags, createDate} = this.state
        console.log(firstName, lastName, email, gender, tags, createDate)
        axios.post('dasdasd',
        {
            firstName: firstName,
            lastName: lastName,
            email: email,
            gender: gender,
            tags: tags,
            aboutYouResult: aboutYouResult,
            createDate: createDate
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
                    <Step id="step1" name="Member" desc="Member Details">
                      <div className="wizard-basic-step">
                        <Form
                          className="av-tooltip tooltip-label-bottom"
                          autoComplete="off"
                        >
                          <div className="col-6 row">
                            <FormGroup className="col-12 input-group-sm">
                            <Label>First Name</Label>
                                <Input
                                    className="form-control form-control-sm"
                                    name="firstName"
                                    type="text"
                                    placeholder="Description"
                                    value={this.state.firstName || ""}
                                    onChange={(value) => {
                                        this.handleChange("firstName", value);
                                      }}
                                />
                              <Label>Last Name</Label>
                                <Input
                                    className="form-control form-control-sm"
                                    name="lastName"
                                    type="text"
                                    placeholder="Last Name"
                                    value={this.state.lastName || ""}
                                    onChange={(value) => {
                                        this.handleChange("lastName", value);
                                      }}
                                />
                              <Label>Email</Label>
                                <Input
                                    className="form-control form-control-sm"
                                    name="email"
                                    type="text"
                                    placeholder="Email"
                                    value={this.state.email || ""}
                                    onChange={(value) => {
                                        this.handleChange("email", value);
                                      }}
                                />
                            </FormGroup>
                          </div>
                        </Form>
                      </div>
                    </Step>
                    <Step id="step2" name="Visit" desc="Pharmacy Visit">
                      <div className="wizard-basic-step">
                        <Form
                          className="av-tooltip tooltip-label-bottom"
                          autoComplete="off"
                        >
                          <Fragment>
                            <div className="row">
                              <FormGroup className="col-12">
                              <Label>How old are you?</Label>
                                <Input
                                    className="form-control form-control-sm"
                                    name="age"
                                    type="text"
                                    placeholder="We want to match appropriate contents :)"
                                    value={this.state.age || ""}
                                    onChange={(value) => {
                                        this.handleChange("age", value);
                                      }}
                                />
                                <Label>Brother or a Sister?</Label>
                                <Select
                                  components={{ Input: CustomSelectInput }}
                                  className="react-select"
                                  classNamePrefix="react-select"
                                  placeholder="Select Options"
                                  value={this.state.gender}
                                  isMulti
                                  name="gender"
                                  onChange={(value) => {
                                    this.handleChange("gender", value);
                                  }}
                                  options={selectGender}
                                />
                              </FormGroup>
                            </div>
                          </Fragment>
                        </Form>
                      </div>
                    </Step>
                    <Step id="step3" name="Reports" desc="Visit Reports">
                        <div className="wizard-basic-step">
                        <Form
                          className="av-tooltip tooltip-label-bottom"
                          autoComplete="off"
                        >
                            <div className="row">
                            <FormGroup>
                                <Label>The hidden aspect of my worship I struggle with:</Label>
                                <Select
                                  components={{ Input: CustomSelectInput }}
                                  className="react-select"
                                  classNamePrefix="react-select"
                                  placeholder="Select Options"
                                  value={this.state.tags1}
                                  isMulti
                                  name="tags1"
                                  onChange={(value) => {
                                    this.handleChange("tags1", value);
                                  }}
                                  options={selectHiddenStruggle}
                                />
                                <Label>Bad habits that I struggle with:</Label>
                                <Select
                                  components={{ Input: CustomSelectInput }}
                                  className="react-select"
                                  classNamePrefix="react-select"
                                  placeholder="Select Options"
                                  value={this.state.tags2}
                                  isMulti
                                  name="tags2"
                                  onChange={(value) => {
                                    this.handleChange("tags2", value);
                                  }}
                                  options={selectVisibleStruggle}
                                />
                            </FormGroup>
                            </div>

                            <div className='row'>
                            <FormGroup>
                                <Label>Deep down, I lack:</Label>
                                <Select
                                  components={{ Input: CustomSelectInput }}
                                  className="react-select"
                                  classNamePrefix="react-select"
                                  placeholder="Select Options"
                                  value={this.state.tags3}
                                  isMulti
                                  name="tags3"
                                  onChange={(value) => {
                                    this.handleChange("tags3", value);
                                  }}
                                  options={selectDeepDownLack}
                                />
                                <Label>What I have to know about Islam ASAP</Label>
                                <Select
                                  components={{ Input: CustomSelectInput }}
                                  className="react-select"
                                  classNamePrefix="react-select"
                                  placeholder="Select Options"
                                  value={this.state.tags4}
                                  isMulti
                                  name="tags4"
                                  onChange={(value) => {
                                    this.handleChange("tags4", value);
                                  }}
                                  options={selectneededKnowledge}
                                />
                              </FormGroup>
                            </div>
                            {/* {this.state.tags &&
                            this.state.tags.length ? (
                              <div className="row">
                                <div className="col-6">
                                  <Table className="table-vm-middle">
                                    <tbody>
                                      {this.state.tags.map((tag, i) => {
                                        return (
                                          <tr key={tag.label}>
                                            <td>{tag.label}</td>
                                            <td>
                                              <FormGroup className="input-group-sm mb-0">
                                                <Input
                                                  className="form-control form-control-sm"
                                                  name="visitProcedureDescription"
                                                  type="text"
                                                  placeholder="Description"
                                                  value={tag.description || ""}
                                                  onChange={(e) => {
                                                    let tags = [
                                                      ...this.state.tags,
                                                    ];
                                                    tags[i].description =
                                                      e.target.value;
                                                    this.setState({
                                                      tags,
                                                    });
                                                  }}
                                                />
                                              </FormGroup>
                                            </td>
                                          </tr>
                                        );
                                      })}
                                    </tbody>
                                  </Table>
                                </div>
                              </div>
                            ) : null} */}
                            </Form>
                      </div>
                    </Step>
                    <Step id="step4" name="Reports" desc="Visit Reports">
                    <div className="wizard-basic-step">
                    <FormGroup className="col-7">
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
                    <Step id="step5" name="Summary" desc="Claim Summary">
                      <div className="wizard-basic-step text-left">
                        <Row>
                          <Colxx xxs="12" className="mb-4">
                            <CardBody className="d-flex flex-column justify-content-between mb-3 invoice-contents">
                              <div className="d-flex flex-column">
                                <div className="d-flex flex-row justify-content-between pt-2 pb-2">
                                  <div className="d-flex align-self-center">
                                    <img
                                      src="/assets/img/dh-logo.svg"
                                      alt="Logo"
                                      className="logo-single"
                                    />
                                  </div>
                                  <div className="d-flex w-30 text-right align-self-center flex-column">
                                    <h3>DEMO PERSONALIZED PAGE - Comprihensive Guidance Program</h3>
                                    <p className="text-small text-semi-muted mb-0">
                                      Minnetonka, Minnesota
                                      <br />
                                      +1 952 855 2202
                                    </p>
                                  </div>
                                </div>
                                <div className="border-bottom pt-4 mb-3" />
                                <div className="d-flex flex-column p-2 bg-semi-muted mb-3 justify-content-center text-center">
                                  <h4 className="mb-0">
                                    Profile ID {this.state.id}
                                  </h4>
                                  <p className="text-semi-muted mb-0">
                                    Created:{" "}
                                    {moment().format("MM/DD/YYYY - LT").toString()}
                                  </p>
                                </div>
                                <div className="d-flex flex-column border mb-2 pt-4">
                                  <h2 className="mb-3 text-center">Visit Summary</h2>
                                  <div className="d-flex flex-row justify-content-between mb-3">
                                    <div className="d-flex flex-column w-70 mr-2 p-2 bg-semi-muted">
                                      <h4 className="text-semi-muted">
                                        Details:&#32;
                                      </h4>
                                      <p className="mb-0">
                                        {this.state.firstName}{" "}
                                        {this.state.lastName}
                                      </p>
                                      <h4 className="text-semi-muted">
                                        Profile Level:&#32;
                                      </h4>
                                        <p className="mb-0"></p>
                                    </div>
                                    <div className="d-flex flex-column w-70 mr-2 p-2 bg-semi-muted">
                                      <h4 className="text-semi-muted">
                                          Group:&#32;
                                        </h4>
                                          <p className="mb-0"></p>
                                    </div>
                                  </div>
                                  {this.state.tags1 &&
                                  this.state.tags1.length ? (
                                    <Table borderless>
                                      <thead>
                                        <tr>
                                          <th className="text-muted text-extra-small mb-2">
                                            Heart Softners
                                          </th>
                                          <th className="text-muted text-extra-small mb-2">
                                            Knowledge Collage 
                                          </th>
                                          <th className="text-muted text-extra-small mb-2">
                                            Quran Centeral
                                          </th>
                                          <th className="text-muted text-extra-small mb-2">
                                            Reminders
                                          </th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                            <tr>
                                              <td></td>
                                              <td></td>
                                              <td></td>
                                              <td></td>
                                            </tr>
                                      </tbody>
                                    </Table>
                                  ) : null}
                                </div>
                              </div>
      
                              <div className="d-flex flex-column">
                                <Table className="d-flex justify-content-end">
                                  <tbody>
                                    <tr>
                                      <td className="text-semi-muted">
                                        Be Truthful to Yourself: Here is how much your engaging
                                      </td>
                                      <td className="text-right">
                                        {/* ${" "}
                                        {this.state.dispensedDrugs !== null
                                          ? this.state.dispensedDrugs.reduce(
                                              function (acc, drug) {
                                                const minusCopay = drug.unitPrice - copay
                                                return (
                                                  parseFloat(acc) + parseFloat(minusCopay)
                                                );
                                              },
                                              0
                                            )
                                          : "0"} */}
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
                        <h2 className="mb-2">Success!</h2>
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