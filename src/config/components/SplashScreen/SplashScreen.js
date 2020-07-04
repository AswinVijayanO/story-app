import React, { useState } from 'react';
import './SplashScreen.css';
class SplashScreen extends React.Component {

  render() {
    return (
      <div className="splashContainer">

        <div className="content">
          <div className="content__container">
            <p className="content__container__text">
              Hello
    </p>

            <ul className="content__container__list">
              <li className="content__container__list__item">world !</li>
              <li className="content__container__list__item">bob !</li>
              <li className="content__container__list__item">users !</li>
              <li className="content__container__list__item">everybody !</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }

}

export default SplashScreen;