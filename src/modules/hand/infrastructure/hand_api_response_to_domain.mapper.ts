import { Action, ActionPhaseTypes, ActionTypes } from '../domain/action';
import { GameModality } from '../domain/game_modality';
import { Hand, LastPhaseHeroFolded, PotType } from '../domain/hand';
import { Player } from '../domain/player';
import { PlayerStats } from '../domain/player_stats';
import { PokerRooms } from '../domain/poker_rooms';
import { ActionDto, HandDto, PlayerDto } from './history_parser_api.response';

// TODO: review phase and action squema in backend.
export function actionDtoToDomainMapper(actionDto: ActionDto): Action {
  return {
    phase: actionDto.phase as ActionPhaseTypes,
    player: actionDto.player,
    action: actionDto.action as ActionTypes,
    amount: actionDto.amount ?? 0,
    cards: actionDto.cards,
  };
}

export function playerDtoToDomain(
  playerDto: PlayerDto,
  playerStats?: PlayerStats
): Player {
  const playerStatsOrNull =
    playerStats && playerStats[playerDto.name]
      ? playerStats[playerDto.name]
      : null;
  return {
    seat: playerDto.seat,
    name: playerDto.name,
    stack: playerDto.stack,
    cards: playerDto.cards,
    ...(playerStatsOrNull && {
      stats: {
        hands: playerStatsOrNull.hands,
        vpip: playerStatsOrNull.vpip,
        pfr: playerStatsOrNull.pfr,
        threeBetPercent: playerStatsOrNull.threeBetPercent,
      },
    }),
  };
}

export function handDtoToDomainMapper(
  handDto: HandDto,
  playerStats?: PlayerStats
): Hand {
  return {
    id: handDto?.id,
    userId: handDto?.user_id,
    currency: handDto.general_info.currency,
    sb: handDto.general_info.small_blind,
    bb: handDto.general_info.big_blind,
    date: new Date(handDto.general_info.datetime),
    game: handDto.general_info.game,
    modality: handDto.general_info.game_type as GameModality,
    actions: handDto.actions?.map(actionDtoToDomainMapper),
    players: handDto.players?.map((playerDto) =>
      playerDtoToDomain(playerDto, playerStats)
    ),
    room: handDto.general_info.room as PokerRooms,
    hero: {
      nick: handDto.hero_name,
      cards: handDto.hero_cards,
      seat: handDto.hero_seat,
    },
    winner: handDto.summary?.winner,
    looser: handDto.summary?.looser,
    showdown: handDto.summary.showdown,
    lastPhaseHeroFolded: handDto.summary
      .last_phase_hero_folded as LastPhaseHeroFolded,
    potType: handDto.summary.pot_type as PotType,
    buttonSeat: handDto.button_seat,
    tableName: handDto.table_name,
    tableType: handDto.table_type,
    potAmount: handDto.summary.pot,
  };
}
