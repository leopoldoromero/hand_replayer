import { Hand } from "@/modules/hand/domain/hand";
import { HistoryParserRepository } from "@/modules/hand/domain/history_parser.repository";
import { HistoryParserApiResponseDto } from "@/modules/hand/infrastructure/history_parser_api.response";
import { historyParserApiToDomainHand } from "@/modules/hand/infrastructure/history_parser_api_to_domain.mapper";

export class MockHistoryParserApiClient implements HistoryParserRepository {
    private mockResponse: HistoryParserApiResponseDto = {
        data: [
            {
                "general_info": {
                    "hand_id": "254717133582",
                    "datetime": "05-02-2025 12:29:33",
                    "game_type": "zoom",
                    "currency": "€",
                    "small_blind": 0.02,
                    "big_blind": 0.05,
                    "game": "Hold'em",
                    "room": "STARS"
                },
                "players": [
                    {
                        "seat": 1,
                        "name": "Nicoromero87",
                        "stack": 9.55
                    },
                    {
                        "seat": 2,
                        "name": "Mauuu_bg",
                        "stack": 4.78
                    },
                    {
                        "seat": 3,
                        "name": "ghanjaman007",
                        "stack": 5.26
                    },
                    {
                        "seat": 4,
                        "name": "camamo26",
                        "stack": 6.3
                    },
                    {
                        "seat": 5,
                        "name": "SachS1970",
                        "stack": 5.09
                    },
                    {
                        "seat": 6,
                        "name": "CHTIDAN59",
                        "stack": 3.08
                    }
                ],
                "hero_cards": [
                    "3h",
                    "6s"
                ],
                "hero_name": 'Nicoromero87',
                "actions": [
                    {
                        "phase": "PRE-FLOP",
                        "player": "Mauuu_bg",
                        "action": "small_blind",
                        "amount": 0.02,
                        "cards": []
                    },
                    {
                        "phase": "PRE-FLOP",
                        "player": "ghanjaman007",
                        "action": "big_blind",
                        "amount": 0.05,
                        "cards": []
                    },
                    {
                        "phase": "PRE-FLOP",
                        "player": "camamo26",
                        "action": "call",
                        "amount": 0.05,
                        "cards": []
                    },
                    {
                        "phase": "PRE-FLOP",
                        "player": "SachS1970",
                        "action": "call",
                        "amount": 0.05,
                        "cards": []
                    },
                    {
                        "phase": "PRE-FLOP",
                        "player": "CHTIDAN59",
                        "action": "call",
                        "amount": 0.05,
                        "cards": []
                    },
                    {
                        "phase": "PRE-FLOP",
                        "player": "Nicoromero87",
                        "action": "fold",
                        "amount": null,
                        "cards": []
                    },
                    {
                        "phase": "PRE-FLOP",
                        "player": "Mauuu_bg",
                        "action": "call",
                        "amount": 0.03,
                        "cards": []
                    },
                    {
                        "phase": "PRE-FLOP",
                        "player": "ghanjaman007",
                        "action": "check",
                        "amount": null,
                        "cards": []
                    },
                    {
                        "phase": "FLOP",
                        "player": "Mauuu_bg",
                        "action": "check",
                        "amount": null,
                        "cards": [
                            "Ks",
                            "Ac",
                            "Qc"
                        ]
                    },
                    {
                        "phase": "FLOP",
                        "player": "ghanjaman007",
                        "action": "check",
                        "amount": null,
                        "cards": [
                            "4s",
                            "Ac",
                            "5c"
                        ]
                    },
                    {
                        "phase": "FLOP",
                        "player": "camamo26",
                        "action": "check",
                        "amount": null,
                        "cards": [
                            "4s",
                            "Ac",
                            "5c"
                        ]
                    },
                    {
                        "phase": "FLOP",
                        "player": "SachS1970",
                        "action": "bet",
                        "amount": 0.24,
                        "cards": [
                            "4s",
                            "Ac",
                            "5c"
                        ]
                    },
                    {
                        "phase": "FLOP",
                        "player": "CHTIDAN59",
                        "action": "call",
                        "amount": 0.24,
                        "cards": [
                            "4s",
                            "Ac",
                            "5c"
                        ]
                    },
                    {
                        "phase": "FLOP",
                        "player": "Mauuu_bg",
                        "action": "call",
                        "amount": 0.24,
                        "cards": [
                            "4s",
                            "Ac",
                            "5c"
                        ]
                    },
                    {
                        "phase": "FLOP",
                        "player": "ghanjaman007",
                        "action": "fold",
                        "amount": null,
                        "cards": [
                            "4s",
                            "Ac",
                            "5c"
                        ]
                    },
                    {
                        "phase": "FLOP",
                        "player": "camamo26",
                        "action": "fold",
                        "amount": null,
                        "cards": [
                            "4s",
                            "Ac",
                            "5c"
                        ]
                    },
                    {
                        "phase": "TURN",
                        "player": "Mauuu_bg",
                        "action": "check",
                        "amount": null,
                        "cards": [
                            "4s",
                            "Ac",
                            "5c",
                            "7c"
                        ]
                    },
                    {
                        "phase": "TURN",
                        "player": "SachS1970",
                        "action": "check",
                        "amount": null,
                        "cards": [
                            "4s",
                            "Ac",
                            "5c",
                            "7c"
                        ]
                    },
                    {
                        "phase": "TURN",
                        "player": "CHTIDAN59",
                        "action": "bet",
                        "amount": 0.46,
                        "cards": [
                            "4s",
                            "Ac",
                            "5c",
                            "7c"
                        ]
                    },
                    {
                        "phase": "TURN",
                        "player": "Mauuu_bg",
                        "action": "fold",
                        "amount": null,
                        "cards": [
                            "4s",
                            "Ac",
                            "5c",
                            "7c"
                        ]
                    },
                    {
                        "phase": "TURN",
                        "player": "SachS1970",
                        "action": "fold",
                        "amount": null,
                        "cards": [
                            "4s",
                            "Ac",
                            "5c",
                            "7c"
                        ]
                    }
                ],
                "summary": {
                    "player_actions": [
                        {
                            "seat": 1,
                            "name": "Nicoromero87",
                            "details": "",
                            "amount": 0
                        },
                        {
                            "seat": 2,
                            "name": "Mauuu_bg",
                            "details": "",
                            "amount": 0
                        },
                        {
                            "seat": 3,
                            "name": "ghanjaman007",
                            "details": "",
                            "amount": 0
                        },
                        {
                            "seat": 4,
                            "name": "camamo26",
                            "details": "",
                            "amount": 0
                        },
                        {
                            "seat": 5,
                            "name": "SachS1970",
                            "details": "",
                            "amount": 0
                        },
                        {
                            "seat": 6,
                            "name": "CHTIDAN59",
                            "details": "recaudó (0.92 €)",
                            "amount": 0.92
                        }
                    ],
                    "pot": 0.97,
                    "rake": 0.05
                },
                "showdown": null,
                "finish_before_showdown": [
                    {
                        "player": "CHTIDAN59",
                        "action": "uncalled_bet_return",
                        "amount": 0.46
                    },
                    {
                        "player": "CHTIDAN59",
                        "action": "wins_pot",
                        "amount": 0.92
                    }
                ]
            },
            {
                "general_info": {
                    "hand_id": "254717130528",
                    "datetime": "05-02-2025 12:29:09",
                    "game_type": "zoom",
                    "currency": "€",
                    "small_blind": 0.02,
                    "big_blind": 0.05,
                    "game": "Hold'em",
                    "room": "STARS"
                },
                "players": [
                    {
                        "seat": 1,
                        "name": "ghanjaman007",
                        "stack": 5.78
                    },
                    {
                        "seat": 2,
                        "name": "Nicoromero87",
                        "stack": 5.93
                    },
                    {
                        "seat": 3,
                        "name": "GhostGambler1",
                        "stack": 5.3
                    },
                    {
                        "seat": 4,
                        "name": "ciocobel",
                        "stack": 4.82
                    },
                    {
                        "seat": 5,
                        "name": "imanol119",
                        "stack": 1.31
                    },
                    {
                        "seat": 6,
                        "name": "Mauuu_bg",
                        "stack": 4.64
                    }
                ],
                "hero_cards": [
                    "Kc",
                    "Qc"
                ],
                "hero_name": 'Nicoromero87',
                "actions": [
                    {
                        "phase": "PRE-FLOP",
                        "player": "Nicoromero87",
                        "action": "small_blind",
                        "amount": 0.02,
                        "cards": []
                    },
                    {
                        "phase": "PRE-FLOP",
                        "player": "GhostGambler1",
                        "action": "big_blind",
                        "amount": 0.05,
                        "cards": []
                    },
                    {
                        "phase": "PRE-FLOP",
                        "player": "ciocobel",
                        "action": "raise",
                        "amount": 0.11,
                        "cards": []
                    },
                    {
                        "phase": "PRE-FLOP",
                        "player": "imanol119",
                        "action": "call",
                        "amount": 0.11,
                        "cards": []
                    },
                    {
                        "phase": "PRE-FLOP",
                        "player": "Mauuu_bg",
                        "action": "fold",
                        "amount": null,
                        "cards": []
                    },
                    {
                        "phase": "PRE-FLOP",
                        "player": "ghanjaman007",
                        "action": "fold",
                        "amount": null,
                        "cards": []
                    },
                    {
                        "phase": "PRE-FLOP",
                        "player": "Nicoromero87",
                        "action": "raise",
                        "amount": 0.64,
                        "cards": []
                    },
                    {
                        "phase": "PRE-FLOP",
                        "player": "GhostGambler1",
                        "action": "fold",
                        "amount": null,
                        "cards": []
                    },
                    {
                        "phase": "PRE-FLOP",
                        "player": "ciocobel",
                        "action": "fold",
                        "amount": null,
                        "cards": []
                    },
                    {
                        "phase": "PRE-FLOP",
                        "player": "imanol119",
                        "action": "fold",
                        "amount": null,
                        "cards": []
                    }
                ],
                "summary": {
                    "player_actions": [
                        {
                            "seat": 1,
                            "name": "ghanjaman007",
                            "details": "",
                            "amount": 0
                        },
                        {
                            "seat": 2,
                            "name": "Nicoromero87",
                            "details": "(ciega pequeña) recaudó (0.38 €)",
                            "amount": 0.38
                        },
                        {
                            "seat": 3,
                            "name": "GhostGambler1",
                            "details": "",
                            "amount": 0
                        },
                        {
                            "seat": 4,
                            "name": "ciocobel",
                            "details": "",
                            "amount": 0
                        },
                        {
                            "seat": 5,
                            "name": "imanol119",
                            "details": "",
                            "amount": 0
                        },
                        {
                            "seat": 6,
                            "name": "Mauuu_bg",
                            "details": "",
                            "amount": 0
                        }
                    ],
                    "pot": 0.38,
                    "rake": 0.0
                },
                "showdown": null,
                "finish_before_showdown": [
                    {
                        "player": "Nicoromero87",
                        "action": "uncalled_bet_return",
                        "amount": 0.53
                    },
                    {
                        "player": "Nicoromero87",
                        "action": "wins_pot",
                        "amount": 0.38
                    }
                ]
            }
        ]
    }
    async parse(file: File): Promise<Array<Hand>> {

        return historyParserApiToDomainHand(this.mockResponse)
    }

    async fetch(id: string): Promise<Array<Hand>> {
        return historyParserApiToDomainHand(this.mockResponse)
    }

    getMockData(): Array<Hand> {
        console.log('EXECUTING.-...')
        return historyParserApiToDomainHand(this.mockResponse)
    }
}