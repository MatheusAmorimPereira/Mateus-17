let scrollInterval;

// tons cromáticos
const tones = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];

// acordes encontrados na música
const chords = ["D", "A/C#", "Bm7", "G9", "Em7", "A"];

let currentToneIndex = 2; // D

// mapa de transposição
function transposeChord(chord, steps) {
  // separa baixo do acorde (A/C#)
  let parts = chord.split("/");

  let main = transposeNote(parts[0], steps);

  if (parts[1]) {
    return main + "/" + transposeNote(parts[1], steps);
  }

  return main;
}

function transposeNote(note, steps) {
  // pega apenas a nota base
  let root = note.match(/^[A-G]#?/);

  if (!root) return note;

  root = root[0];

  let index = tones.indexOf(root);

  if (index === -1) return note;

  let newIndex = (index + steps + tones.length) % tones.length;

  let newRoot = tones[newIndex];

  return note.replace(root, newRoot);
}

function changeTone(direction) {
  currentToneIndex += direction;

  if (currentToneIndex < 0) {
    currentToneIndex = tones.length - 1;
  }

  if (currentToneIndex >= tones.length) {
    currentToneIndex = 0;
  }

  document.getElementById("currentTone").innerText =
    "Tom: " + tones[currentToneIndex];

  let cifra = document.getElementById("cifra");

  let content = cifra.innerHTML;

  chords.forEach((chord) => {
    let regex = new RegExp(chord.replace("/", "\\/"), "g");

    content = content.replace(regex, transposeChord(chord, direction));
  });

  cifra.innerHTML = content;

  // atualiza lista
  for (let i = 0; i < chords.length; i++) {
    chords[i] = transposeChord(chords[i], direction);
  }
}

// rolagem automática
function startScroll() {
  stopScroll();

  const speed = document.getElementById("speedRange").value;

  scrollInterval = setInterval(
    () => {
      window.scrollBy(0, 1);
    },
    25 - speed * 2,
  );
}

function stopScroll() {
  clearInterval(scrollInterval);
}
