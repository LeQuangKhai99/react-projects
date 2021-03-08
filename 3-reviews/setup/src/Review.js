import React, { useState } from 'react';
import people from './data';
import { FaChevronLeft, FaChevronRight, FaQuoteRight } from 'react-icons/fa';

const Review = () => {
  const [index, setIndex] = useState(0);
  const {name, job, image, text} = people[index];

  const checkNumber = (number) => {
    if(number > people.length - 1){
      return 0;
    }
    if(number < 0){
      return people.length - 1;
    }
    return number;
  }

  const prevPerson = () => {
    setIndex(()=>{
      let newIndex = index - 1;
      return checkNumber(newIndex);
    });
  }

  const nextPerson = () => {
    setIndex(()=>{
      let newIndex = index + 1;
      return checkNumber(newIndex);
    });
  }

  const randomPerson = () => {
    let random = Math.random() * people.length;
    setIndex(Math.floor(random));
  }

  return (
    <article className="review">
      <div className="img-container">
        <img src={image} alt={name} className="person-img"/>
        <span className="quote-icon">
          <FaQuoteRight/>
        </span>
      </div>
      <h4 className="author">{name}</h4>
      <div className="job">{job}</div>
      <div className="info">{text}</div>
      <div className="button-container">
        <button onClick={prevPerson} className="prev-btn">
          <FaChevronLeft/>
        </button>
        <button onClick={nextPerson} className="next-btn">
          <FaChevronRight/>
        </button>
      </div>
      <button onClick={randomPerson} className="random-btn">
        suprise me
      </button>
  </article>
  );
};

export default Review;
