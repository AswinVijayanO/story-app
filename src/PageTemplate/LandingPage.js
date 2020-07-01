import React from "react";
import {
    Link
} from "react-router-dom";
import conf from '../questions.json'
function TopBar(props) {
    return (<div className="top-bar">
        <div className="button signout" onClick={props.signOut}></div>
        <div className="button signout" onClick={props.signOut}></div>
    </div>)
}
export default function LandingPage(props) {
    var contests = conf.contests
    return (
        <div>
            <ul>
                {
                    contests.map((item, index) => {
                        console.log(item.gameName)
                        return (
                            <li key={index}>
                                <Link to={"/games/" + item.gameName}>{item.gameName}</Link>
                            </li>
                        )
                    })
                }
            </ul>

        </div>
    );
}

// You can think of these components as "pages"
// in your app.

