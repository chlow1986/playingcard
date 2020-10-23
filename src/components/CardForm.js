import React, {useRef, useState} from 'react';

/*
  * generate cards constant
*/
const number = [ "A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
const suits = ["H", "D", "S", "C"];

const _cards = [];
for (let s = 0; s < suits.length; s++) {
  for (let v = 0; v < number.length; v++) {
    const value = number[v];
    const suit = suits[s];
    _cards.push(`${suit}-${value}`);
  }
}

const CardForm = ()=>{
  const formRef = useRef();
  const [players, setPlayers] = useState([]);

  /*
   * function to distribute cards 
   */
  const onStart = ()=>{
    const cards = [..._cards];
    const form = formRef.current;
    const numOfPlay = form['numOfPlay'].value;
    if(numOfPlay == null || isNaN(numOfPlay) || numOfPlay <= 0){
      alert('Number of player must be greater than zero.');
    }else{
      let newCards = [];
      for(var i = 0; i < numOfPlay; i++){
        let random = Math.floor(Math.random() * (51-i));
        let card = cards[random] || 'NO CARD'; /* if no card, card assign to "NO CARD" */
        cards.splice(random, 1); /* remove card from cards array */
        newCards.push(card);
      }
      setPlayers(newCards);
    }
  }

  return (
    <div>
      <form ref={formRef} onSubmit={e => { e.preventDefault(); }}>
        Number of Players: <input type="number" name="numOfPlay"/>
      </form>
      <br/>
      <button onClick={onStart}>Start</button>
      <div style={{marginTop: '30px', overflow: 'scroll', height: '360px'}}>
        {
          players.map((item, index)=>{
            return (
                <div key={index}>{item},</div>
              )
          })
        }
      </div>
    </div>
  );
}

export default CardForm;