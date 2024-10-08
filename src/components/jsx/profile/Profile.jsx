/* eslint-disable react/prop-types */

import { useEffect, useState } from "react";
// import Notification from "../notification/Notification";
import './verifyMail.css';
//import { useLocation } from "react-router-dom";
import axios from "axios";
// import logo from "../../images/logo3.png";

// const userId = localStorage.getItem("userId");


const updateEndPoint = "user/profile-update";
const endPoint = "user/get/";
const url = `https://hammerhead-app-iohau.ondigitalocean.app/`;
const userID = localStorage.getItem('userId');

const Profile = () => {
  // const { user } = props;

  const [profileData, setProfileData] = useState({
    name: '',
    gender: "",
    stream: '',
    state: '',
    number: '',
    email: '',
    dob: '',
    graduation: '',

  });
  const [proMessage, setProMessage] = useState("");
  const [Image, setImage] = useState("");
  const [profileForm, setProfileForm] = useState(false);
  const [proColor, setProColor] = useState("");

  const [isVerify, setIsVerify] = useState(false)
  const [otpPage, setOtp] = useState(false)
  // const location = useLocation();
  // const profiledata = location.state;
  const [isEditable, setIsEditable] = useState(true);

  const handleChange = (e) => {
    setProfileData({ ...profileData, [e.target.name]: e.target.value });

  };




  async function sendMail(mail) {
    try {
      const mailRes = await axios.post(`${url}mail/send/ForOtp?userId=${userID}`, {
        "email": mail
      })
      console.log(mailRes.data)
      alert(mailRes.data.msg)
    }
    catch (err) {
      console.log(err)
    }
  }





  function showProfile() {
    setOtp(true)
  }
  useEffect(() => {
    getProfile();
  }, []);
  // console.log(profileData.image);

  function setProfile() {
    const dataToSend = {
      name: profileData.name,
      gender: profileData.gender,
      stream: profileData.stream,
      number: profileData.number,
      email: profileData.email,
      state: profileData.state,
      graduation: profileData.graduation,
      dob: profileData.dob,
    };

    const Name = JSON.stringify(dataToSend.name);
    const Gender = JSON.stringify(dataToSend.gender);
    const Stream = JSON.stringify(dataToSend.stream);
    const Number = JSON.stringify(dataToSend.number);
    const Email = JSON.stringify(dataToSend.email);
    const State = JSON.stringify(dataToSend.state);
    const Graduation = JSON.stringify(dataToSend.graduation);
    // const Dob = JSON.stringify(dataToSend.dob);

    const formData = new FormData();

    // formData.append('image', profileData.image); 
    formData.append('image', Image)
    formData.append('name', name);
    formData.append('gender', gender);
    formData.append('stream', stream);
    formData.append('number', number);
    formData.append('email', email);
    formData.append('state', state);
    formData.append('dob', dob);

    formData.append('graduation', Graduation);


    axios
      .put(`${url}${updateEndPoint}?userId=${userID}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((res) => {
        console.log(res.data);
        setProMessage(res.data.msg);
        setProColor("alert alert-success");
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error", error);
        setProMessage(error.response.data.msg);
        setProColor("alert alert-danger");
      });
  }


  // function authHeader() {

  //     if (user && user.accessToken) {
  //         return { Authorization: 'Bearer ' + user.accessToken };
  //     } else {
  //         return {};
  //     }
  // }

  function handleEdit() {
    setIsEditable(false);
    setProMessage("");
  }

  function handleSave() {
    setIsEditable(true);
    setProfile();
  }

  // const getStyle = () => {

  // }


  function getProfile() {
    //const userId = "640ecfa3b947ef62d1162184";

    axios
      .get(`${url}${endPoint}${userID}`)
      .then((res) => {
        console.log(res.data);
        setProfileData(res.data.data);
        setImage(res.data.data.image)
        setProfileForm(true);
        setIsVerify(res.data.data.isVerify)
      })
      .catch((res) => {
        console.log("Error " + res);
      });
  }

  const { name, dob, email, number, stream, state, graduation, gender, image } = profileData;
  let inputString = name;
  let cleanedString = inputString.replace(/\\/g, '').replace(/"/g, '');
  let Date = dob;
  let cleanedDate = Date.replace(/\\/g, '').replace(/"/g, '');
  let Gender = gender;
  let cleanedGender = Gender.replace(/\\/g, '').replace(/"/g, '');
  let Email = email;
  let cleanedEmail = Email.replace(/\\/g, '').replace(/"/g, '');


  let Stream = stream;
  let cleanedStream = Stream.replace(/\\/g, '').replace(/"/g, '');
  let State = state;
  let cleanedState = State.replace(/\\/g, '').replace(/"/g, '');
  let Level = graduation;
  let cleanedLevel = Level.replace(/\\/g, '').replace(/"/g, '');

  return (
    <>

      <VerfiyMail
        email={email}
        otpPage={otpPage}
      />
      {proMessage !== "" && <Message msg={proMessage} color={proColor} />}

      {profileForm && (
        <div className="container profileOuter">

          <div className="card">
            <div className="info">
              <span>Edit form</span>
              {isEditable ? (
                <button id="savebutton" onClick={handleEdit}>
                  Edit
                </button>
              ) : (
                <button id="savebutton" onClick={handleSave}>
                  Save
                </button>
              )}
            </div>

            <div className="forms">
              <div className="inputs">
                {isEditable ? (
                  <img src={`${url}${Image}`} alt="logo" />
                ) : (
                  <input
                    type="file"
                    onChange={(e, profileData) => {
                      // console.log(e.target.files);
                      let fileName = e.target.files[0];
                      setImage(fileName);
                    }}
                    className="profileImgInput"
                  />
                )}

                <span>Name</span>
                <input
                  type="text"
                  name="name"
                  value={name}
                  onChange={handleChange}
                  readOnly={isEditable}
                  className="editInput"

                />
              </div>
              <div className="inputs">
                <span>Date Of Birth</span>
                <input
                  type="text"
                  name="dob"
                  value={dob}
                  onChange={handleChange}
                  readOnly={isEditable}
                  className="editInput"
                />
              </div>
              <div className="inputs">
                <span>Gender</span>
                <input
                  type="text"
                  name="gender"
                  value={gender}
                  onChange={handleChange}
                  readOnly={isEditable}
                  className="editInput"
                />
              </div>
              <div className="inputs">
                <span>Email</span>
                <div className="d-flex verify-email">
                  <input
                    type="text"
                    name="email"
                    value={email}
                    onChange={handleChange}
                    readOnly={true}
                    className="editInput"
                  />
                  {
                    !isVerify ? <span className="px-3 fs-6 py-1" onClick={() => {
                      showProfile()
                      sendMail(cleanedEmail)
                    }}>verify</span>
                      : <span className="px-2 py-1 vfd">verified</span>
                  }


                </div>
                {!isVerify && <span className="p-2 fs-6" style={{ color: 'red' }}>Please Verify the Email-Id</span>}
              </div>
              <div className="inputs">
                <span>Phone</span>
                <input
                  type="text"
                  name="number"
                  value={number}
                  onChange={handleChange}
                  readOnly={isEditable}
                  className="editInput"
                />
              </div>
              <div className="inputs">
                <span>Stream </span>
                <input
                  type="text"
                  name="stream"
                  value={cleanedStream}
                  onChange={handleChange}
                  readOnly={isEditable}
                  className="editInput"
                />
              </div>
              <div className="inputs">
                <span>State</span>
                <input
                  type="text"
                  name="state"
                  value={cleanedState}
                  onChange={handleChange}
                  readOnly={isEditable}
                  className="editInput"
                />
              </div>
              <div className="inputs">
                <span>Level</span>
                <input
                  type="text"
                  name="graduation"
                  value={cleanedLevel}
                  onChange={handleChange}
                  readOnly={isEditable}
                  className="editInput"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;

const Message = (props) => {
  const { msg, color } = props;
  return (
    <>
      <Notification msg={msg} color={color} />
    </>
  );
};





const VerfiyMail = ({ email, otpPage }) => {

  const [otp, setOtp] = useState('')
  const userId = localStorage.getItem('userId');
  // console.log(userId);
  // console.log(otp);
  function OtpSubmit() {

    axios
      .post(`https://hammerhead-app-iohau.ondigitalocean.app/otp/verify?userId=${userId}`, { 'otp': otp })
      .then((res) => {
        console.log(res.data);
        alert("User Veryfied")
        window.location.reload();
      })
      .catch((res) => {
        console.log("Error " + res);
      });
  }


  return (
    <>
      {otpPage &&
        <div className="verify-outer" >
          <div className="form-box-ht">

            <label className="form-label fs-5 text-center">Verify Your Identity</label>
            <p>Otp Sent to :- {email}</p>
            <input type="number" className="form-control form-bx-int" value={otp} onChange={(e) => setOtp(e.target.value)} />
            <span className="fs-6 px-1 py-3">Enter OTP for Verify</span>
            <div><button className="fm-sub-btn" onClick={OtpSubmit}>Submit</button></div>

          </div>
        </div>
      }
    </>
  )
}













