import React from 'react';
import logo from './spirit_island.png';
// import { Counter } from './features/counter/Counter';
import './App.css';
import { IInvaderCard, MAX_PLAYERS, pickInvaderCardsToDiscard, pickRandomIslandBoards } from './utils/utils';

function App() {

  const [islandBoards, setIslandBoards] = React.useState<string[]>([]);
  const [invaderCardsToDiscard, setInvaderCardsToDiscard] = React.useState<IInvaderCard[]>([]);
  const [playerCount, setPlayerCount] = React.useState<number>(2);

  const getRandom = () => {
    if (playerCount === MAX_PLAYERS) {

    }
    setIslandBoards(pickRandomIslandBoards(playerCount));
    setInvaderCardsToDiscard(pickInvaderCardsToDiscard());
  }

  return (
    <div className="App">
      <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <label htmlFor="playerCount">Player Count:</label>
      <select name="playerCount" id="playerCount"
        onChange={(e) => setPlayerCount(parseInt(e.target.value))}
      >
        {
          [...Array(MAX_PLAYERS)].map((_, i) => <option selected={playerCount === i+1} value={i+1}>{i+1}</option>)
        }
      </select>
        <button
          onClick={getRandom}
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
