//  Выполняй это задание в файлах 03-feedback.html и 03-feedback.js. Разбей его на несколько подзадач:

// 1. Отслеживай на форме событие input, и каждый раз записывай в локальное хранилище объект с полями email и message, в которых сохраняй текущие значения полей формы. Пусть ключом для хранилища будет строка "feedback-form-state".
// 2. При загрузке страницы проверяй состояние хранилища, и если там есть сохраненные данные, заполняй ими поля формы. В противном случае поля должны быть пустыми.
// 3. При сабмите формы очищай хранилище и поля формы, а также выводи объект с полями email, message и текущими их значениями в консоль.
// 4. Сделай так, чтобы хранилище обновлялось не чаще чем раз в 500 миллисекунд. Для этого добавь в проект и используй библиотеку lodash.throttle.

import throttle from 'lodash.throttle';

const formEl = document.querySelector('.feedback-form');

formEl.addEventListener('input', throttle(OnFormInput, 500)); // вешаю событие на импут
formEl.addEventListener('submit', onFormSubmit); // вешаю событие на сабмит

const STORAGE_KEY = 'feedback-msg';
let formFeedbackData = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};

fillForm(); // заполняю форму из local storage

function OnFormInput(evt) {
  formFeedbackData[evt.target.name] = evt.target.value;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formFeedbackData));
}

function fillForm() {
  const parsedMassage = JSON.parse(localStorage.getItem(STORAGE_KEY));
  if (!parsedMassage) {
    return;
  }

  const { email: savedEmail, message: savedMessage } = parsedMassage;
  const { email, message } = formEl; // забираю с формы элементы

  email.value = savedEmail ?? '';
  message.value = savedMessage ?? '';
}

function onFormSubmit(evt) {
  evt.preventDefault();
  const form = evt.currentTarget;

  const { email, message } = form.elements;

  if (!(email.value === '' || message.value === '')) {
    console.log(formFeedbackData);

    form.reset();
    localStorage.removeItem(STORAGE_KEY);
    formFeedbackData = {};
    return;
  } else {
    alert('Все поля должны быть заполнены!');
    return;
  }
}
