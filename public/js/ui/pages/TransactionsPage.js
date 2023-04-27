/**
 * Класс TransactionsPage управляет
 * страницей отображения доходов и
 * расходов конкретного счёта
 * */
class TransactionsPage {
  /**
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * Сохраняет переданный элемент и регистрирует события
   * через registerEvents()
   * */
  constructor( element ) {
    if(!element){
      throw new Error("no element");
    }
    this.element = element;
    this.registerEvents = this.registerEvents.bind(this);
    this.update = this.update.bind(this);
    this.removeAccount = this.removeAccount.bind(this);
    this.removeTransaction = this.removeTransaction.bind(this);
    this.render = this.render.bind(this);
    this.clear = this.clear.bind(this);
    this.renderTitle = this.renderTitle.bind(this);
    this.formatDate = this.formatDate.bind(this);
    this.getTransactionHTML = this.getTransactionHTML.bind(this);
    this.renderTransactions = this.renderTransactions.bind(this);
    this.registerEvents();
  }

  /**
   * Вызывает метод render для отрисовки страницы
   * */
  update() {
    if(this.lastOptions === undefined || this.lastOptions === null){
      return;
    }
    this.render(this.lastOptions);
  }

  /**
   * Отслеживает нажатие на кнопку удаления транзакции
   * и удаления самого счёта. Внутри обработчика пользуйтесь
   * методами TransactionsPage.removeTransaction и
   * TransactionsPage.removeAccount соответственно
   * */
  registerEvents() {

    // !!!!!!!!!!!!!!!!!?
    // При нажатии на кнопку удаления транзакции .transaction__remove, необходимо вызвать метод removeTransaction и передать туда идентификатор транзакции


    const removeAccountBtn = document.querySelector('.remove-account');
    removeAccountBtn.addEventListener('click', () => {
      this.removeAccount();
    });
  }

  /**
   * Удаляет счёт. Необходимо показать диаголовое окно (с помощью confirm())
   * Если пользователь согласен удалить счёт, вызовите
   * Account.remove, а также TransactionsPage.clear с
   * пустыми данными для того, чтобы очистить страницу.
   * По успешному удалению необходимо вызвать метод App.updateWidgets() и App.updateForms(),
   * либо обновляйте только виджет со счетами и формы создания дохода и расхода
   * для обновления приложения
   * */
  removeAccount() {
    if(this.lastOptions === undefined || this.lastOptions === null){
      return;
    }
    const result = confirm('Вы действительно хотите удалить счёт?')
    if(result === false){
      return;
    }
    const currentUser = User.current();
    if(currentUser === undefined){
      return;
    }
    const data = {id: this.lastOptions.account_id};
    Account.remove(data, (err, response) => {
      if(!err === null){
        return err;
      }
      if(response.success === false){
        return response.error;
      }
      this.clear();
      App.updateWidgets();
      App.updateForms();
    })
  }

  /**
   * Удаляет транзакцию (доход или расход). Требует
   * подтверждеия действия (с помощью confirm()).
   * По удалению транзакции вызовите метод App.update(),
   * либо обновляйте текущую страницу (метод update) и виджет со счетами
   * */
  removeTransaction( id ) {

  }

  /**
   * С помощью Account.get() получает название счёта и отображает
   * его через TransactionsPage.renderTitle.
   * Получает список Transaction.list и полученные данные передаёт
   * в TransactionsPage.renderTransactions()
   * */
  render(options){
    if(options === null || options === undefined){
      return;
    }
    this.lastOptions = options;
    Account.get(options.account_id, (response) => {
      if(!response){
        return;
      }
      if(response.success === false){
        return response.error;
      }
      const accountName = document.querySelector('.active').getElementsByTagName('span')[0].textContent;
      this.renderTitle(accountName)
    })

    const currentUser = User.current();
    if(currentUser === undefined){
      return;
    }
    const data = {email: currentUser.email, password: currentUser.password, account_id: options.account_id};
    Transaction.list(data, (response) => {
      if(!response){
        return;
      }
      if(response.success === false){
        return response.error;
      }
      this.renderTransactions(response.data)
    })
  }

