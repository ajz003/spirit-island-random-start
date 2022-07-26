import React from 'react';
import logo from './spirit_island.png';
// import { Counter } from './features/counter/Counter';
import './App.css';
import { IInvaderCard, MAX_PLAYERS, pickInvaderCardsToDiscard, pickRandomIslandBoards } from './utils/utils';
import PlayerCountSquare from './components/PlayerCountSquare';

function App() {

  const [islandBoards, setIslandBoards] = React.useState<string[]>([]);
  const [invaderCardsToDiscard, setInvaderCardsToDiscard] = React.useState<IInvaderCard[]>([]);
  const [playerCount, setPlayerCount] = React.useState<number>(2);
  const [selectedPlayerCountSquare, setSelectedPlayerCountSquare] = React.useState<number>(2);

  const getRandom = () => {
    if (playerCount === MAX_PLAYERS) {

    }
    setIslandBoards(pickRandomIslandBoards(playerCount));
    setInvaderCardsToDiscard(pickInvaderCardsToDiscard());
  }


  const handlePlayerCountSquareClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const value = (e.target as HTMLDivElement).getAttribute('data-value');

    if (value) {
      const selectedValue = parseInt(value);
      setPlayerCount(selectedValue);
      setSelectedPlayerCountSquare(selectedValue);
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div className='player-count-square-wrapper'>
          {
            [...Array(MAX_PLAYERS)].map((_, i) =>
              <PlayerCountSquare
                key={'player-count-square-' + (i + 1)}
                selectedPlayerCountSquare={selectedPlayerCountSquare}
                num={i + 1}
                onClick={handlePlayerCountSquareClick}
              />
            )
          }
        </div>
        <button
          onClick={getRandom}
          className='get-setup'
        >
          Get Setup
        </button>
        <div>
          <h2>Island Boards: {islandBoards.map((board, i) => {
            return (
              board + (i + 1 === islandBoards.length ? '' : ', ')
            )
          })}
          </h2>
        </div>
        <div>
          <h2>Invader Cards:</h2>
          <ul>
            {
              invaderCardsToDiscard.map(({ stage, order }) => {
                return (
                  <li>
                    <span>Stage {stage}: {order}</span>
                  </li>
                )
              })
            }
          </ul>
        </div>
      </header>
    </div>
  );
}

export default App;
