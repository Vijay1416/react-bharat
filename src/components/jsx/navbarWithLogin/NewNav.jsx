import React, { useState } from "react";
import "./NewNavbar.css";
import Collapsible from "react-collapsible";
import { NavLink, useNavigate } from "react-router-dom";
import search from "../search/Search";
import axios from "axios";

function NewNav() {
  const [course, setCourse] = useState([]);
  const [board, setBoard] = useState([]);
  const [medium, setMedium] = useState([]);
  const [sector, setSector] = useState([]
   
  );
  const [selectCourse, setSelectCourse] = useState([]);
  const [selectBoard, setSelectBoard] = useState([]);
  const [selectMedium, setSelectMedium] = useState([]);

  const ClassNames = [
    "L.K.G",
    "U.K.G",
    "1st",
    "2nd",
    "3rd",
    "4th",
    "5th",
    "6th",
    "7th",
    "8th",
    "9th",
    "10th",
    "11th",
    "12th",
  ];
  const BoardNames = ["Rbse", "Cbse"];
  const MediumNames = ["Hindi", "English", "Hindi/English"];
  const SectorName = ["Private", "Government", "semi Govt."];

  function handleCourse(e) {
    setCourse(e.target.value);
  }

  const updateBoard = (Board) => {
    setBoard((prevCourse) => [...prevCourse, Board]);
  };
  const updateCourse = (className) => {
    setCourse((prevCourse) => [...prevCourse, className]);
  };
  const updateMedium = (value) => {
    setMedium((prevCourse) => [...prevCourse, value]);
  };
  const updateSector = ( value) => {
    setSector((prevCourse) => [...prevCourse, value]);

  };
  function updateFilter() {
    axios
      .post(``)
      .then((res) => {
        console.log(res);
      })
      .catch((res) => {
        console.log(res);
      });
  }
  console.log(course, board, medium, sector);
  return (
    <>
      <div className="NewNavDiv">
        <div className="dropsDowns">
          <NavLink to="/search">
            <div className="Navbarbtn">
              <p>School</p>
            </div>
          </NavLink>
          <div className="Navbarbtn CourseDiv">
            <div className="dropdown">
              <button
                className="btn  dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <p>Course</p>
              </button>
              <ul className="dropdown-menu " style={{ width: "550px" }}>
                <h6 className="py-2 px-4">Course</h6>
                <div className="hrDiv"></div>
                <div className="ClassesName">
                  {ClassNames.map((item, index) => (
                    <p key={index} onClick={() => updateCourse(item)}>
                    {item}
                  </p>
                  ))}
                </div>
              </ul>
            </div>
          </div>

          <div className="Navbarbtn BoardDiv">
            <div className="dropdown">
              <button
                className="btn  dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                onChange={handleCourse}
              >
                <p>Board</p>
              </button>
              <ul
                className="dropdown-menu "
                style={{ width: "250px", height: "255px" }}
              >
                <h6 className="py-1 px-1">Boards</h6>
                <div className="hrDiv"></div>
                <div className="ClassBoards">
                  {BoardNames.map((item,key) => (
                    <div
                      className="rbseBoard"
                      key={key}
                      onClick={() => updateBoard(item)}
                    >
                      <input
                        type="radio"
                        aria-label="Radio button for following text input"
                      />
                      {item}
                    </div>
                  ))}
                </div>
              </ul>
            </div>
          </div>
          <div className="Navbarbtn mediumDiv">
            <div className="dropdown">
              <button
                className="btn  dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <p>Medium</p>
              </button>
              <ul
                className="dropdown-menu "
                style={{ width: "250px", height: "255px" }}
              >
                <h6 className="py-1 px-1">Medium</h6>
                <div className="hrDiv"></div>
                <div className="ClassBoards">
                  {MediumNames.map((item,key) => (
                    <div
                      className="rbseBoard"
                      key={key}
                      onClick={() => updateMedium(item)}
                    >
                      <input
                        type="radio"
                        aria-label="Radio button for following text input"
                      />
                      {item}
                    </div>
                  ))}
                </div>
              </ul>
            </div>
          </div>

          <div className="Navbarbtn">
            <div className="dropdown">
              <button
                className="btn  dropdown-toggle"
                type="button" 
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <p>Sector</p>
              </button>
              <ul
                className="dropdown-menu "
                style={{ width: "250px", height: "255px" }}
              >
                <h6 className="py-1 px-1">Sector</h6>
                <div className="hrDiv"></div>
                <div className="ClassBoards">
                  {SectorName.map((item,key) => (
                    <div
                      className="rbseBoard"
                      key={key}
                      onClick={() => updateSector(item)}
                    >
                      <input
                        type="radio"
                        aria-label="Radio button for following text input"
                      />
                      {item}
                    </div>
                  ))}
                </div>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default NewNav;
