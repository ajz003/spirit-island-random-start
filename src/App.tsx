import React from "react";
import logo from "./spirit_island.png";
// import { Counter } from './features/counter/Counter';
import "./App.scss";
import {
  getArchipelagos,
  IArchipelago,
  IInvaderCard,
  getInvaderCardsToDiscard,
  pickRandomIslandBoards,
  getRandomSpirits,
} from "./utils/utils";
import PlayerCountSquare from "./components/PlayerCountSquare";
import {
  ARCHIPELAGOS,
  MAP_SETUP_TYPES,
  MAX_PLAYERS,
  PANGAEA,
  Spirit,
} from "./constants";
import SelectionSquare from "./components/SelectionSquare";
import ArchipelagoSettings from "./components/ArchipelagoSettings";
import MapTypeDescription from "./components/MapTypeDescription";

function App() {
  const [islandBoards, setIslandBoards] = React.useState<string[]>([]);
  const [invaderCardsToDiscard, setInvaderCardsToDiscard] = React.useState<
    IInvaderCard[]
  >([]);
  const [randomSpirits, setRandomSpirits] = React.useState<Spirit[]>([]);
  const [playerCount, setPlayerCount] = React.useState<number>(2);
  const [mapType, setMapType] = React.useState<string>(PANGAEA);
  const [archipelagos, setArchipelagos] = React.useState<IArchipelago[]>([]);
  const [numArchipelagos, setNumArchipelagos] = React.useState<number>(2);
  const [archipelagosCounts, setArchipelagosCounts] = React.useState<number[]>(
    []
  );
  const [archipelagoErrorMessage, setArchipelagoErrorMessage] =
    React.useState<string>("");

  function areValidArchipelagos(archipelagosCounts: number[]): {
    valid: boolean;
    message?: string;
  } {
    if (archipelagosCounts.length !== numArchipelagos) {
      return {
        valid: false,
        message: "Please select the number of boards for EVERY islet.",
      };
    } else if (
      archipelagosCounts.reduce((partialSum, a) => partialSum + a, 0) >
      MAX_PLAYERS
    ) {
      return {
        valid: false,
        message: `The total number of boards across islets currently selected is greater than the maximum allowed number of players (${MAX_PLAYERS}).`,
      };
    }

    return { valid: true };
  }

  const getSetup = () => {
    switch (mapType) {
      case PANGAEA:
        setIslandBoards(pickRandomIslandBoards(playerCount));
        break;
      case ARCHIPELAGOS:
        const { valid, message } = areValidArchipelagos(archipelagosCounts);
        if (valid) {
          setArchipelagoErrorMessage("");
          setArchipelagos(getArchipelagos(archipelagosCounts));
        } else if (message) {
          setArchipelagoErrorMessage(message);
        }
        break;
      default:
        break;
    }
    setInvaderCardsToDiscard(getInvaderCardsToDiscard());
    setRandomSpirits(
      getRandomSpirits(
        mapType === PANGAEA
          ? playerCount
          : archipelagosCounts.reduce((partialSum, a) => partialSum + a, 0)
      )
    );
  };

  const handlePlayerCountSquareClick = (
    e: React.MouseEvent<HTMLDivElement>
  ) => {
    const value = (e.target as HTMLDivElement).getAttribute("data-value");

    if (value) {
      const selectedValue = parseInt(value);
      setPlayerCount(selectedValue);
    }
  };

  const handleMapTypeSquareClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const value = (e.target as HTMLDivElement).getAttribute("data-value");

    if (value) {
      const selectedValue = value;
      setMapType(selectedValue);
    }
  };

  const handleArchipelagosCountSquareClick = (
    e: React.MouseEvent<HTMLDivElement>
  ) => {
    const value = (e.target as HTMLDivElement).getAttribute("data-value");
    setArchipelagosCounts([]);
    if (value) {
      const selectedValue = value;
      setNumArchipelagos(parseInt(selectedValue));
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div>
          <h2>Map Type:</h2>
          <div className="selection-square-wrapper">
            {MAP_SETUP_TYPES.map((type, i) => {
              return (
                <SelectionSquare
                  classNames="map-type-selection"
                  key={"selection-square-" + (i + 1)}
                  selection={mapType}
                  id={type}
                  onClick={handleMapTypeSquareClick}
                >
                  {type}
                </SelectionSquare>
              );
            })}
          </div>
          <MapTypeDescription mapType={mapType} />
        </div>
        {mapType === PANGAEA && (
          <>
            <h2>Player Count:</h2>
            <div className="player-count-square-wrapper">
              {[...Array(MAX_PLAYERS)].map((_, i) => (
                <PlayerCountSquare
                  key={"player-count-square-" + (i + 1)}
                  selectedPlayerCountSquare={playerCount}
                  num={i + 1}
                  onClick={handlePlayerCountSquareClick}
                />
              ))}
            </div>
          </>
        )}
        {mapType === ARCHIPELAGOS && (
          <>
            <h2>Islet Count:</h2>
            <div className="selection-square-wrapper">
              {[...Array(MAX_PLAYERS - 1)].map((_, i) => {
                return (
                  <SelectionSquare
                    classNames="archipelagos-count-square"
                    key={"archipelagos-count-square-" + (i + 2)}
                    selection={numArchipelagos.toString()}
                    id={(i + 2).toString()}
                    onClick={handleArchipelagosCountSquareClick}
                  >
                    {(i + 2).toString()}
                  </SelectionSquare>
                );
              })}
            </div>
          </>
        )}
        {mapType === ARCHIPELAGOS && (
          <ArchipelagoSettings
            numArchipelagos={numArchipelagos}
            archipelagosCounts={archipelagosCounts}
            setArchipelagosCounts={setArchipelagosCounts}
            setArchipelagoErrorMessage={setArchipelagoErrorMessage}
          />
        )}
        <h2>Map Setup:</h2>
        <button onClick={getSetup} className="get-setup">
          Get Setup
        </button>
        {mapType === ARCHIPELAGOS && archipelagoErrorMessage && (
          <p className="archipelago-error-message">{archipelagoErrorMessage}</p>
        )}
        {mapType === PANGAEA && islandBoards.length > 0 && (
          <div>
            <h2>
              Island Boards:{" "}
              {islandBoards.map((board, i) => {
                return board + (i + 1 === islandBoards.length ? "" : ", ");
              })}
            </h2>
          </div>
        )}
        {mapType === ARCHIPELAGOS && archipelagos.length > 0 && (
          <div>
            {archipelagos.map((archipelago, i) => {
              return (
                <div>
                  <h3>Archipelago #{i + 1}</h3>
                  Island Boards:{" "}
                  {archipelago.boards.map((board, i) => {
                    return (
                      board + (i + 1 === archipelago.boards.length ? "" : ", ")
                    );
                  })}
                </div>
              );
            })}
          </div>
        )}
        {randomSpirits.length > 0 && (
          <div>
            <h2>Spirits:</h2>
            <ol>
              {randomSpirits.map(({ name }) => {
                return (
                  <li>
                    <span>{name}</span>
                  </li>
                );
              })}
            </ol>
          </div>
        )}
        {invaderCardsToDiscard.length > 0 && (
          <div>
            <h2>Invader Cards:</h2>
            <ul className="no-bullets">
              {invaderCardsToDiscard.map(({ stage, order }) => {
                return (
                  <li>
                    <span>
                      Stage {stage}: {order}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
