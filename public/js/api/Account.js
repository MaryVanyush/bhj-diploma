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
    // callback = (err, response) => {
    //   return response.id = id
    // }
    const options = {
      url: this.URL,
      method: "GET",
      responseType: 'json',
      callback: callback(),
    };
  }
}