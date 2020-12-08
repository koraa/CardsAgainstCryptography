import React, { Component } from 'react';

import Card from './Card';

class CardCzar extends Component {
  constructor() {
    super() 

    this.state = {
      prevSelection: null,
      currentSelection: null,
      nextSelection: null,
    }
    
    this.changeSelection = this.changeSelection.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.playerSelections && nextProps.playerSelections) {
      this.setState({
        prevSelection: nextProps.playerSelections.length - 1,
        currentSelection: 0,
        nextSelection: 1 || 0,
      });
    }
  }

  changeSelection(iteration) {
    let length = this.props.playerSelections.length;

    this.setState((prevState) => {
      return {
        prevSelection: this._iterateSelection(prevState.prevSelection, iteration, length),
        currentSelection: this._iterateSelection(prevState.currentSelection, iteration, length),
        nextSelection: this._iterateSelection(prevState.nextSelection, iteration, length),
      }
    })
  }

  _iterateSelection(index, iteration, length) {
    index = index + iteration;

    if (index < 0) { 
      index = length - 1 
    } else if (index === length) { 
      index = 0
    } 

    return index;
  }

  render(){
    const { prevSelection, currentSelection, nextSelection } = this.state;
    const { playerSelections, blackCard, message } = this.props;

    return (
      <div className='card-czar'>
        <div className='card-czar-container'>
          {blackCard && <Card color='black' text={blackCard.text} />}
          {!playerSelections && 
            <div className='message'>
              <p>{message}</p>
            </div>}
        </div>
        {playerSelections &&
          <div className='player-selections'>
            <div className='prev-selection' onClick={() => this.changeSelection(-1)}>
              {playerSelections[prevSelection].map((text, index) => {
                return (
                  <Card color='white' key={index} index={index} heldBy='czar' text={text} />
                )
              })}
            </div>
            <div className='current-selection'>
              {playerSelections[currentSelection].map((text, index, array) => {
                return (
                  <Card color='white' key={index} index={index} heldBy='czar' text={text} hoverable={index < array.length - 1 ? true : false} />
                )
              })}
            </div>
            <div className='next-selection' onClick={() => this.changeSelection(1)}>
              {playerSelections[nextSelection].map((text, index) => {
                return (
                  <Card color='white' key={index} index={index} heldBy='czar' text={text} />
                )
              })}
            </div>
          </div>
        }
        {!this.props.gameStarted &&
          <button className="blue-button" onClick={this.props.startGame}>START</button>
        }
        {playerSelections &&
          <button className="blue-button" onClick={() => this.props.submitCzarSelection(currentSelection)}>OMG THIS ONE</button>
        }
      </div>
    )
  }
}

export default CardCzar;