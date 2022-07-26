import React from 'react';
import classnames from 'classnames';

type PlayerCountSquareProps = {
    num: number,
    selectedPlayerCountSquare: number,
    onClick: (event: React.MouseEvent<HTMLDivElement>) => void,
}

export default function PlayerCountSquare({ num, selectedPlayerCountSquare, onClick }: PlayerCountSquareProps) {
    const playerCountSquareClasses = classnames('player-count-square', {
        'selected': num === selectedPlayerCountSquare,
    })
    return (
        <div
            className={playerCountSquareClasses}
            onClick={(e) => onClick(e)}
            data-value={num}
        >
            {num}
        </div>
    );
}
