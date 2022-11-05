'use strict'

import list_item from './components/list_item.js'

const header = document.querySelector('.expenser__header')
const display = document.querySelector('.expenser__display')
const input__type = document.querySelector('.expenser__type')
const input__description = document.querySelector('.expenser__description')
const input__value = document.querySelector('.expenser__value')
const addBtn = document.querySelector('.expenser__btn')
const income__list = document
  .querySelector('.expenser__income')
  .querySelector('.expenser__list')
const expenses__list = document
  .querySelector('.expenser__expenses')
  .querySelector('.expenser__list')

const incomes = {
  data: [],
  total: 0,
}
const expenses = {
  data: [],
  total: 0,
}

const descriptionTypes = {
  ali: 'Alimentação 🍴',
  con: 'Contas 🧾',
  com: 'Compras 💳',
  edu: 'Educação 📚',
  laz: 'Lazer 🎪',
  luc: 'Lucro 💰',
  sal: 'Salário 💵',
  sau: 'Saúde 🏥',
  tan: 'Transporte 🚍',
  out: 'Outro ❔',
}

// ---------------------------------------

// Clear the inputs and remove focus from the elements
const clear = () => {
  //   input__description.value = input__value.value = ''
  input__description.value = 'ali'
  input__value.value = ''

  input__type.blur()
  input__description.blur()
  input__value.blur()
  addBtn.blur()
}

// Get all values from inputs
const getInput = () => {
  const type = input__type.value
  const description = descriptionTypes[input__description.value]
  const value = Number(input__value.value)

  clear()

  return {
    type,
    description,
    value,
  }
}

// Renders UI elements
const update = () => {
  // Get all income elements
  const income__list__items = incomes.data
    .map((item) => list_item(item))
    .join('')

  // Get all expenses elements
  const expense__list__items = expenses.data
    .map((item) => list_item(item))
    .join('')

  // Get current budget
  const total = incomes.total - expenses.total

  // Change background header color
  if (total === 0) {
    header.classList.remove('negative')
    header.classList.remove('positive')
    header.classList.add('neutral')
  } else if (total > 0) {
    header.classList.remove('negative')
    header.classList.remove('neutral')
    header.classList.add('positive')
  } else if (total < 0) {
    header.classList.remove('positive')
    header.classList.remove('neutral')
    header.classList.add('negative')
  }

  // Puts content
  display.innerHTML = total.toFixed(2)
  income__list.innerHTML = income__list__items
  expenses__list.innerHTML = expense__list__items
}

// Adds data to income or expenses array
const addItem = (data) => {
  if (data.type === '+') {
    incomes.data.push(data)
    incomes.total += data.value
  } else if (data.type === '-') {
    expenses.data.push(data)
    expenses.total += data.value
  }
}

// Removes an income or expenses item
const removeItem = (type, position) => {
  if (type === '+') {
    const income = incomes.data.splice(position, 1)[0]
    incomes.total -= income.value
  } else if (type === '-') {
    const expense = expenses.data.splice(position, 1)[0]
    expenses.total -= expense.value
  }
}

const controlAddItem = () => {
  // Get input data
  const data = getInput()

  // If theres no description, value or value is negative, nothign is done
  if (!data.description || !data.value || data.value < 0) return

  // Add data to the array
  addItem(data)

  // Renders UI
  update()
}

const controlRemoveItem = (type, position) => {
  // Remove data from the array
  removeItem(type, position)

  // Renders UI
  update()
}

const start = () => {
  addBtn.addEventListener('click', controlAddItem)

  income__list.addEventListener('click', (e) => {
    const btn = e.target.closest('.expenser__item__delete--btn')
    if (!btn) return

    const item__el = btn.parentNode.parentNode.parentNode

    const position = Array.from(item__el.parentNode.children).indexOf(item__el)

    controlRemoveItem('+', position)
  })

  expenses__list.addEventListener('click', (e) => {
    const btn = e.target.closest('.expenser__item__delete--btn')
    if (!btn) return

    const item__el = btn.parentNode.parentNode.parentNode

    const position = Array.from(item__el.parentNode.children).indexOf(item__el)

    controlRemoveItem('-', position)
  })
}

start()
