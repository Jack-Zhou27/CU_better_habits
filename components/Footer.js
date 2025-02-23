import React from 'react';
const Footer = () => {
  const now = new Date();
  const year = now.getFullYear();

  return (
    <div className="bg-red-900 pt-5 grid grid-cols-3 md:grid-cols-9 justify-end bg-gradient-to-r from-myRed-300 via-Blue-200 to-myRed-500 pb-14 px-5">
      <div className="col-span-2 md:col-span-6 flex flex-col items-center">
        <div className="w-full max-w-md text-left">
          <a href=""> 
            <h1 className="text-md md:text-3xl text-white hover:text-stone-200 font-bold">CU Better Habits</h1>
            <p className="text-xs text-neutral-400 hover:text-neutral-500 font-light">Made with love from scratch. &copy; {year}.</p>
          </a>
        </div>
      </div>

      <div className="col-span-1 md:col-span-3 flex flex-col">
        <h1 className="text-md md:text-3xl text-white hover:text-stone-200 font-bold">Connect with Us!</h1>
        <ul>
          <li>
            <a href="" className="font-extralight text-sm md:text-lg text-stone-100 hover:text-stone-200">LinkedIn</a>
          </li>
          <li>
            <a href="" className="font-extralight text-sm md:text-lg text-stone-100 hover:text-stone-200">Insta </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Footer;