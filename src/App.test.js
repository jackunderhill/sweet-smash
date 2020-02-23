import { removeNeighbours, addGravity } from './App';

test('Should not remove an isolated block', () => {
  const grid = [
    ['red',  'green', 'blue'],
    ['red',  'blue',  'yellow'],
    ['red', 'yellow',  'red']
  ]

  expect(removeNeighbours(grid, 1, 1)).toEqual(grid);
});

test('Should remove neighbours of the same colour', () => {
  const grid = [
    ['red',  'green', 'blue'],
    ['red',  'blue',  'yellow'],
    ['blue', 'blue',  'red']
  ]

  expect(removeNeighbours(grid, 1, 1)).toEqual([
    ['red',  'green', 'blue'],
    ['red',  null,  'yellow'],
    [null,  null,  'red']
  ]);
});

test('Should shift down through empty spaces', () => {
  const grid = [
    ['red', 'green', 'blue'],
    ['red',    null,  'yellow'],
    [null,    'red',  'red']
  ]

  expect(addGravity(grid)).toEqual([
    [null,   null,   'blue'],
    ['red', 'green', 'yellow'],
    ['red', 'red',   'red']
  ])
});