import React, { useState } from 'react';
import axios from 'axios';
import { Button, Typography, Box, Alert } from '@mui/material';
import GameGrid from '../components/grid';

const App = () => {
  const [gameState, setGameState] = useState(Array.from({ length: 10 }, () => Array(10).fill(null)));
  const [gameId, setGameId] = useState(null);
  const [gameStarted, setGameStarted] = useState(false);
  const [movesLeft, setMovesLeft] = useState(25);

  const startGame = async () => {
    try {
      const { data } = await axios.post('http://localhost:5000/start');
      setGameState(data.grid);
      setGameId(data.gameId);
      setGameStarted(true); // Set the game as started
      setMovesLeft(25); // Reset moves when a new game starts
      console.log("Game started with ID:", data.gameId);
    } catch (error) {
      console.error('Error starting game:', error);
    }
  };

  const makeGuess = async (x, y) => {
    try {
      const { data } = await axios.post('http://localhost:5000/guess', {
        gameId,
        x,
        y,
      });
      setGameState(data.grid);
      setMovesLeft(data.movesLeft); 
      console.log(data.message)
    } catch (error) {
      console.error('Error making guess:', error);
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
    </Box>
  );
};

export default App;
