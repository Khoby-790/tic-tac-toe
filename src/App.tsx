import { useEffect, useState } from 'react'
import './App.css'


const cards = [
  ["", "", ""],
  ["", "", ""],
  ["", "", ""],
]

function App() {
  const [moves, setMoves] = useState<string[][]>(cards);
  const [player, setPlayer] = useState<string>('X');

  const handleClick = (row: number, col: number) => () => {
    const activeTab = moves[row][col];
    if (!activeTab) {
      const newMoves = [...moves];
      newMoves[row][col] = player;
      setMoves(newMoves);
      setPlayer(player === 'X' ? 'O' : 'X');
    }
  }

  useEffect(() => {
    if (allItemsFilled(moves)) {
      alert('Draw')
    }

    if (checkWinner(moves)) {
      alert(`${checkWinner(moves)} wins`);
      resetGame();
    }
  }, [moves])


  const resetGame = () => {
    setMoves(cards);
    setPlayer('X');
  }

  return (
    <div className='bg-black h-screen w-screen space-y-6 flex flex-col items-center justify-center'>
      <div>
        <h2 className='text-white text-3xl'>Current Player: {player}</h2>
      </div>
      <div className='flex flex-col max-w-7xl bg-white divide-y'>
        {moves?.map((row, index) => (
          <div className='grid grid-cols-3 divide-x divide-gray-300'>
            {row?.map((card, idx) => (
              <div key={idx + index + "card"} onClick={handleClick(index, idx)} className='h-36 flex text-3xl items-center justify-center w-36'>
                {card}
              </div>
            ))}
          </div>
        ))}
      </div>
      <div>
        <button onClick={resetGame} className='bg-white px-11 p-2 text-3xl rounded-md'>
          Reset Game
        </button>
      </div>

    </div>
  )
}

export default App


const allItemsFilled = (items: string[][]) => {
  return items.every(row => row.every(item => item))
}
const checkWinner = (items: string[][]) => {
  // check if the cards are diagonally alligned
  const diagonalItem = [items[0][0], items[1][1], items[2][2]];
  let verticalItems: string[] = [];
  let horizontalItems: string[] = [];
  const aligendDiagonallly = diagonalItem.every(item => item === diagonalItem[0]);
  // checkif the cards are vertically alligned
  let alignedVertically = false;
  for (let i = 0; i < items.length; i++) {
    for (let j = 0; j < items[i].length; j++) {
      console.log(j, i);
      verticalItems.push(items[j][i]);
    }
    console.log("Vertical Items", verticalItems);
    alignedVertically = verticalItems.slice(0, 3).every(item => item === verticalItems[0]);
    if (!alignedVertically) verticalItems = [];
  }

  // check if the cards are horizontally alligned
  let alignedHorizontally = false;
  for (let i = 0; i < items.length; i++) {
    horizontalItems = [...items[i]];
    console.log("Horizontal Items", horizontalItems);
    if (horizontalItems[0] !== "") {
      alignedHorizontally = horizontalItems.every(item => item === horizontalItems[0]);
      if (alignedHorizontally) {
        break;
      };
    }
  }

  if (aligendDiagonallly) return diagonalItem[0];
  if (alignedVertically) return verticalItems[0];
  if (alignedHorizontally) return horizontalItems[0];

  return null;
}