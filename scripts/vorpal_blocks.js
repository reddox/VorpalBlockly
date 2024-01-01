Blockly.defineBlocksWithJsonArray([
    {
        'type': 'beep',
        'message0': 'beep for %1 ms at %2 Hz',
        'args0': [
            {
                'type': 'input_value',
                'name': 'DURATION',
                'check': 'Number'
            },
            {
                'type': 'input_value',
                'name': 'FREQUENCY',
                'check': 'Number'
            }
        ],
        'previousStatement': null,
        'nextStatement': null,
        'colour': 20,
    },
    {
        'type': 'wait',
        'message0': 'wait %1 seconds',
        'args0': [{
            'type': 'field_number',
            'name': 'SECONDS',
            'min': 0,
            'max': 20,
            'value': 1,
        }],
        'previousStatement': null,
        'nextStatement': null,
        'colour': 20,
    },
    {
        'type': 'walk',
        'message0': 'walk %1',
        'args0': [{
            'type': 'field_dropdown',
            'name': 'DIRECTION',
            "options": [
                ["forward", "'f'"],
                ["right", "'r'"],
                ["left", "'l'"],
                ["backward", "'b'"]
            ]
        }],
        'previousStatement': null,
        'nextStatement': null,
        'colour': 20,
    },
    {
        'type': 'stop',
        'message0': 'stop any movement',
        'previousStatement': null,
        'nextStatement': null,
        'colour': 20,
    }
]);

Blockly.JavaScript.forBlock['beep'] = function (block, generator) {
    duration = generator.valueToCode(
        block, 'DURATION', Blockly.JavaScript.ORDER_ATOMIC);
    if (!duration) {
        duration = 200;
    }
    frequency = generator.valueToCode(
        block, 'FREQUENCY', Blockly.JavaScript.ORDER_ATOMIC);
    if (!frequency) {
        frequency = 200;
    }
    return `robotBeep(${frequency}, ${duration});\nsleep(${duration});\n`;
}

Blockly.JavaScript.forBlock['wait'] = function (block, generator) {
    const duration = block.getFieldValue('SECONDS') * 1000;
    return `sleep(${duration});\n`;
}

Blockly.JavaScript.forBlock['walk'] = function (block, generator) {
    const direction = block.getFieldValue('DIRECTION');
    return `setMode("W1");\nsetDpad(${direction});\n`;
}

Blockly.JavaScript.forBlock['stop'] = function (block, generator) {
    return `setMode("W1");\nsetDpad("s");\n`;
}