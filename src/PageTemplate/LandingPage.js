import React from "react";
import "./LandingPage.css";
import {
    Link
} from "react-router-dom";
import conf from '../questions.json'
import StoryCard from "../config/components/StoryCard/StoryCard";
export default function LandingPage(props) {
    var contests = conf.contests
    return (
        <div className="main-content">
            <div className="head-section">
                Hello There .. 
            </div>
            {
                <div className="game-section">
                {contests.map((item, index) => {
                    console.log(item.gameName)
                    return (
                        <Link to={"/games/" + item.gameName}>
                            <div className="for-shadow">
                            <div className="card-bottom">
                            <StoryCard  gameDetails={item}></StoryCard>
                            </div>
                            <div className="card-top">
                            <StoryCard  gameDetails={item}></StoryCard>
                            </div>
                            </div>
                                </Link>
                    )
                })
            }
            </div>
            }

        </div>
    );
}

// You can think of these components as "pages"
// in your app.

