const MORSE_CODE_DICT = {
  'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..',
  'E': '.', 'F': '..-.', 'G': '--.', 'H': '....',
  'I': '..', 'J': '.---', 'K': '-.-', 'L': '.-..',
  'M': '--', 'N': '-.', 'O': '---', 'P': '.--.',
  'Q': '--.-', 'R': '.-.', 'S': '...', 'T': '-',
  'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-',
  'Y': '-.--', 'Z': '--..',
  '0': '-----', '1': '.----', '2': '..---', '3': '...--',
  '4': '....-', '5': '.....', '6': '-....', '7': '--...',
  '8': '---..', '9': '----.',
  ' ': '/', '.': '.-.-.-', ',': '--..--', '?': '..--..',
  "'": '.----.', '!': '-.-.--', '/': '-..-.', '(': '-.--.',
  ')': '-.--.-', '&': '.-...', ':': '---...', ';': '-.-.-.',
  '=': '-...-', '+': '.-.-.', '-': '-....-', '_': '..--.-',
  '"': '.-..-.', '$': '...-..-', '@': '.--.-.'
};

const REVERSE_DICT = {};
for (let [key, value] of Object.entries(MORSE_CODE_DICT)) {
  REVERSE_DICT[value] = key;
}

function toMorse(text) {
  return text
    .toUpperCase()
    .split('')
    .map(char => MORSE_CODE_DICT[char] || '')
    .join(' ');
}

function fromMorse(morse) {
  return morse
    .trim()
    .split(' ')
    .map(code => REVERSE_DICT[code] || '')
    .join('');
}

function playMorse(morseCode) {
  const context = new (window.AudioContext || window.webkitAudioContext)();
  let time = context.currentTime;
  const unit = 0.15; // one dot length

  function beep(duration) {
    const osc = context.createOscillator();
    const gain = context.createGain();
    osc.frequency.value = 700;
    osc.type = 'sine';
    osc.connect(gain);
    gain.connect(context.destination);
    osc.start(time);
    osc.stop(time + duration);
    time += duration + unit;
  }

  for (let symbol of morseCode) {
    if (symbol === '.') beep(unit);
    else if (symbol === '-') beep(unit * 3);
    else if (symbol === ' ') time += unit * 2;
    else if (symbol === '/') time += unit * 6;
  }
}

function loadFromFile() {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = '.txt';
  input.onchange = e => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = event => {
      document.getElementById('inputText').value = event.target.result;
    };
    reader.readAsText(file);
  };
  input.click();
}

function saveToFile() {
  const content = document.getElementById('outputText').value;
  const blob = new Blob([content], { type: 'text/plain' });
  const link = document.createElement('a');
  link.download = 'output.txt';
  link.href = URL.createObjectURL(blob);
  link.click();
}

function showHelp() {
  alert(`🆘 Help:
- Encode mode: Converts plain text to Morse code.
- Decode mode: Converts Morse code (e.g. .... . .-.. .-.. ---) to text.
- Use '/' to separate words in Morse code.
- Click 'Play Morse Beeps' to hear the output.
- You can load a .txt file to translate or save the result.`);
}

document.addEventListener('DOMContentLoaded', () => {
  let mode = 'encode';

  const encodeBtn = document.getElementById('encodeBtn');
  const decodeBtn = document.getElementById('decodeBtn');
  const translateBtn = document.getElementById('translateBtn');
  const playBtn = document.getElementById('playBtn');
  const loadBtn = document.getElementById('loadBtn');
  const saveBtn = document.getElementById('saveBtn');
  const helpBtn = document.getElementById('helpBtn');

  encodeBtn.addEventListener('click', () => {
    mode = 'encode';
    encodeBtn.classList.add('active');
    decodeBtn.classList.remove('active');
  });

  decodeBtn.addEventListener('click', () => {
    mode = 'decode';
    decodeBtn.classList.add('active');
    encodeBtn.classList.remove('active');
  });

  translateBtn.addEventListener('click', () => {
    const input = document.getElementById('inputText').value.trim();
    const output = document.getElementById('outputText');
    if (!input) {
      output.value = "⚠️ Please enter something to translate.";
      return;
    }
    output.value = mode === 'encode' ? toMorse(input) : fromMorse(input);
  });

  playBtn.addEventListener('click', () => {
    const morse = document.getElementById('outputText').value.trim();
    if (morse) playMorse(morse);
  });

  loadBtn.addEventListener('click', loadFromFile);
  saveBtn.addEventListener('click', saveToFile);
  helpBtn.addEventListener('click', showHelp);
});
