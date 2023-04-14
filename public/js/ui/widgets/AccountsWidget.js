/**
 * Класс AccountsWidget управляет блоком
 * отображения счетов в боковой колонке
 * */

class AccountsWidget {
  /**
   * Устанавливает текущий элемент в свойство element
   * Регистрирует обработчики событий с помощью
   * AccountsWidget.registerEvents()
   * Вызывает AccountsWidget.update() для получения
   * списка счетов и последующего отображения
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * */
  constructor( element ) {
    if(!element){
      throw new Error("no element");
    }
    this.element = element;
    this.registerEvents = this.registerEvents.bind(this);
    this.update = this.update.bind(this);
    this.clear = this.clear.bind(this);
    this.onSelectAccount = this.onSelectAccount.bind(this);
    this.getAccountHTML = this.getAccountHTML.bind(this);
    this.renderItem = this.renderItem.bind(this);
    this.registerEvents();
    this.update();
  }

  /**
   * При нажатии на .create-account открывает окно
   * #modal-new-account для создания нового счёта
   * При нажатии на один из существующих счетов
   * (которые отображены в боковой колонке),
   * вызывает AccountsWidget.onSelectAccount()
   * */
  registerEvents() {
    const createAccountBtn = document.querySelector('.create-account');
    createAccountBtn.addEventListener('click', () => {
      const modal = new Modal(document.getElementById('modal-new-account'));
      modal.open();
    });

    document.addEventListener('click', () =>{
      const selectedAccount = event.target.closest('.account');
      this.onSelectAccount(selectedAccount);
    })
  }

  /**
   * Метод доступен только авторизованным пользователям
   * (User.current()).
   * Если пользователь авторизован, необходимо
   * получить список счетов через Account.list(). При
   * успешном ответе необходимо очистить список ранее
   * отображённых счетов через AccountsWidget.clear().
   * Отображает список полученных счетов с помощью
   * метода renderItem()
   * */
  update() {
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
      this.clear();
      response.data.forEach(element => this.renderItem(element));
    })
  }

  /**
   * Очищает список ранее отображённых счетов.
   * Для этого необходимо удалять все элементы .account
   * в боковой колонке
   * */
  clear() {
    const accounts = [...document.querySelectorAll('.account')];
    accounts.forEach(el => el.remove());
  }

  /**
   * Срабатывает в момент выбора счёта
   * Устанавливает текущему выбранному элементу счёта
   * класс .active. Удаляет ранее выбранному элементу
   * счёта класс .active.
   * Вызывает App.showPage( 'transactions', { account_id: id_счёта });
   * */
  onSelectAccount( element ) {
    const accounts = [...document.querySelectorAll('.account')];
    accounts.forEach(el => el.classList.remove('active'));
    element.classList.add('active');
    App.showPage( 'transactions', { account_id: element.dataset.id });
  }

  /**
   * Возвращает HTML-код счёта для последующего
   * отображения в боковой колонке.
   * item - объект с данными о счёте
   * */
  getAccountHTML(item){
    let li = document.createElement('li');
    li.className = "account";
    li.dataset.id = item.id;
    let a = document.createElement('a');
    a.href = '#';
    let spanName = document.createElement('span');
    spanName.append(item.name);
    let spanSum = document.createElement('span');
    if(item.sum !== 0){
      spanSum.append('  ' + item.sum);
    }
    a.appendChild(spanName);
    li.appendChild(a).appendChild(spanSum);
    return li;
  }

  /**
   * Получает массив с информацией о счетах.
   * Отображает полученный с помощью метода
   * AccountsWidget.getAccountHTML HTML-код элемента
   * и добавляет его внутрь элемента виджета
   * */
  renderItem(data){
    const element = this.getAccountHTML(data);
    this.element.appendChild(element);
  }
}
