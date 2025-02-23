export interface PreflopStats {
    hands: number;
    vpip: number;
    pfr: number;
    threeBetPercent: number;
}
export interface Player {
    seat: number,
    name: string,
    stack: number,
    cards?: Array<string>
    stats?: PreflopStats
}