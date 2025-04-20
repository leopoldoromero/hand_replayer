import { handApiResponseMock, playerStatsMock } from "@/__mocks__/hand_api_response.mock";
import { Action, ActionPhaseTypes, ActionTypes } from "../domain/action";
import { GameModality } from "../domain/game_modality";
import { Hand, LastPhaseHeroFolded, PotType, SummaryPlayer } from "../domain/hand";
import { Player } from "../domain/player";
import { PokerRooms } from "../domain/poker_rooms";
import { actionDtoToDomainMapper, handDtoToDomainMapper, playerDtoToDomain } from "./hand_api_response_to_domain.mapper";


describe('[[HandApiResponseToDomainMapperTest]]', () => {
    it('should create a valid action from an action dto', () => {
        const expectedAction: Action = {
            phase: ActionPhaseTypes.PRE_FLOP,
            player: 'player2',
            action: ActionTypes.SB,
            amount: 0.02,
            cards: []
        }
        const result = actionDtoToDomainMapper(handApiResponseMock.actions[0]);
        for (const [key, value] of Object.entries(expectedAction)) {
            expect(value).toEqual(result[key as keyof Action]);
        }
    });

    it('should create a valid player from a player dto', () => {
        const expectedPlayer: Player =  { 
            seat: 1, 
            name: 'player1', 
            stack: 4.01,
            stats: playerStatsMock.player1,
        }
        const { seat, name, stack, stats: playerStats} = playerDtoToDomain(handApiResponseMock.players[0], playerStatsMock);
        
        expect(seat).toEqual(expectedPlayer.seat)
        expect(name).toEqual(expectedPlayer.name)
        expect(stack).toEqual(expectedPlayer.stack)
        expect(playerStats?.hands).toEqual(expectedPlayer.stats?.hands)
        expect(playerStats?.pfr).toEqual(expectedPlayer.stats?.pfr)
        expect(playerStats?.threeBetPercent).toEqual(expectedPlayer.stats?.threeBetPercent)
        expect(playerStats?.vpip).toEqual(expectedPlayer.stats?.vpip)
    });

    it('should create a valid hand from a hand dto', () => {
        const expectedHand: Hand =  {
            id: '2a8a06e5-5225-4471-8041-c99753495a44',
            userId: '05225578-fe51-4268-bbc3-d052bdefc2e5',
            currency: '€',
            sb: 0.02,
            bb: 0.05,
            date: new Date('2025-02-07T20:47:56.000Z'),
            game: "Hold'em",
            modality: GameModality.ZOOM,
            actions: [
              {
                phase: ActionPhaseTypes.PRE_FLOP,
                player: 'player2',
                action: ActionTypes.SB,
                amount: 0.02,
                cards: []
              },
              {
                phase: ActionPhaseTypes.PRE_FLOP,
                player: 'player3',
                action: ActionTypes.BB,
                amount: 0.05,
                cards: []
              },
              {
                phase: ActionPhaseTypes.PRE_FLOP,
                player: 'player4',
                action: ActionTypes.FOLD,
                amount: 0,
                cards: []
              },
              {
                phase: ActionPhaseTypes.PRE_FLOP,
                player: 'hero',
                action: ActionTypes.FOLD,
                amount: 0,
                cards: []
              },
              {
                phase: ActionPhaseTypes.PRE_FLOP,
                player: 'player5',
                action: ActionTypes.FOLD,
                amount: 0,
                cards: []
              },
              {
                phase: ActionPhaseTypes.PRE_FLOP,
                player: 'player1',
                action: ActionTypes.RAISE,
                amount: 0.15,
                cards: []
              },
              {
                phase: ActionPhaseTypes.PRE_FLOP,
                player: 'player2',
                action: ActionTypes.CALL,
                amount: 0.13,
                cards: []
              },
              {
                phase: ActionPhaseTypes.PRE_FLOP,
                player: 'player3',
                action: ActionTypes.FOLD,
                amount: 0,
                cards: []
              },
              {
                phase: ActionPhaseTypes.FLOP,
                player: 'player2',
                action: ActionTypes.CHECK,
                amount: 0,
                cards: []
              },
              {
                phase: ActionPhaseTypes.FLOP,
                player: 'player1',
                action: ActionTypes.CHECK,
                amount: 0,
                cards: []
              },
              {
                phase: ActionPhaseTypes.TURN,
                player: 'player2',
                action: ActionTypes.BET,
                amount: 0.4,
                cards: []
              },
              {
                phase: ActionPhaseTypes.TURN,
                player: 'player1',
                action: ActionTypes.FOLD,
                amount: 0,
                cards: []
              }
            ],
            players: [
              { seat: 1, name: 'player1', stack: 4.01, cards: undefined },
              { seat: 2, name: 'player2', stack: 9.48, cards: undefined },
              { seat: 3, name: 'player3', stack: 5, cards: undefined },
              { seat: 4, name: 'player4', stack: 5.43, cards: undefined },
              { seat: 5, name: 'hero', stack: 6.16, cards: undefined },
              { seat: 6, name: 'player6', stack: 6.79, cards: undefined }
            ],
            room: PokerRooms.STARS,
            hero: { nick: 'hero', cards: [ '7c', 'Js' ], seat: 5 },
            winner: { seat: 2, name: 'player2', cards: [], amount: 0.33 },
            looser: null,
            showdown: false,
            lastPhaseHeroFolded: LastPhaseHeroFolded.PRE_FLOP,
            potType: PotType.OPEN_RAISED,
            buttonSeat: 1,
            tableName: 'Asterope',
            tableType: '6-max',
            potAmount: 0.35
          }
        const result = handDtoToDomainMapper(handApiResponseMock);
        const {id, potType, buttonSeat, tableName, hero, winner} = result;

        expect(id).toEqual(expectedHand.id)
        expect(potType).toEqual(expectedHand.potType)
        expect(buttonSeat).toEqual(expectedHand.buttonSeat)
        expect(tableName).toEqual(expectedHand.tableName)

        for (const [key, value] of Object.entries(hero ?? {})) {
            expect(value).toEqual(result.hero[key as keyof Hand['hero']]);
        }
        for (const [key, value] of Object.entries(winner ?? {})) {
            expect(value).toEqual((result.winner as SummaryPlayer)[key as keyof SummaryPlayer]);
        }
    });
});