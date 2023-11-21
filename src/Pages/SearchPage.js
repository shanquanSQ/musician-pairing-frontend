import React, { useEffect, useState } from "react";
import { CategoryDropDown } from "../Components/CategoryDropDown/CategoryDropDown";
import axios from "axios";
import {BACKEND_URL} from '../constants.js';
import {UserProfileModal} from '../Components/SearchPage/UserProfileModal'

export const SearchPage = ({ motion }) => {
  // const [user, setUser] = useState({ user: "", password: "" });
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSearchTerm, setSelectedSearchTerm] = useState("");
  const [searchTermsList, setSearchTermsList] = useState([]);
  const [searchedUsers, setSearchedUsers] = useState(null)
  const [userProfileModalToggle, setUserProfileModalToggle] = useState(false);

  // Axios GET Placeholders
  const categoriesList = ["Instruments", "Genres", "Artists"];
  
  const handleChangeCategory = async (ev) => {
    if (ev.target.id !== "") {
      const response = await axios.get(`${BACKEND_URL}/${ev.target.id.toLowerCase()}`)
      const searchTerms = response.data.map((entry)=> entry.name);
      setSearchTermsList(searchTerms);
    } else {
      setSearchTermsList([]);
    }
    setSelectedCategory(ev.target.id.toUpperCase());
    
    // console.log(`selected category state in Search Page: ${selectedCategory}`);
  };

  const handleChangeSearchTerm = (ev) => {
    setSelectedSearchTerm(ev.target.id);
    // console.log(
    //   `selected searchterm state in Search Page: ${selectedSearchTerm}`
    // );
  };
  
  
  const handleSubmit = async (ev) => {
    ev.preventDefault();
    if (!selectedCategory || !selectedSearchTerm){
      alert("Please select filter criteria")
    } else {
      const response = await axios.get(`${BACKEND_URL}/users/filteredusers/${selectedCategory.toLowerCase()}/${selectedSearchTerm}`)
      setSearchedUsers(response.data.filteredUsers)
    }
  };

  const handleClick = () => {
    alert('insert modal code here')
  }

  const handleUserProfileModal = () => {
    //may need some code to pass in the user ID here
    setUserProfileModalToggle(!userProfileModalToggle);
  };

  const removeModal = () => {
    setUserProfileModalToggle(false);
  };

  const searchResults = (searchedUsers ? searchedUsers.map((user) => {
    if (user.id === 4) // i need to pull from auth here
      return;
    else {
      return (
        <div className='flex flex-row h-[8em] bg-blue-300 text-black border-2 border-black rounded-md'>
          {console.log(searchedUsers)}
          <div className='p-2'>
            <div className="w-[6em] h-[6em] aspect-square items-center rounded-full overflow-hidden bg-orange-300">
              <img src={user.profilePictureUrl} className='object-cover h-full w-full' />
            </div>
          </div>
          <div className='flex flex-col bg-green-300'>
            <p>{user.fullName}</p>
            <p>Instruments: {user.instruments[0].name} - {user.instruments[0].userInstrument.instrumentExperience}y
              If category was instrument, display that instrument and exp; else display nothing here
            </p>
          </div>
          <div>
            <button className='bg-yellow-300' onClick={handleUserProfileModal} id={`searchresult-${user.fullName}`}> Profile </button>
          </div>
        </div>
      )
    }
  }) 
  : null)


  return (
    <>
      <>
        <div className="flex flex-row justify-center h-[100dvh] pt-[2em] pb-[4em] px-[2em]">
          <motion.div
            className="flex flex-col w-full lg:w-[30%] justify-between"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              delay: 0.1,
              duration: 0.5,
            }}
          >
            <div className="flex flex-col pt-[2em] mb-[-10em]">
              <h1 className="font-bold text-txtcolor-primary text-[1.2rem] lg:text-[1.5rem] text-left ">
                CATEGORY /
              </h1>
              {/* <input
                type="text"
                name="username"
                onChange={handleChange}
                value={user.username}
                autoComplete="off"
                placeholder="USERNAME"
                className="primary-input-form"
              /> */}
              <CategoryDropDown
                initialterm="Categories"
                inputdata={categoriesList}
                handleSelect={handleChangeCategory}
              />
            </div>

            <div className="flex flex-col">
              <h1 className="font-bold text-txtcolor-primary text-[1.2rem] lg:text-[1.5rem] text-left">
                SEARCH /
              </h1>
              {/* <input
                type="text"
                name="password"
                onChange={handleChange}
                value={user.password}
                autoComplete="off"
                placeholder="PASSWORD"
                className="primary-input-form"
              /> */}

              <CategoryDropDown
                initialterm="Search"
                inputdata={searchTermsList}
                handleSelect={handleChangeSearchTerm}
              />
            </div>

            {searchedUsers ? 
            <div className = 'bg-orange-300'>
            {searchResults}
            </div> : null}
            {/* {searchedUsers ? searchedUsers[0].fullName: null}
            {searchedUsers.map((user)=>{
              return (
              <div>{user.fullName}
              </div>)})} */}

            <div>
              <form onSubmit={handleSubmit}>
                <input
                  type="button"
                  value="SEARCH"
                  onClick={handleSubmit}
                  className="secondary-cta-btn w-[100%] lg:w-[100%]"
                />
              </form>
            </div>
          </motion.div>
          {/* MODALS GO HERE */}
        {userProfileModalToggle && <UserProfileModal removeModal={removeModal} />}
        {userProfileModalToggle && (
          <div
            onClick={removeModal}
            className="fixed top-0 left-0 w-[100vw] h-full bg-black z-[9] transition-all opacity-50"
          ></div>
        )}
        </div>
      </>
    </>
  );
};
