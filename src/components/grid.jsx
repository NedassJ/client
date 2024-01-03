import React from 'react';
import { Grid, Paper } from '@mui/material';

const Cell = ({ onClick, status }) => {
  const color = status === 'hit' ? 'red' : status === 'miss' ? 'gray' : 'blue';
  return (
    <Paper
      sx={{ height: 30, width: 30, backgroundColor: color }}
      onClick={onClick}
    />
  );
};

const GameGrid = ({ gameState, makeGuess }) => {
  return (
    <Grid container spacing={1.5} style={{ maxWidth: '350px' }} columns={10}>
  {gameState.map((row, rowIndex) =>
    row.map((cell, colIndex) => (
      <Grid item xs={1} key={`${rowIndex}-${colIndex}`}>
        <Cell status={cell} onClick={() => makeGuess(rowIndex, colIndex)} />
      </Grid>
    ))
  )}
</Grid>
  );
};

export default GameGrid;