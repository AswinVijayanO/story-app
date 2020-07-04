import React, { useState } from 'react';
import './StoryCard.css';
class StoryCard extends React.Component {
    constructor(props) {
        super(props);
        console.log(props)
        console.log("From StoryPAger comp")
        this.state = {
            gameDetails: props.gameDetails
        };
    }
    render() {
        return (
<div className="container">
    <div className="row justify-content-center">
        <div className="col-lg-4 col-md-6 col-sm-12">
            <div className="card" style={{backgroundImage: "url(" + this.state.gameDetails.generalConfig.thumbnail + ")"}}>
                <div className="overlay"></div>
                <div className="content">
        <div>{this.state.gameDetails.gameName}</div>
                </div>
                <div className="fav">
                    <i className="far fa-heart"></i>
                </div>
            </div>
        </div>
    </div>
</div>
        );
    }

}

export default StoryCard;