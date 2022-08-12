import React from "react";
import { MAX_PLAYERS } from "../constants";
import SelectionSquare from "./SelectionSquare";

type ArchipelagoSettingsProps = {
  numArchipelagos: number;
  archipelagosCounts: number[];
  handleArchipelagosBoardCountSquareClick: (
    e: React.MouseEvent<HTMLDivElement>,
    index: number,
    boardsOnThisArchipelago: number
  ) => void;
};

function ArchipelagoSettings({
  numArchipelagos,
  archipelagosCounts,
  handleArchipelagosBoardCountSquareClick,
}: ArchipelagoSettingsProps) {
  return (
    <div>
      <h2>Archipelago Settings:</h2>
      <div className="archipelago-settings-wrapper">
        {[...Array(numArchipelagos)].map((_, i) => {
          return (
            <div
              key={`archipelagos-settings-${i}`}
              className="archipelago-setting-wrapper"
            >
              <h3>Archipelago #{i + 1}</h3>
              <h4>Number of Boards</h4>
              <div className="selection-square-wrapper">
                {[...Array(MAX_PLAYERS)].map((_, j) => {
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
