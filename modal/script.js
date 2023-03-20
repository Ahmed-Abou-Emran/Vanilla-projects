'use strict';

let showModalbtns = document.querySelectorAll('.show-modal');
let modal = document.querySelector('.modal');
let overlay = document.querySelector('.overlay');
let closeBtn = document.querySelector('.close-modal');

showModalbtns.forEach(btn => {
  btn.addEventListener('click', showModal);
});

closeBtn.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);
window.addEventListener('keydown', e => {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

function showModal() {
  modal.classList.toggle('hidden');
  overlay.classList.toggle('hidden');
}

function closeModal() {
  modal.classList.toggle('hidden');
  overlay.classList.toggle('hidden');
}
