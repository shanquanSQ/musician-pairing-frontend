import React, { useState } from "react";

export const SearchPage = () => {
  const [user, setUser] = useState({ user: "", password: "" });

  const handleChange = (ev) => {
    let name = ev.target.name;
    let value = ev.target.value;

    setUser((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  const handleClick = () => {
    console.log(user);
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
  };

  return (
    <>
      <>
        <div className="flex flex-row justify-center h-[100vh] pt-[2em] pb-[4em] px-[2em] border-2 border-blue-300">
          <div className="flex flex-col w-full lg:w-[30%] justify-between text-center">
            <div className="flex flex-col pt-[2em] mb-[-10em]">
              <h1 className="font-bold text-txtcolor-primary text-[1.5rem] text-left ">
                CATEGORY /
              </h1>
              <input
                type="text"
                name="username"
                onChange={handleChange}
                value={user.username}
                autoComplete="off"
                placeholder="USERNAME"
                className="primary-input-form"
              />
            </div>

            <div className="flex flex-col">
              <h1 className="font-bold text-txtcolor-primary text-[1.5rem] text-left">
                SEARCH /
              </h1>
              <input
                type="text"
                name="password"
                onChange={handleChange}
                value={user.password}
                autoComplete="off"
                placeholder="PASSWORD"
                className="primary-input-form"
              />
            </div>

            <div>
              <form onSubmit={handleSubmit}>
                <input
                  type="button"
                  value="SEARCH"
                  onClick={handleClick}
                  className="secondary-cta-btn w-[100%] lg:w-[100%]"
                />
              </form>
            </div>
          </div>
        </div>
      </>
    </>
  );
};
