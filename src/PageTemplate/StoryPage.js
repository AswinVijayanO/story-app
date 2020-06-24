import React, { useState } from 'react';
import './StoryPage.css';

function StoryPage(props) {
    const [question, SetQuestion] = useState(props.questions[0])
    return (
        <div className="StoryPage" >
            <div className="Question">
                <p>{question.text}</p>
            </div>
            {
                question.img?
                <img className="image" src={ question.img}/>
                :<></>
            }
            <div className="options">
                {
                    question.options.map((item) => {
                        return (
                            <div>
                                <button className="button"
                                 onClick={() => { console.log("clicked"); SetQuestion(props.questions[item.actionIndex]) }}
                                >
                                    {item.text}
                                </button>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    );
}

export default StoryPage;