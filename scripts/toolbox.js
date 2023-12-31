toolbox = {
    "kind": "categoryToolbox",
    "contents": [
        {
            "kind": "category",
            "name": "Logic",
            "categorystyle": "logic_category",
            "contents": [
                {
                    "kind": "category",
                    "name": "If",
                    "categorystyle": "logic_category",
                    "contents": [
                        {
                            "kind": "block",
                            "type": "controls_if"
                        },
                        {
                            "kind": "block",
                            "type": "controls_if",
                            "extraState": {
                                "hasElse": "true"
                            }
                        },
                        {
                            "kind": "block",
                            "type": "controls_if",
                            "extraState": {
                                "hasElse": "true",
                                "elseIfCount": 1
                            }
                        }
                    ]
                },
                {
                    "kind": "category",
                    "name": "Boolean",
                    "categorystyle": "logic_category",
                    "contents": [
                        {
                            "kind": "block",
                            "type": "logic_compare"
                        },
                        {
                            "kind": "block",
                            "type": "logic_operation"
                        },
                        {
                            "kind": "block",
                            "type": "logic_negate"
                        },
                        {
                            "kind": "block",
                            "type": "logic_boolean"
                        },
                        {
                            "kind": "block",
                            "type": "logic_null"
                        },
                        {
                            "kind": "block",
                            "type": "logic_ternary"
                        }
                    ]
                }
            ]
        },
        {
            "kind": "category",
            "name": "Loops",
            "categorystyle": "loop_category",
            "contents": [
                {
                    "kind": "block",
                    "type": "controls_repeat_ext",
                    "inputs": {
                        "TIMES": {
                            "block": {
                                "type": "math_number",
                                "fields": {
                                    "NUM": 10
                                }
                            }
                        }
                    }
                },
                {
                    "kind": "block",
                    "type": "controls_whileUntil"
                },
                {
                    "kind": "block",
                    "type": "controls_for",
                    "fields": {
                        "VAR": "i"
                    },
                    "inputs": {
                        "FROM": {
                            "block": {
                                "type": "math_number",
                                "fields": {
                                    "NUM": 1
                                }
                            }
                        },
                        "TO": {
                            "block": {
                                "type": "math_number",
                                "fields": {
                                    "NUM": 10
                                }
                            }
                        },
                        "BY": {
                            "block": {
                                "type": "math_number",
                                "fields": {
                                    "NUM": 1
                                }
                            }
                        }
                    }
                },
                {
                    "kind": "block",
                    "type": "controls_forEach"
                },
                {
                    "kind": "block",
                    "type": "controls_flow_statements"
                }
            ]
        },
        {
            "kind": "category",
            "name": "Math",
            "categorystyle": "math_category",
            "contents": [
                {
                    "kind": "block",
                    "type": "math_number",
                    "fields": {
                        "NUM": 123
                    }
                },
                {
                    "kind": "block",
                    "type": "math_arithmetic",
                    "fields": {
                        "OP": "ADD"
                    }
                },
                {
                    "kind": "block",
                    "type": "math_number_property",
                    "extraState": "<mutation divisor_input=\"false\"></mutation>",
                    "fields": {
                        "PROPERTY": "EVEN"
                    }
                },
                {
                    "kind": "block",
                    "type": "math_round",
                    "fields": {
                        "OP": "ROUND"
                    }
                },
                {
                    "kind": "block",
                    "type": "math_modulo"
                },
                {
                    "kind": "block",
                    "type": "math_constrain",
                    "inputs": {
                        "LOW": {
                            "block": {
                                "type": "math_number",
                                "fields": {
                                    "NUM": 1
                                }
                            }
                        },
                        "HIGH": {
                            "block": {
                                "type": "math_number",
                                "fields": {
                                    "NUM": 100
                                }
                            }
                        }
                    }
                },
                {
                    "kind": "block",
                    "type": "math_random_int",
                    "inputs": {
                        "FROM": {
                            "block": {
                                "type": "math_number",
                                "fields": {
                                    "NUM": 1
                                }
                            }
                        },
                        "TO": {
                            "block": {
                                "type": "math_number",
                                "fields": {
                                    "NUM": 100
                                }
                            }
                        }
                    }
                },
                {
                    "kind": "block",
                    "type": "math_random_float"
                },
            ]
        },
        {
            "kind": "category",
            "name": "Variables",
            "categorystyle": "variable_category",
            "custom": "VARIABLE"
        },
        {
            "kind": "category",
            "name": "Robot",
            "colour": 30,
            "contents": [
                {
                    "kind": "block",
                    "type": "beep",
                    "inputs": {
                        "DURATION": {
                            "shadow": {
                                "type": "math_number",
                                "fields": {
                                    "NUM": 200
                                }
                            }
                        },
                        "FREQUENCY": {
                            "shadow": {
                                "type": "math_number",
                                "fields": {
                                    "NUM": 200
                                }
                            }
                        },
                    }
                },
                {
                    "kind": "block",
                    "type": "wait"
                },

                {
                    "kind": "block",
                    "type": "walk"
                },

                {
                    "kind": "block",
                    "type": "stop"
                },
            ]
        },
    ]
}