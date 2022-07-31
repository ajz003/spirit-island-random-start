import { MAX_PLAYERS, STAGE_ONE_INVADER_CARD_COUNT, STAGE_THREE_INVADER_CARD_COUNT, STAGE_TWO_INVADER_CARD_COUNT } from "../constants";

export interface IInvaderCard {
    stage: string;
    order: number;
}

export function pickRandomIslandBoards(playerCount: number): string[] {
    let boards: string[] = [];

    for (let i = 65; i < 65 + MAX_PLAYERS; i++) {
        boards.push(String.fromCharCode(i));
    }

    shuffle(boards);

    return boards.slice(0, playerCount);
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
