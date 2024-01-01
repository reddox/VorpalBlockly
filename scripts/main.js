const workspace = Blockly.inject('blocklyDiv', {
  toolbox: toolbox,
});

try {
  wsJson = JSON.parse(Android.loadWorkspace())
  Blockly.serialization.workspaces.load(wsJson, workspace);
} catch (e) {
  //do nothing
}

// https://developers.google.com/blockly/guides/create-custom-blocks/code-generation/overview#realtime_generation
const supportedEvents = new Set([
  Blockly.Events.BLOCK_CHANGE,
  Blockly.Events.BLOCK_CREATE,
  Blockly.Events.BLOCK_DELETE,
  Blockly.Events.BLOCK_MOVE,
]);
workspace.addChangeListener(saveWorkspace);
function saveWorkspace(event) {
  if (workspace.isDragging()) return;
  if (!supportedEvents.has(event.type)) return;
  const state = Blockly.serialization.workspaces.save(workspace);
  Android.saveWorkspace(JSON.stringify(state));
}


Blockly.JavaScript.STATEMENT_SUFFIX = 'highlightBlock(%1);\n';
Blockly.JavaScript.addReservedWords('highlightBlock');
Blockly.JavaScript.addReservedWords('robotBeep');
Blockly.JavaScript.addReservedWords('sleep');
Blockly.JavaScript.addReservedWords('setMode');
Blockly.JavaScript.addReservedWords('setDpad');

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

  var wrapper = function (mode) {
    Android.setMode(mode);
  };
  interpreter.setProperty(globalObject, 'setMode',
    interpreter.createNativeFunction(wrapper));

  var wrapper = function (dpad) {
    Android.setDpad(dpad);
  };
  interpreter.setProperty(globalObject, 'setDpad',
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