import { Action, ActionPhaseTypes, ActionTypes } from "../domain/action";
import { GameModality } from "../domain/game_modality";
import { Hand, LastPhaseHeroFolded, PotType } from "../domain/hand";
import { Player } from "../domain/player";
import { PokerRooms } from "../domain/poker_rooms";
import { ActionDto, HandDto, HistoryParserApiResponseDto, PlayerDto } from "./history_parser_api.response";

function actionDtoToDomainMapper(actionDto: ActionDto): Action {
    return {
        phase: actionDto.phase as ActionPhaseTypes,
        player: actionDto.player,
        action: actionDto.action as ActionTypes,
        amount: actionDto.amount ?? 0,
        cards: actionDto.cards,
    }
}

function playerDtoToDomain(playerDto: PlayerDto): Player {
    return {
        seat: playerDto.seat,
        name: playerDto.name,
        stack: playerDto.stack,
        cards: playerDto.cards,
    }
}

function handDtoToDomainMapper(handDto: HandDto): Hand {
    return {
        id: handDto.general_info.hand_id,
        currency: handDto.general_info.currency,
        sb: handDto.general_info.small_blind,
        bb: handDto.general_info.big_blind,
        date: new Date(handDto.general_info.datetime),
        game: handDto.general_info.game,
        modality: handDto.general_info.game_type as GameModality,
        actions: handDto.actions?.map(actionDtoToDomainMapper),
        players: handDto.players?.map(playerDtoToDomain),
        room: handDto.general_info.room as PokerRooms, 
        hero: {
            nick: handDto.hero_name,
            cards: handDto.hero_cards,
            seat: handDto.hero_seat,
        },
        winner: handDto.summary?.winner,
        looser: handDto.summary?.looser,
        showdown: handDto.summary.showdown,
        lastPhaseHeroFolded: handDto.summary.last_phase_hero_folded as LastPhaseHeroFolded,
        potType: handDto.summary.pot_type as PotType,
        buttonSeat: handDto.button_seat, 
        tableName: handDto.table_name,
        tableType: handDto.table_type,
        potAmount: handDto.summary.pot,
    }
}

export function historyParserApiToDomainHand(input: HistoryParserApiResponseDto): Array<Hand> {
    return input?.data?.map(handDtoToDomainMapper)
}