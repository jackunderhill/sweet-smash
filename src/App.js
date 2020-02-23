import React, { useState } from 'react';
import './App.css';

const colours = ['red', 'blue', 'yellow', 'green']

const generateRow = () => Array.from({ length: 10 }, () => colours[Math.floor(Math.random() * 4)])

const generateGridValues = () => Array.from({length: 10}, generateRow)

export const addGravity = originalGrid => {
  const grid = originalGrid.map(row => row.map(col => col))

  const shiftDownFromAbove = col => {
    const columnArray = grid.map(row => row[col])
    const columWithGravity = columnArray.sort((a, b) => (b === null) - (a === null))

    columnArray.forEach((_, row) => {
      grid[row][col] = columWithGravity[row]
    })
  }

  grid[0].forEach((_, col) => shiftDownFromAbove(col))

  return grid
}

const isNotIsolated = (grid, row, col, colour) => (
  (grid[row - 1] && grid[row - 1][col] === colour) ||
  (grid[row + 1] && grid[row + 1][col] === colour) ||
  (grid[row] && grid[row][col - 1] === colour) ||
  (grid[row] && grid[row][col + 1] === colour)
)

export const removeNeighbours = (originalGrid, row, col) => {
  const grid = originalGrid.map(row => row.map(col => col))
  const colour = originalGrid[row][col]

  const checkNeighbour = (r, c) => {
    if (grid[r][c] === colour) {
      grid[r][c] = null
      // up
      if (r > 0) {
        checkNeighbour(r - 1, c)
      }
      // down
      if (r < grid.length - 1) {
        checkNeighbour(r + 1, c)
      }
      // left
      if (c > 0) {
        checkNeighbour(r, c -1)
      }
      // right
      if (c < grid[r].length -2) {
        checkNeighbour(r, c +1)
      }
    }
  }

  if (colour !== null && isNotIsolated(grid, row, col, colour)) {
    checkNeighbour(row, col)
  }

  return grid
}

function App() {
  const [grid, setGrid] = useState(generateGridValues())

  return (
    grid.map((row, rowIndex) => (
      <div
        className='row'
        key={`row${rowIndex}`}
      >
        {row.map((colour, colIndex) => (
          <div
            style={{
              background: colour
            }}
            onClick={() => {
              if (colour) {
                const newGrid = removeNeighbours(grid, rowIndex, colIndex)
                setGrid(addGravity(newGrid))
              }
            }}
            key={`col${colIndex}`}
            alt={`Row ${rowIndex} Col ${colIndex}`}
          />
        ))}
      </div>
    ))
  );
}

export default App;
