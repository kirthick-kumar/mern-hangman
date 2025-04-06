import React, { useEffect, useState } from "react";
import RenderResult from "./Result";

const MAX_GUESS = 7;

const Hangman = () => {
  const [word, setWord] = useState('');
  const [guess, setGuess] = useState([' ', '-']);
  const [numGuess, setNumGuess] = useState(0);
  const [newWord, setNewWord] = useState('');
  const [WORD_LIST, setWORD_LIST] = useState(['']);
  
  const handleAddWord = async () => {
    if(!newWord) return;
    try{
      const res = await fetch('http://localhost:3000/word', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({word: newWord})
      });
      console.log(res);
      
      const data = await res.json();
      console.log(data, 'DATa');
    }
    catch(error){
      console.log(error);
    } 
  }

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('http://localhost:3000/words', {
        method: 'GET',
      });
      const data = await res.json(); 
      const words = data.words.map(w => w.word);
  
      setWORD_LIST(words);
      setWord(words[Math.floor(Math.random() * words.length)]);
  
      console.log(words);
    };
  
    fetchData();
  }, []);
  

  const guessLetter = (letter) => {
    letter = letter.toUpperCase();
    if (numGuess >= MAX_GUESS || guess.includes(letter)) return;

    setGuess([...guess, letter]);

    if (!word.includes(letter)) {
      setNumGuess(numGuess + 1);
    }
  };

  const handleInputKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleAddWord();
    }
  };

  const renderButtons = () => {
    const ALPHA = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
    return ALPHA.map((letter) => (
      <button key={letter} onClick={() => guessLetter(letter)} disabled={guess.includes(letter)}>
        {letter}
      </button>
    ));
  };


  const lost = numGuess >= MAX_GUESS;
  const won = word.split('').every(letter => guess.includes(letter));

  return (
    <div style={{ fontFamily: 'monospace', fontSize: 18, textAlign: 'center', width: '100vw' }}>
      <div style={{ alignItems: 'center' }}>
        <h1>H _ N G M _ N</h1>
        <p style={{ fontSize: '24px' }}>
          {word.split('').map(letter => guess.includes(letter) ? letter : '_').join(' ')}
        </p>
        <p>{numGuess} / {MAX_GUESS}</p>

        {!lost && !won && (
          <>
            {renderButtons()}
            <div style={{margin: 30}}>
              <input
                type="text"
                value={newWord}
                onChange={(e) => setNewWord(e.target.value.toUpperCase())}
                onKeyDown={handleInputKeyDown}
                style={{fontFamily: 'monospace', fontSize: 18, padding: 8}}
                placeholder="Add Your Word"
              />  
              <button onClick={handleAddWord} style={{margin: 30}}>Add</button>
            </div>
          </>
        )}

        {won && <RenderResult msg="won" />}
        {lost && <RenderResult msg="lost" />}
      </div>
    </div>
  );
};

export default Hangman;
