const goal = 12;
const storageKey = 'operation-omelet-eggs';
const tray = document.querySelector('#tray');
const counter = document.querySelector('#count');
const button = document.querySelector('#support');
const status = document.querySelector('#status');
let count = 0;

try {
  const saved = Number(localStorage.getItem(storageKey));
  if (Number.isInteger(saved) && saved >= 0 && saved <= goal) count = saved;
} catch {
  // The counter also works when browser storage is unavailable.
}

const eggs = Array.from({ length: goal }, () => document.createElement('i'));
tray.append(...eggs);

function render(added = false) {
  eggs.forEach((egg, index) => {
    egg.classList.toggle('filled', index < count);
    egg.classList.toggle('fresh', added && index === count - 1);
  });
  counter.textContent = count + ' из ' + goal + ' яиц';
  if (count === goal) {
    button.disabled = true;
    button.textContent = 'Лоток полон';
    status.textContent = 'Операция прошла успешно. Пора жарить омлет!';
  } else if (added) {
    status.textContent = 'Яйцо в лотке. До цели осталось ' + (goal - count) + '.';
  }
}

button.addEventListener('click', () => {
  if (count >= goal) return;
  count += 1;
  try {
    localStorage.setItem(storageKey, String(count));
  } catch {
    // Keep the current count for this visit.
  }
  render(true);
});

render();
