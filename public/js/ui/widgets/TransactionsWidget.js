/**
 * Класс TransactionsWidget отвечает за
 * открытие всплывающих окон для
 * создания нового дохода или расхода
 * */

class TransactionsWidget {
  /**
   * Устанавливает полученный элемент
   * в свойство element.
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * */
  constructor( element ) {
    if(!element){
      throw new Error("no element");
    }
    this.element = element;
    this.registerEvents = this.registerEvents.bind(this);
    this.registerEvents();
  }
  /**
   * Регистрирует обработчики нажатия на
   * кнопки «Новый доход» и «Новый расход».
   * При нажатии вызывает Modal.open() для
   * экземпляра окна
   * */
  registerEvents() {
    const createIncomeBtn = document.querySelector('.create-income-button');
    createIncomeBtn.addEventListener('click', () => {
      const modal = new Modal(document.getElementById('modal-new-income'));
      modal.open();
    });
    const createExpenseBtn = document.querySelector('.create-expense-button');
    createExpenseBtn.addEventListener('click', () => {
      const modal = new Modal(document.getElementById('modal-new-expense'));
      modal.open();
    });
  }
}
