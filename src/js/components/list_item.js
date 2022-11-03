function Item(props) {
  return `<div class="expenser__item">
        <span class="expenser__item__description">${props.description}</span>
        <div class="expenser__item__info">
          <div class="expenser__item__value">${
            props.type
          } R$${props.value.toFixed(2)}</div>
          <div class="expenser__item__delete">
            <button class="expenser__item__delete--btn">
              <i class="fa-solid fa-circle-xmark"></i>
            </button>
          </div>
        </div>
      </div>`
}

export default Item
