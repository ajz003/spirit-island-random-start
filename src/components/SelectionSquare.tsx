import React from 'react';
import classnames from 'classnames';

type SelectionSquareProps = {
    id: number,
    selection: number,
    onClick: (event: React.MouseEvent<HTMLDivElement>) => void,
    label: string,
}

export default function SelectionSquare({ id, selection, onClick, label }: SelectionSquareProps) {
    const selectionSquareClasses = classnames('selection-square', {
        'selected': id === selection,
    })
    return (
        <div
            className={selectionSquareClasses}
            onClick={(e) => onClick(e)}
            data-value={id}
        >
            {label}
        </div>
    );
}
