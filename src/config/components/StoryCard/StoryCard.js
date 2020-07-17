import React from 'react';
import './StoryCard.css';
import {Favorite} from '@styled-icons/material/Favorite';
import {FavoriteBorder} from '@styled-icons/material/FavoriteBorder';
class StoryCard extends React.Component {
    constructor(props) {
        super(props);
        console.log(props)
        console.log("From StoryPAger comp")
        this.state = {
            gameDetails: props.gameDetails,
            favourite: true
        };
        this.toggleFavourite = this.toggleFavourite.bind(this);
    }
    toggleFavourite() {
        this.setState({ favourite: !this.state.favourite })
      }
    render() {
        return (
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-4 col-md-6 col-sm-12">
                        <div className="card" style={{ backgroundImage: "url(" + this.state.gameDetails.generalConfig.thumbnail + ")" }}>
                            <div className="overlay"></div>
                            <div className="content">
                                <div>{this.state.gameDetails.gameLabel}</div>
                                
                            <div className="fav-holder">
                            {this.state.favourite ?
                            <Favorite onClick={this.toggleFavourite} size="32" title="Favourite" /> :
                            <FavoriteBorder onClick={this.toggleFavourite} size="32" title="Favourite" />
                            }
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

export default StoryCard;