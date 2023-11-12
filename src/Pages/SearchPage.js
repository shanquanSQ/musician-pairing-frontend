import React, { useState } from "react";
import { CategoryDropDown } from "../Components/CategoryDropDown/CategoryDropDown";

export const SearchPage = ({ motion }) => {
  // const [user, setUser] = useState({ user: "", password: "" });
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSearchTerm, setSelectedSearchTerm] = useState("");

  // Axios GET Placeholders
  const categoriesList = ["Instruments", "Genre", "Artist"];
  // Need to be able to toggle based on what has been chosen for Categories.
  const searchTermsList = ["apple", "orange", "pineapple", "grape"];

  const handleChangeCategory = (ev) => {
    setSelectedCategory(ev.target.id.toUpperCase());
    // console.log(`selected category state in Search Page: ${selectedCategory}`);
  };

  const handleChangeSearchTerm = (ev) => {
    setSelectedSearchTerm(ev.target.id.toUpperCase());
    // console.log(
    //   `selected searchterm state in Search Page: ${selectedSearchTerm}`
    // );
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    alert(
      "Will add some interactions so that search only works when both fields above are selected."
    );
  };

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
        </div>
      </>
    </>
  );
};
