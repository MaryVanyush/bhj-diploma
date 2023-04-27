/**
 * Класс CreateTransactionForm управляет формой
 * создания новой транзакции
 * */
class CreateTransactionForm extends AsyncForm {
  /**
   * Вызывает родительский конструктор и
   * метод renderAccountsList
   * */
  constructor(element) {
    super(element)
    this.renderAccountsList = this.renderAccountsList.bind(this)
    this.renderAccountsList()
  }

  /**
   * Получает список счетов с помощью Account.list
   * Обновляет в форме всплывающего окна выпадающий список
   * */
  renderAccountsList() {
    const currentUser = User.current();
    if(currentUser === undefined){
      return;
    }
    const data = {email: currentUser.email, password: currentUser.password};
    Account.list(data, (response) => {
      if(!response){
        return;
      }
      if(response.success === false){
        return response.error;
      }
      let list = [...document.querySelectorAll('option')];
      list.forEach(el => el.remove());
      const incomeAccountsList = document.getElementById('income-accounts-list');
      const expenseAccountsList = document.getElementById('expense-accounts-list');
      response.data.forEach(el => {
        let option = document.createElement('option');
        option.value = el.id;
        option.textContent = el.name;
        expenseAccountsList.appendChild(option);
        });
      response.data.forEach(el => {
        let option = document.createElement('option');
        option.value = el.id;
        option.textContent = el.name;
        incomeAccountsList.appendChild(option);
        });
      })
  }

  /**
   * Создаёт новую транзакцию (доход или расход)
   * с помощью Transaction.create. По успешному результату
   * вызывает App.update(), сбрасывает форму и закрывает окно,
   * в котором находится форма
   * */
  onSubmit(data) {
    Transaction.create(data, (err, response) => {
      if(!err === null){
        return err;
      }
      if(response.success === false){
        return response.error;
      }
      console.log(response)                                                                   //не добавляет новую транзакцию??????????????????
      App.update();
      const activeModal = document.querySelector('div[style$="display: block;"]');
      const form = activeModal.querySelector('.form');
      const modal = new Modal(activeModal);
      form.reset();
      modal.close();
    })
  }
}