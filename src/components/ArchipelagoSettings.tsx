import React from "react";
import { MAX_PLAYERS } from "../constants";
import SelectionSquare from "./SelectionSquare";

type ArchipelagoSettingsProps = {
  numArchipelagos: number;
  archipelagosCounts: number[];
  setArchipelagosCounts: React.Dispatch<React.SetStateAction<number[]>>;
  setArchipelagoErrorMessage: React.Dispatch<React.SetStateAction<string>>;
};

function ArchipelagoSettings({
  numArchipelagos,
  archipelagosCounts,
  setArchipelagosCounts,
  setArchipelagoErrorMessage,
}: ArchipelagoSettingsProps) {
  const handleArchipelagosBoardCountSquareClick = (
    e: React.MouseEvent<HTMLDivElement>,
    index: number,
    boardsOnThisArchipelago: number
  ) => {
    let newArchipelagoCounts = [...archipelagosCounts];
    newArchipelagoCounts[index] = boardsOnThisArchipelago;
    if (
      newArchipelagoCounts.reduce((partialSum, a) => partialSum + a, 0) <=
      MAX_PLAYERS
    ) {
      setArchipelagoErrorMessage("");
      setArchipelagosCounts(newArchipelagoCounts);
    } else {
      setArchipelagoErrorMessage(
        `You cannot have more boards than the maximum allowed players (${MAX_PLAYERS}).`
      );
    }
  };

  return (
    <div>
      <h2>Islet Settings:</h2>
      <div className="archipelago-settings-wrapper">
        {[...Array(numArchipelagos)].map((_, i) => {
          return (
            <div
              key={`archipelagos-settings-${i}`}
              className="archipelago-setting-wrapper"
            >
              <h3>Islet #{i + 1}</h3>
              <h4>Number of Boards (Players)</h4>
              <div className="selection-square-wrapper">
                {[...Array(MAX_PLAYERS - numArchipelagos + 1)].map((_, j) => {
                  return (
                    <SelectionSquare
                      classNames="archipelagos-count-square"
                      key={"archipelagos-count-square-" + (j + 1)}
                      selection={archipelagosCounts[i]?.toString()}
                      id={(j + 1).toString()}
                      onClick={(e) => {
                        handleArchipelagosBoardCountSquareClick(e, i, j + 1);
                      }}
                    >
                      {(j + 1).toString()}
                    </SelectionSquare>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ArchipelagoSettings;
