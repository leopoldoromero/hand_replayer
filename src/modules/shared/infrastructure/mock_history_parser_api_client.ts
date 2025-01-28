import { Hand } from "@/modules/hand/domain/hand";
import { HistoryParserRepository } from "@/modules/hand/domain/history_parser.repository";
import { HistoryParserApiResponseDto } from "@/modules/hand/infrastructure/history_parser_api.response";
import { historyParserApiToDomainHand } from "@/modules/hand/infrastructure/history_parser_api_to_domain.mapper";

export class MockHistoryParserApiClient implements HistoryParserRepository {
    async parse(file: File): Promise<Array<Hand>> {
        const mockResponse: HistoryParserApiResponseDto = {
            data: [
                {
                    "general_info": {
                        "hand_id": "254310896120",
                        "datetime": "11-01-2025 11:37:11",
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
                            "stack": 5.14
                        },
                        {
                            "seat": 2,
                            "name": "Viriato525",
                            "stack": 6.05
                        },
                        {
                            "seat": 3,
                            "name": "titus&mus",
                            "stack": 4.68
                        },
                        {
                            "seat": 4,
                            "name": "doryann26",
                            "stack": 3.25
                        },
                        {
                            "seat": 5,
                            "name": "sonieta1991",
                            "stack": 5.8
                        },
                        {
                            "seat": 6,
                            "name": "Ruben1990869",
                            "stack": 5.02
                        }
                    ],
                    "hero_hand": [
                        "8s",
                        "9h"
                    ],
                    "actions": [
                        {
                            "phase": "PRE-FLOP",
                            "player": "Viriato525",
                            "action": "small_blind",
                            "amount": 0.02,
                            "cards": []
                        },
                        {
                            "phase": "PRE-FLOP",
                            "player": "titus&mus",
                            "action": "big_blind",
                            "amount": 0.05,
                            "cards": []
                        },
                        {
                            "phase": "PRE-FLOP",
                            "player": "doryann26",
                            "action": "raise",
                            "amount": null,
                            "cards": []
                        },
                        {
                            "phase": "PRE-FLOP",
                            "player": "sonieta1991",
                            "action": "call",
                            "amount": null,
                            "cards": []
                        },
                        {
                            "phase": "PRE-FLOP",
                            "player": "Ruben1990869",
                            "action": "fold",
                            "amount": null,
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
                            "player": "Viriato525",
                            "action": "fold",
                            "amount": null,
                            "cards": []
                        },
                        {
                            "phase": "PRE-FLOP",
                            "player": "titus&mus",
                            "action": "fold",
                            "amount": null,
                            "cards": []
                        },
                        {
                            "phase": "FLOP",
                            "player": "doryann26",
                            "action": "check",
                            "amount": null,
                            "cards": [
                                "Ad",
                                "4h",
                                "Kc"
                            ]
                        },
                        {
                            "phase": "FLOP",
                            "player": "sonieta1991",
                            "action": "check",
                            "amount": null,
                            "cards": [
                                "Ad",
                                "4h",
                                "Kc"
                            ]
                        },
                        {
                            "phase": "TURN",
                            "player": "doryann26",
                            "action": "check",
                            "amount": null,
                            "cards": [
                                "Ad",
                                "4h",
                                "Kc"
                            ]
                        },
                        {
                            "phase": "TURN",
                            "player": "sonieta1991",
                            "action": "bet",
                            "amount": null,
                            "cards": [
                                "Ad",
                                "4h",
                                "Kc"
                            ]
                        },
                        {
                            "phase": "TURN",
                            "player": "doryann26",
                            "action": "fold",
                            "amount": null,
                            "cards": [
                                "Ad",
                                "4h",
                                "Kc"
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
                                "name": "Viriato525",
                                "details": "",
                                "amount": 0
                            },
                            {
                                "seat": 3,
                                "name": "titus&mus",
                                "details": "",
                                "amount": 0
                            },
                            {
                                "seat": 4,
                                "name": "doryann26",
                                "details": "",
                                "amount": 0
                            },
                            {
                                "seat": 5,
                                "name": "sonieta1991",
                                "details": "recaudó (0.26 €)",
                                "amount": 0.26
                            },
                            {
                                "seat": 6,
                                "name": "Ruben1990869",
                                "details": "",
                                "amount": 0
                            }
                        ],
                        "pot": 0.27,
                        "rake": 0.01
                    },
                    "showdown": null,
                    "finish_before_showdown": [
                        {
                            "player": "sonieta1991",
                            "action": "uncalled_bet_return",
                            "amount": 0.13
                        }
                    ]
                },
                {
                    "general_info": {
                        "hand_id": "254310893687",
                        "datetime": "11-01-2025 11:36:52",
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
                            "name": "Viriato525",
                            "stack": 6.05
                        },
                        {
                            "seat": 2,
                            "name": "Nicoromero87",
                            "stack": 5.16
                        },
                        {
                            "seat": 3,
                            "name": "frasein567",
                            "stack": 4.29
                        },
                        {
                            "seat": 4,
                            "name": "sonieta1991",
                            "stack": 7.82
                        },
                        {
                            "seat": 5,
                            "name": "ciceron0077",
                            "stack": 5.43
                        },
                        {
                            "seat": 6,
                            "name": "doryann26",
                            "stack": 3.06
                        }
                    ],
                    "hero_hand": [
                        "2d",
                        "Kh"
                    ],
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
                            "player": "frasein567",
                            "action": "big_blind",
                            "amount": 0.05,
                            "cards": []
                        },
                        {
                            "phase": "PRE-FLOP",
                            "player": "sonieta1991",
                            "action": "raise",
                            "amount": null,
                            "cards": []
                        },
                        {
                            "phase": "PRE-FLOP",
                            "player": "ciceron0077",
                            "action": "fold",
                            "amount": null,
                            "cards": []
                        },
                        {
                            "phase": "PRE-FLOP",
                            "player": "doryann26",
                            "action": "raise",
                            "amount": null,
                            "cards": []
                        },
                        {
                            "phase": "PRE-FLOP",
                            "player": "Viriato525",
                            "action": "fold",
                            "amount": null,
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
                            "player": "frasein567",
                            "action": "fold",
                            "amount": null,
                            "cards": []
                        },
                        {
                            "phase": "PRE-FLOP",
                            "player": "sonieta1991",
                            "action": "fold",
                            "amount": null,
                            "cards": []
                        }
                    ],
                    "summary": {
                        "player_actions": [
                            {
                                "seat": 1,
                                "name": "Viriato525",
                                "details": "",
                                "amount": 0
                            },
                            {
                                "seat": 2,
                                "name": "Nicoromero87",
                                "details": "",
                                "amount": 0
                            },
                            {
                                "seat": 3,
                                "name": "frasein567",
                                "details": "",
                                "amount": 0
                            },
                            {
                                "seat": 4,
                                "name": "sonieta1991",
                                "details": "",
                                "amount": 0
                            },
                            {
                                "seat": 5,
                                "name": "ciceron0077",
                                "details": "",
                                "amount": 0
                            },
                            {
                                "seat": 6,
                                "name": "doryann26",
                                "details": "recaudó (0.31 €)",
                                "amount": 0.31
                            }
                        ],
                        "pot": 0.31,
                        "rake": 0.0
                    },
                    "showdown": null,
                    "finish_before_showdown": [
                        {
                            "player": "doryann26",
                            "action": "uncalled_bet_return",
                            "amount": 0.33
                        }
                    ]
                }
            ]
        }

        return historyParserApiToDomainHand(mockResponse)
    }
}