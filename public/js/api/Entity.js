class Entity {
  constructor(){
    this.URL = "";
  }
  /**
   * Запрашивает с сервера список данных.
   * Это могут быть счета или доходы/расходы
   * (в зависимости от того, что наследуется от Entity)
   * */
  static list(data, callback){
    data.url = this.URL;
    data.method = "GET";
    data.responseType = 'json';
    data.callback = callback();
    createRequest(data);
  }

  /**
   * Создаёт счёт или доход/расход с помощью запроса
   * на сервер. (в зависимости от того,
   * что наследуется от Entity)
   * */
  static create(data, callback) {
    data.url = this.URL;
    data.method = "PUT";
    data.responseType = 'json';
    data.callback = callback();
    createRequest(data);
  }

  /**
   * Удаляет информацию о счёте или доходе/расходе
   * (в зависимости от того, что наследуется от Entity)
   * */
  static remove(data, callback ) {
    data.url = this.URL;
    data.method = "DELETE";
    data.responseType = 'json';
    data.callback = callback();
    createRequest(data);
  }
}
