import React from 'react';
import './title.css';

const Title = ({ mainTitle, subTitle }) => {
  return (
    <div className="titleContainer">
      <div className='titleRow'>
        <h1 className="mainTitle">{mainTitle}</h1>
        <i class="fa-solid fa-spa"></i>
      </div>
      
      {subTitle && <p className="subTitle">{subTitle}</p>}
    </div>
  );
};

export default Title;
