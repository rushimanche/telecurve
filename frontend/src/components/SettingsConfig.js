import '../App.css';
import '../components/styles/Settings.css';
import "bootstrap/dist/css/bootstrap.min.css";
import axios from 'axios';
import React, { useCallback, useState, useEffect, useRef } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Select, { components } from "react-select";

<script src="https://unpkg.com/boxicons@latest/dist/boxicons.js"></script>

function Settings(props) {

  const [options, setOptions] = useState([]);
  const [files, setFiles] = useState([]);
  const [voicemail, setVoicemail] = useState();
  const [email, setEmail] = useState();
  const [callForwardNumber, setCallForwardNumber] = useState();
  const [selectedVoicemailOption, setSelectedVoicemailOption] = useState(null);
  const customer_id = props.customer_id;
  const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/


  useEffect(() => {
    async function getFiles() {
      
      var data = {
        "customer-id": customer_id
      };
      let response = await axios.post(`http://localhost:2000/files/get-files`, data)
      //let response = await axios.post(`/files/get-files`, data)
      for (let i = 0; i < response.data.length; i++) {
        setOptions(oldArray => [...oldArray, {'value': response.data[i]['id'], 'label': response.data[i]['name']}])
      }
      setFiles(response.data)
    }

    async function getVoicemail() {
          
      var data = {
        "customer-id": customer_id
      };
      let response = await axios.post(`http://localhost:2000/files/get-voicemail`, data)
      //let response = await axios.post(`/files/get-voicemail`, data)
      if (response.data[0]){
        setVoicemail(response.data[0]['voicemail'])
      }
    }


    async function getCallForwardingNumber() {
          
      var data = {
        "customer_id": customer_id
      };

      let response = await axios.post(`http://localhost:2000/accounts/get-call-forwarding-number`, data)
      //let response = await axios.post(`/accounts/get-call-forwarding-number`, data)
      if (response.data[0]){
        setCallForwardNumber(response.data[0]['call_forward'])
      }
    }

    async function getEmail() {
          
      var data = {
        "customer_id": customer_id
      };

      let response = await axios.post(`http://localhost:2000/accounts/get-email`, data)
      //let response = await axios.post(`/accounts/get-email`, data)
      if (response.data[0]){
        setEmail(response.data[0]['email'])
      }
    }

    getFiles()
    getVoicemail()
    getEmail()
    getCallForwardingNumber()
  }, []);

  var voiceresult = (options.find(x => x.value === voicemail));
  if(voiceresult){
      setVoicemail(voiceresult && voiceresult['label']);
  }

  const customStyles = {
    control: (base, state) => ({
      ...base,
      background: "#fff",
      width: "60%",
      display: 'flex',
      marginLeft: '20%',
      // match with the menu
      borderRadius: state.isFocused ? "20px 20px 20px 20px" : 20,
      // Overwrittes the different states of border
      borderColor: state.isFocused ? "black" : "white",
      // Removes weird border around container
      boxShadow: state.isFocused ? null : null,
      "&:hover": {
        // Overwrittes the different states of border
        borderColor: state.isFocused ? "black" : "white"
      }
    }),
    menu: base => ({
      ...base,
      // override border radius to match the box
      borderRadius: 20,
      width: "60%",
      marginLeft: '20%',
      // kill the gap
      marginTop: 0
    }),
    menuList: base => ({
      ...base,
      // kill the white space on first and last option
      padding: 0
    })
};

const updateVoicemail = async (selectedOption) => {
    setSelectedVoicemailOption(selectedOption)
    var data = {
        "customer-id": customer_id,
        "sound-id": selectedOption['value']
    };
    let response = await axios.post(`http://localhost:2000/files/update-voicemail`, data);
    //let response = await axios.post(`/files/update-voicemail`, data);
    setVoicemail(selectedOption)
}

const updateEmail = async (email) => {
  var data = {
      "customer_id": customer_id,
      "organizationEmail": email
  };
  let response = await axios.post(`http://localhost:2000/accounts/patch-user`, data);
  //let response = await axios.post(`/accounts/patch-user`, data);
  setEmail(email)
}



  return (
    <div className="SettingsConfig">
        <div className="SettingsConfigBorder">
            <div className="SettingsConfigTitle">
                Settings
            </div>

            <div className="SettingsConfigCallForwardTitle">
                Call Forwarding
            </div>

            <div className="SettingsConfigCallForwardDescription">
                This is the number that the caller will be transferred to if they press 99 on the call
            </div>


            <div className="SettingsConfigCallForwardInput">
              <Formik
                initialValues={{
                    call_forward: callForwardNumber,
                }}
                validationSchema={Yup.object().shape({
                  call_forward: Yup.string()
                  .matches(phoneRegExp, 'Phone number is not valid')
                  .min(10, "Phone number is too short")
                  .max(10, "Phone number is too long"),
                })}
                onSubmit={(fields, {resetForm}) => {
                    var data = {
                        "customer_id": customer_id,
                        "call_forward": '+1' + fields.call_forward,
                    };
                  
                    
                    axios.post(`http://localhost:2000/accounts/update-call-forward`, data).then(function(result) {
                        if(result){
                            setCallForwardNumber(data.call_forward)
                            alert('Call forward number successfully updated!');
                            resetForm();
                        }
                        else{
                            alert('Error updating call forward number! Please try again.');
                            resetForm();
                        }
                      });;
                    
                    
                    /*
                    axios.post(`/accounts/update-call-forward`, data).then(function(result) {
                        if(result){
                            alert('Call forward number successfully updated!');
                            resetForm();
                        }
                        else{
                            alert('Error updating call forward number! Please try again.');
                            resetForm();
                        }
                      });;
                    */
                    
                    fields = {}
                }}
                render={({ errors, status, touched }) => (
                    <Form>
                        <div className="form-group">
                          <br>
                          </br>
                            <Field name="call_forward" type="text" placeholder={callForwardNumber} className={'form-control' + (errors.call_forward && touched.call_forward ? ' is-invalid' : '')} />
                            <ErrorMessage name="call_forward" component="div" className="invalid-feedback" />
                        </div>
                        <br></br>
                        <div className="form-group">
                            <button type="submit" className="btn btn-light mr-2">Submit</button>
                        </div>
                    </Form>
                )}
              />
            </div>
            
            <br>
            </br>
            <div className="SettingsConfigVoicemailAudioTitle">
                Voicemail
            </div>

            <div className="SettingsConfigVoicemailAudioDescription">
                Select what audio file you would like for your voicemail
            </div>
            
            <br>
            </br>
            <div className="VoicemailDropdown">
              <Select styles={customStyles} 
                      options={options} 
                      placeholder={voicemail} 
                      value={selectedVoicemailOption}
                      onChange={updateVoicemail}
              />
              <br>
              </br>
            </div>
            <div className="SettingsConfigVoicemailEmailDescription">
                Enter the email you would like to forward voicemails to
            </div>
            <div className="VoicemailEmailInput">
              <Formik
                initialValues={{
                    email: email,
                }}
                validationSchema={Yup.object().shape({
                  email: Yup.string()
                  .email()
                  .required('Email is required'),
                })}
                onSubmit={(fields, {resetForm}) => {
                    var data = {
                        "customer_id": customer_id,
                        "organizationEmail": fields.email,
                    };
                    
                    
                    axios.post(`http://localhost:2000/accounts/patch-user`, data).then(function(result) {
                        if(result){
                            setEmail(data.email)
                            alert('Voicemail email successfully updated!');
                            resetForm();
                        }
                        else{
                            alert('Error updating voicemail email! Please try again.');
                            resetForm();
                        }
                      });;
                    
                    
                    /*
                    axios.post(`/accounts/patch-user`, data).then(function(result) {
                      if(result){
                          setEmail(data.email)
                          alert('Voicemail email successfully updated!');
                          resetForm();
                      }
                      else{
                          alert('Error updating voicemail email! Please try again.');
                          resetForm();
                      }
                    });;
                    */

                    fields = {}
                }}
                render={({ errors, status, touched }) => (
                    <Form>
                        <div className="form-group">
                          <br>
                          </br>
                            <Field name="email" type="text" placeholder={email} className={'form-control' + (errors.email && touched.email ? ' is-invalid' : '')} />
                            <ErrorMessage name="email" component="div" className="invalid-feedback" />
                        </div>
                        <br></br>
                        <div className="form-group">
                            <button type="submit" className="btn btn-light mr-2">Submit</button>
                        </div>
                    </Form>
                )}
              />
              <br>
              </br>
              <br>
              </br>
            </div>
        </div>
    </div>
  );
}

export default Settings;
