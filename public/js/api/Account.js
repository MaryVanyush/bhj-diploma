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
    createRequest({
      url: account.URL,
      method: 'GET',
      data: {id},
      callback: (response) => {
        return callback(response);
      }
    });
  }
}
