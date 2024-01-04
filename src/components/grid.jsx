import React from 'react';
import { Grid, Paper } from '@mui/material';

const Cell = ({ status }) => {
    let color = 'blue'; // default color
    if (status === 'H') color = 'red';    // Hit
    if (status === 'M') color = 'grey';   // Miss
  
    return (
      <Paper
        sx={{ height: 30, width: 30, backgroundColor: color, '&:hover': { background: color, opacity: 0.75 } }}
      />
    );
  };

const GameGrid = ({ gameState, makeGuess }) => {
  return (
    <Grid container spacing={1} columns={10} style={{ maxWidth: '400px' }}>
  {gameState.map((row, rowIndex) =>
    row.map((cell, colIndex) => (
        <Grid item key={`${rowIndex}-${colIndex}`} onClick={() => makeGuess(rowIndex, colIndex)}>
        <Cell status={cell}/>
      </Grid>
    ))
  )}
</Grid>
  );
};

export default GameGrid;