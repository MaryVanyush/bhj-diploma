/**
 * Класс Account наследуется от Entity.
 * Управляет счетами пользователя.
 * Имеет свойство URL со значением '/account'
 * */
class Account extends Entity {
  constructor() {
    super();
    this.URL = '/account';
  }
  /**
   * Получает информацию о счёте
   * */

  static get(id = '', callback){
    const account = new Account();
    const options = {
      url: account.URL,
      method: "GET",
      data: {
        id: id,
      },
      callback: callback(),
    };
  }
}
