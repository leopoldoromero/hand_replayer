import { shortedRange } from "./get_range_string"

export const cardsToUiMapper = (cards: Array<string>) => {
    const suitMap: {[key in string]: string} = {'s': '♠', 'h': '♥', 'd': '♦', 'c': '♣'}
    return cards.map(((card) => `${card[0]}${suitMap[card[1]]}`))
}

export const rangeUiFormated = (selectedRange: Array<string>, maxLength = 5) => {
  const rangeAsString = shortedRange(selectedRange)?.join(', ')
  return rangeAsString.length > maxLength * 3 ? `${rangeAsString.split(',').slice(0, maxLength).join('')}...` : rangeAsString
}