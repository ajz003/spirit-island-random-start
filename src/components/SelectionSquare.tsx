import React from 'react';
import classnames from 'classnames';

type SelectionSquareProps = {
    id: string,
    selection: string,
    onClick: (event: React.MouseEvent<HTMLDivElement>) => void,
    children: React.ReactNode,
    classNames?: string,
}

export default function SelectionSquare({ id, selection, onClick, children, classNames }: SelectionSquareProps) {
    const selectionSquareClasses = classnames('selection-square', classNames, {
        'selected': id === selection,
    })
    return (
        <div
            className={selectionSquareClasses}
            onClick={(e) => onClick(e)}
            data-value={id}
        >
            {children}
        </div>
    );
}
