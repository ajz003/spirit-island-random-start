import React from 'react';
import logo from './spirit_island.png';
// import { Counter } from './features/counter/Counter';
import './App.css';
import { IInvaderCard, pickInvaderCardsToDiscard, pickRandomIslandBoards } from './utils/utils';
import PlayerCountSquare from './components/PlayerCountSquare';
import { MAP_SETUP_TYPES, MAX_PLAYERS } from './constants';
import SelectionSquare from './components/SelectionSquare';

function App() {

  const [islandBoards, setIslandBoards] = React.useState<string[]>([]);
  const [invaderCardsToDiscard, setInvaderCardsToDiscard] = React.useState<IInvaderCard[]>([]);
  const [playerCount, setPlayerCount] = React.useState<number>(2);
  const [mapType, setMapType] = React.useState<number>(1);

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
    }
  }

  const handleMapTypeSquareClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const value = (e.target as HTMLDivElement).getAttribute('data-value');

    if (value) {
      const selectedValue = parseInt(value);
      setMapType(selectedValue);
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h2>Player Count:</h2>
        <div className='player-count-square-wrapper'>
          {
            [...Array(MAX_PLAYERS)].map((_, i) =>
              <PlayerCountSquare
                key={'player-count-square-' + (i + 1)}
                selectedPlayerCountSquare={playerCount}
                num={i + 1}
                onClick={handlePlayerCountSquareClick}
              />
            )
          }
        </div>
        <div className='selection-square-wrapper'>
          {
            MAP_SETUP_TYPES.map((type, i) => {
              return (
                <SelectionSquare
                  key={'selection-square-' + (i + 1)}
                  selection={mapType}
                  id={i + 1}
                  onClick={handleMapTypeSquareClick}
                  label={type}
                />
              )
            })
          }
        </div>
        <h2>Map Setup:</h2>
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
