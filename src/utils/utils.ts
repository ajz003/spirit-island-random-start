import { STAGE_ONE_INVADER_CARD_COUNT, STAGE_THREE_INVADER_CARD_COUNT, STAGE_TWO_INVADER_CARD_COUNT } from "../constants";

export interface IInvaderCard {
    stage: string;
    order: number;
}

const ALL_ISLAND_BOARDS = ['A', 'B', 'C', 'D', 'E', 'F'] as const;
type IslandBoardsTuple = typeof ALL_ISLAND_BOARDS;
type IslandBoard = IslandBoardsTuple[number];

export interface IArchipelago {
    count: number;
    boards: IslandBoard[];
}

function shuffle<T>(array: T[]): T[] {
    let currentIndex = array.length, randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex !== 0) {

        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }

    return array;
}

function createIslandBoardsArray() {
    let boards: IslandBoard[] = [];

    for (let i = 0; i < ALL_ISLAND_BOARDS.length; i++) {
        boards.push(ALL_ISLAND_BOARDS[i]);
    }

    return boards
}

export function pickRandomIslandBoards(playerCount: number): IslandBoard[] {
    const boards = createIslandBoardsArray();

    shuffle(boards);

    return boards.slice(0, playerCount);
}

function hasIncompatibleBoardsTogether(boards: IslandBoard[]) {
    if ((boards.includes('E') && boards.includes('B')) || (boards.includes('D') && boards.includes('F'))) {
        return true;
    }
}

export function getArchipelagos(counts: number[]): IArchipelago[] {
    const archipelagos = [];

    while (archipelagos.length < counts.length) {
        const boards = createIslandBoardsArray();
        shuffle(boards);
        for (let i = 0; i < counts.length; i++) {
            let archipelago: IArchipelago = {
                count: counts[i],
                boards: boards.splice(0, counts[i]),
            }
            if (hasIncompatibleBoardsTogether(archipelago.boards)) {
                console.log('INCOMPATIBLE!', archipelago.boards)
                archipelagos.length = 0;
                console.log(archipelagos.length);
                break;
            }
            archipelagos.push(archipelago);
        }        
    }

    return archipelagos;
}

export function pickInvaderCardsToDiscard(): IInvaderCard[] {
    let cardsToRemove: IInvaderCard[] = [
        {
            stage: 'I',
            order: getRandomIntInclusive(1, STAGE_ONE_INVADER_CARD_COUNT),
        },
        {
            stage: 'II',
            order: getRandomIntInclusive(1, STAGE_TWO_INVADER_CARD_COUNT),
        },
        {
            stage: 'III',
            order: getRandomIntInclusive(1, STAGE_THREE_INVADER_CARD_COUNT),
        },
    ];

    return cardsToRemove;
}

function getRandomIntInclusive(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
  }
