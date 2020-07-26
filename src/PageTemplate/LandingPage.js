import React from "react";
import "./LandingPage.css";
import {
    Link
} from "react-router-dom";
import conf from '../questions.json'
import StoryCard from "../config/components/StoryCard/StoryCard";

const BleedOutCard = (props) => (
    <div className="for-shadow">
        <div className="card-bottom">
            <StoryCard gameDetails={props.item}></StoryCard>
        </div>
        <div className="card-top">
            <StoryCard gameDetails={props.item}></StoryCard>
        </div>
    </div>
);


export default function LandingPage(props) {
    var contests = conf.contests
    console.log(props.user)
    return (
        <div className="main-content" >
            <div className="head-section">
                <div>
                    {
                        "Hello " + props.user.displayName
                    }
                </div>

            </div>
            <div className="game-carousels">
                <div className="favourite-game-section">
                    {
                        <div className="game-section" >
                            <p>Choose your adventure</p>
                            <div style={{ flexDirection: 'row', display: 'flex', overflow: 'scroll', flex: 1 }}>
                                {contests.map((item, index) => {
                                    return (
                                        <Link className='Link' to={"/games/" + item.gameName}>
                                            <BleedOutCard item={item}/>
                                        </Link>
                                    )
                                })
                                }</div>
                            <p>Create your adventure</p>
                        </div>
                    }
                </div>
                <div className="all-games-list">
                    {contests.map((item, index) => {
                        console.log(item.gameName)
                        return (
                            <Link to={"/games/" + item.gameName}>
                                <div className="for-shadow">
                                    <div className="card-bottom">
                                        <StoryCard gameDetails={item}></StoryCard>
                                    </div>
                                    <div className="card-top">
                                        <StoryCard gameDetails={item}></StoryCard>
                                    </div>
                                </div>
                            </Link>
                        )
                    })
                    }
                </div>
            </div>
        </div>
    );
}

// You can think of these components as "pages"
// in your app.

