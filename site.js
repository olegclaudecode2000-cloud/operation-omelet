const scene = document.querySelector('#scene');
const replay = document.querySelector('#replay');
const status = document.querySelector('#scene-status');
let ending;

replay.addEventListener('click', () => {
  clearTimeout(ending);
  scene.classList.remove('playing');
  void scene.offsetWidth;
  scene.classList.add('playing');
  replay.textContent = 'Повторить сцену';
  status.textContent = 'Паша встаёт со скамейки…';
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  ending = setTimeout(() => {
    status.textContent = 'Бам! Дальше — титры.';
  }, reducedMotion ? 0 : 1150);
});
