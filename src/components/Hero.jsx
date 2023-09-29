import React from 'react'
import {newlogo} from '../assets';
const Hero = () => {
  return (
    <header className="w-full flex justify-center items-center flex-col">
      <nav className="flex justify-between items-center w-full mb-10 pt-3">
          <img src={newlogo} alt="Sumz_logo"
            className="w-20 object-contain"
          /><span className="mr-auto font-satoshi font-black text-3xl">Personal Summarizer</span>
          <button type="button" onClick={()=>{
            window.open('https://github.com/dhyeygit123')
          }}
          className="black_btn"
          >
            Github
          </button>
        </nav>  
        <h1 className="head_text">
          Summarize Articles with <br className="max-md:hidden"/>
          <span className="orange_gradient">OpenAI GPT-4</span>
        </h1>
        <h2 className="desc align">
        Discover the future of efficient information consumption on Summiz. Get concise, relevant insights from lengthy content with just a click. Simplify your online experience today!
        </h2>
    </header>
  )
}

export default Hero