const workspace = Blockly.inject('blocklyDiv', {
  toolbox: toolbox,
});

Blockly.JavaScript.STATEMENT_SUFFIX = 'highlightBlock(%1);\n';
Blockly.JavaScript.addReservedWords('highlightBlock');
Blockly.JavaScript.addReservedWords('robotBeep');
Blockly.JavaScript.addReservedWords('sleep');

function initApi(interpreter, globalObject) {
  // Add an API function for highlighting blocks.
  var wrapper = function (id) {
    return highlightBlock(id);
  };
  interpreter.setProperty(globalObject, 'highlightBlock',
    interpreter.createNativeFunction(wrapper));

  var wrapper = function (frequency, duration) {
    try {
      Android.robotBeep(frequency, duration);
    } catch (e) {
      console.log(`robotBeep(${frequency}, ${duration});`)
    }
  };
  interpreter.setProperty(globalObject, 'robotBeep',
    interpreter.createNativeFunction(wrapper));

  var wrapper = function (millis) {
    sleepduration = millis;
  };
  interpreter.setProperty(globalObject, 'sleep',
    interpreter.createNativeFunction(wrapper));
}

let blockPause;
let sleepduration = 0;
let timeoutpid = 0;
let highlightActiveBlock = true;

function highlightBlock(id) {
  if (highlightActiveBlock) {
    workspace.highlightBlock(id);
  }
  blockPause = true;
}

function stepBlock(interpreter) {
  blockPause = false;
  done = false;
  do {
    done = !interpreter.step();
  } while (!done && !blockPause)

  return !done;
}

function startExecution(executeStep, highlight) {
  highlightActiveBlock = highlight;
  const code = Blockly.JavaScript.workspaceToCode(workspace);
  var interpreter = new Interpreter(code, initApi);

  Android.notifyStart();

  function nextStep() {
    sleepduration = 0;
    if (stepBlock(interpreter)) {
      timeoutpid = setTimeout(nextStep, Math.max(executeStep, sleepduration));
    }
    else {
      workspace.highlightBlock(null);
      Android.notifyStop();
    }
  }
  nextStep();
}

function stopExecution() {
  clearTimeout(timeoutpid);
  workspace.highlightBlock(null);
  Android.notifyStop();
}