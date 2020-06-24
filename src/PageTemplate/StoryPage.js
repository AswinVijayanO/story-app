import React, { useState } from 'react';
import './StoryPage.css';

function StoryPage(props) {
    const [question, SetQuestion] = useState(props.questions[0])
    console.log(props)
    var bg = question.img? 'url('+question.img+')': 'transparent';
    return (
        <div className="StoryPage" style={{background:bg}}>
            <div className="Question">
                <p>{question.text}</p>
            </div>
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