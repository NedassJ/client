import React, { useState } from 'react';
import axios from 'axios';
import { Button, Typography, Box } from '@mui/material';
import GameGrid from '../components/grid';

const App = () => {
  const [gameState, setGameState] = useState(Array.from({ length: 10 }, () => Array(10).fill(null)));


  const [gameId, setGameId] = useState(null);

  const startGame = async () => {
    try {
      const { data } = await axios.post('http://localhost:5000/start');
      setGameState(data.grid);
      setGameId(data.gameId);
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
      // Check for game over or other messages here.
    } catch (error) {
      console.error('Error making guess:', error);
    }
  };

  return (
    <div>
      <Box sx={{bgcolor:'#1b262c', display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center', height:'1000px'}}>
      <Typography variant='h1' sx={{paddingTop: 2, paddingBottom: 2, color: '#e1f3ff'}}>Laivų mūšis</Typography>
      <GameGrid gameState={gameState} makeGuess={makeGuess} />
      <Button variant="contained" onClick={startGame} sx={{marginTop: 2, bgcolor: '#0f4c75', '&:hover': { background: '#0f4c75', opacity: 0.75 }}}>
        Pradėti žaidimą
      </Button>
      </Box>
    </div>
  );
};

export default App;