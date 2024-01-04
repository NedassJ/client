import React, { useState } from 'react';
import axios from 'axios';
import { Button, Typography, Box, Alert } from '@mui/material';
import GameGrid from '../components/grid';

const App = () => {
  const [gameState, setGameState] = useState(Array.from({ length: 10 }, () => Array(10).fill(null)));
  const [gameId, setGameId] = useState(null);
  const [gameStarted, setGameStarted] = useState(false);
  const [movesLeft, setMovesLeft] = useState(25);
  const [hasWon, setHasWon] = useState(false);
  const [hasSunken, setHasSunken] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const startGame = async () => {
    setErrorMessage(""); 
    try {
      const { data } = await axios.post('http://localhost:5000/start');
      setGameState(data.grid);
      setGameId(data.gameId);
      setGameStarted(true); 
      hasWon(false);
      setMovesLeft(25); 
      console.log("Game started with ID:", data.gameId);
    } catch (error) {
      console.error('Error starting game:', error);
    }
  };

  const makeGuess = async (x, y) => {
    if (!gameStarted) {
      setErrorMessage("Spauskite [PRADĖTI ŽAIDIMĄ] norėdami žaisti");
      return;
  }
  setErrorMessage(""); 
    try {
      const { data } = await axios.post('http://localhost:5000/guess', {
        gameId,
        x,
        y,
      });
      setHasSunken(false);
      setGameState(data.grid);
      setMovesLeft(data.movesLeft);
      if(data.message === 'WON')
      {
        console.log("Laimeta")
        setHasWon(true);
        setGameStarted(false);
      }
      if(data.message === 'OVER')
      {
        console.log("Game over")
        window.location.reload(false);
      }
      if(data.message === 'Laivas paskandintas!')
      {
        console.log("Visas laivas paskandintas")
        setHasSunken(true);
      }
    } catch (error) {
      console.error('Error making guess:', error);
      setErrorMessage("Error");
    }
  };

  return (
    <Box sx={{bgcolor:'#1b262c', display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center', height:'1000px'}}>
      <Typography variant='h1' sx={{paddingTop: 2, paddingBottom: 2, color: '#e1f3ff'}}>Laivų mūšis</Typography>
      <GameGrid gameState={gameState} makeGuess={makeGuess} />
      {!gameStarted && (
        <Button variant="contained" onClick={startGame} sx={{marginTop: 2, bgcolor: '#0f4c75', '&:hover': { background: '#0f4c75', opacity: 0.75 }}}>
          Pradėti žaidimą
        </Button>
      )}
      {gameStarted && (
        <Alert severity="success" sx={{marginTop: 2}}>
          Žaidimas prasidėjo! Liko ėjimų: {movesLeft}
        </Alert>
      )}
      {hasSunken && (
        <Alert severity="success" sx={{marginTop: 2}}>
          Paskandintas pilnas laivas!
        </Alert>
      )}
      {hasWon && (
        <Alert severity="success" sx={{marginTop: 2}}>
          Žaidimas baigėsi, jūs laimėjote!
        </Alert>
      )}
      {errorMessage && (
            <Alert severity="error" sx={{marginTop: 2}}>
                {errorMessage}
            </Alert>
        )}
    </Box>
  );
};

export default App;
