import React from "react";
import {
    Link
} from "react-router-dom";
import conf from '../questions.json'
import StoryCard from "../config/components/StoryCard/StoryCard";
export default function LandingPage(props) {
    var contests = conf.contests
    return (
        <div>
                {
                    contests.map((item, index) => {
                        console.log(item.gameName)
                        return (
                                <Link to={"/games/" + item.gameName}>
                                <StoryCard gameDetails={item}></StoryCard></Link>
                        )
                    })
                }

        </div>
    );
}

// You can think of these components as "pages"
// in your app.

