import React from 'react';
import logo from './spirit_island.png';
// import { Counter } from './features/counter/Counter';
import './App.css';
import { getArchipelagos, IArchipelago, IInvaderCard, pickInvaderCardsToDiscard, pickRandomIslandBoards } from './utils/utils';
import PlayerCountSquare from './components/PlayerCountSquare';
import { ARCHIPELAGOS, MAP_SETUP_TYPES, MAX_PLAYERS, PANGAEA } from './constants';
import SelectionSquare from './components/SelectionSquare';

function App() {

  const [islandBoards, setIslandBoards] = React.useState<string[]>([]);
  const [invaderCardsToDiscard, setInvaderCardsToDiscard] = React.useState<IInvaderCard[]>([]);
  const [playerCount, setPlayerCount] = React.useState<number>(2);
  const [mapType, setMapType] = React.useState<string>(ARCHIPELAGOS);
  const [archipelagos, setArchipelagos] = React.useState<IArchipelago[]>([])
  const [numArchipelagos, setNumArchipelagos] = React.useState<number>(2);
  const [archipelagosCounts, setArchipelagosCounts] = React.useState<number[]>([]);
  const [archipelagoErrorMessage, setArchipelagoErrorMessage] = React.useState<string>('');

  function areValidArchipelagos(archipelagosCounts: number[]) {
    if (archipelagosCounts.length !== numArchipelagos) {
      return false;
    } else if (archipelagosCounts.reduce((partialSum, a) => partialSum + a, 0) !== playerCount) {
      return false;
    }

    return true;
  }

  const getSetup = () => {
    if (playerCount === MAX_PLAYERS) {

    }
    switch (mapType) {
      case PANGAEA:
        setIslandBoards(pickRandomIslandBoards(playerCount));
        break;
      case ARCHIPELAGOS:
        if (areValidArchipelagos(archipelagosCounts)) {
          setArchipelagoErrorMessage('');

          setArchipelagos(getArchipelagos(archipelagosCounts));
        } else {
          setArchipelagoErrorMessage('Error: please check your archipelago settings and try again.');
        }
        break;
      default:
        break;
    }
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
      const selectedValue = value;
      setMapType(selectedValue);
    }
  }

  const handleArchipelagosCountSquareClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const value = (e.target as HTMLDivElement).getAttribute('data-value');

    if (value) {
      const selectedValue = value;
      setNumArchipelagos(parseInt(selectedValue));
    }
  }

  const handleArchipelagosBoardCountSquareClick = (e: React.MouseEvent<HTMLDivElement>, index: number, boardsOnThisArchipelago: number) => {
    let newArchipelagoCounts = [...archipelagosCounts];
    newArchipelagoCounts[index] = boardsOnThisArchipelago;
    setArchipelagosCounts(newArchipelagoCounts);
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
                  id={type}
                  onClick={handleMapTypeSquareClick}
                >
                  {type}
                </SelectionSquare>
              )
            })
          }
        </div>
        {mapType === ARCHIPELAGOS &&
          <>
            <h2>Archipelago Count:</h2>
            <div className='selection-square-wrapper'>
              {
                [...Array(MAX_PLAYERS)].map((_, i) => {
                  return (
                    <SelectionSquare
                      classNames='archipelagos-count-square'
                      key={'archipelagos-count-square-' + (i + 1)}
                      selection={numArchipelagos.toString()}
                      id={(i + 1).toString()}
                      onClick={handleArchipelagosCountSquareClick}
                    >
                      {(i + 1).toString()}
                    </SelectionSquare>
                  )
                })
              }
            </div>
          </>
        }
        {mapType === ARCHIPELAGOS &&
          <>
            <h2>Archipelago Settings:</h2>
            <div className='archipelago-settings-wrapper'>
              {
                [...Array(numArchipelagos)].map((_, i) => {
                  return (
                    <div key={`archipelagos-settings-${i}`} className='archipelago-setting-wrapper'>
                      <h3>Archipelago #{i + 1}</h3>
                      <h4>Number of Boards</h4>
                      <div className='selection-square-wrapper'>
                        {
                          [...Array(MAX_PLAYERS)].map((_, j) => {
                            return (
                              <SelectionSquare
                                classNames='archipelagos-count-square'
                                key={'archipelagos-count-square-' + (j + 1)}
                                selection={archipelagosCounts[i]?.toString()}
                                id={(j + 1).toString()}
                                onClick={(e) => { handleArchipelagosBoardCountSquareClick(e, i, j + 1) }}
                              >
                                {(j + 1).toString()}
                              </SelectionSquare>
                            )
                          })
                        }
                      </div>
                    </div>
                  )
                })
              }
            </div>
          </>
        }
        <h2>Map Setup:</h2>
        <button
          onClick={getSetup}
          className='get-setup'
        >
          Get Setup
        </button>
        {mapType === ARCHIPELAGOS && archipelagoErrorMessage &&
          <p>{archipelagoErrorMessage}</p>
        }
        <div>
          <h2>Island Boards: {islandBoards.map((board, i) => {
            return (
              board + (i + 1 === islandBoards.length ? '' : ', ')
            )
          })}
          </h2>
        </div>
        {mapType === ARCHIPELAGOS &&
          <div>
            {archipelagos.map((archipelago, i) => {
              return (
                <div>
                  <h3>Archipelago #{i + 1}</h3>
                  Island Boards: {archipelago.boards.map((board, i) => {
                    return (
                      board + (i + 1 === archipelago.boards.length ? '' : ', ')
                    )
                  })}
                </div>
              )
            })}
          </div>
        }
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
