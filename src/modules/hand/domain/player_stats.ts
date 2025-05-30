export type PlayerStats = {
  [key in string]: {
    hands: number;
    vpip: number;
    pfr: number;
    threeBetPercent: number;
  };
};
