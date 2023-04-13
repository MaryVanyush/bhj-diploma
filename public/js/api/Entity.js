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
    const options = {};
    options.url = this.URL;
    options.method = "GET";
    options.data = data;
    options.callback = callback();
    createRequest(options);
  }

  /**
   * Создаёт счёт или доход/расход с помощью запроса
   * на сервер. (в зависимости от того,
   * что наследуется от Entity)
   * */
  static create(data, callback) {
    const options = {};
    options.url = this.URL;
    options.method = "PUT";
    options.data = data;
    options.callback = callback();
    createRequest(options);
  }

  /**
   * Удаляет информацию о счёте или доходе/расходе
   * (в зависимости от того, что наследуется от Entity)
   * */
  static remove(data, callback ) {
    const options = {};
    options.url = this.URL;
    options.method = "DELETE";
    options.data = data;
    options.callback = callback();
    createRequest(options);
  }
}