  /**
   * Очищает страницу. Вызывает
   * TransactionsPage.renderTransactions() с пустым массивом.
   * Устанавливает заголовок: «Название счёта»
   * */
  clear() {
    this.renderTransactions([]);
    this.renderTitle('Название счёта');
    if(this.lastOptions){
      this.lastOptions = null;
    }
  }

  /**
   * Устанавливает заголовок в элемент .content-title
   * */
  renderTitle(name){
    const contentTitle = document.querySelector('.content-title');
    contentTitle.textContent = name;
  }

  /**
   * Форматирует дату в формате 2019-03-10 03:20:41 (строка)
   * в формат «10 марта 2019 г. в 03:20»
   * */
  formatDate(date){
    let newDate = new Date();
    const arrayFromDate = (((date.split(':').join()).split('-').join()).split(' ').join()).split(',');
    newDate.setFullYear(arrayFromDate[0], arrayFromDate[1] - 1, arrayFromDate[2]);
    newDate.setHours(arrayFromDate[3], arrayFromDate[4], arrayFromDate[5]);

    // console.log(arrayFromDate)                                            // Почему месяц +1     ?????????????????????

    let formatter = new Intl.DateTimeFormat("ru", {
      year: "numeric",
      month: "long",
      day: "numeric",
      timezone: 'UTC',
      hour: 'numeric',
      minute: 'numeric'
    });
    return formatter.format(newDate);
  }

  /**
   * Формирует HTML-код транзакции (дохода или расхода).
   * item - объект с информацией о транзакции
   * */
  getTransactionHTML(item){
    let divTransactionRow = document.createElement('div');
    item.type === "income" ? divTransactionRow.className = "transaction transaction_income row" : divTransactionRow.className = "transaction transaction_expense row";
    let divTransactionDetails = document.createElement('div');
    divTransactionDetails.className = "col-md-7 transaction__details";
    let divTransactionIcon = document.createElement('div');
    divTransactionIcon.className = "transaction__icon";
    let spanFa = document.createElement('span');
    spanFa.className = "fa fa-money fa-2x";
    let divTransactionInfo = document.createElement('div');
    divTransactionInfo.className = "transaction__info";
    let h4Title = document.createElement('h4');
    h4Title.className = "transaction__title";
    h4Title.append(item.name);
    let divData = document.createElement('div');
    divData.className = "transaction__date";
    divData.append(this.formatDate(item.created_at));
    divTransactionIcon.appendChild(spanFa);
    divTransactionInfo.appendChild(h4Title);
    divTransactionInfo.appendChild(divData);
    divTransactionDetails.appendChild(divTransactionIcon);
    divTransactionDetails.appendChild(divTransactionInfo);
    let divColMd3 = document.createElement('div');
    divColMd3.className = "col-md-3";
    let divTransactionSumm = document.createElement('div');
    divTransactionSumm.className = "transaction__summ";
    divTransactionSumm.append(item.sum + ' ');
    let spanCurrency = document.createElement('span');
    spanCurrency.className = "currency";
    spanCurrency.append('₽');
    divColMd3.appendChild(divTransactionSumm).appendChild(spanCurrency);
    let divTransactionControls = document.createElement('div');
    divTransactionControls.className = "col-md-2 transaction__controls";
    let buttonTransactionRemove = document.createElement('button');
    buttonTransactionRemove.className = "btn btn-danger transaction__remove";
    buttonTransactionRemove.dataset.id = item.id;
    let iFa = document.createElement('i');
    iFa.className = "fa fa-trash";
    divTransactionControls.appendChild(buttonTransactionRemove).appendChild(iFa);
    divTransactionRow.appendChild(divTransactionDetails);
    divTransactionRow.appendChild(divColMd3);
    divTransactionRow.appendChild(divTransactionControls);
    return divTransactionRow;

  }

  /**
   * Отрисовывает список транзакций на странице
   * используя getTransactionHTML
   * */
  renderTransactions(data){
    const contentSection = document.querySelector('.content');
    contentSection.replaceChildren();
    data.forEach( el => {
      const item = this.getTransactionHTML(el);
      contentSection.appendChild(item);
    })
  }
}
