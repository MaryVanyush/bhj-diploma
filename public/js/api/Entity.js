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
    let entity = null;
    if(this === Account){
      entity = new Account();
    } else if(this === Transaction){
      entity = new Transaction();
    } else {
      entity = new Entity();
    }
    createRequest({
      url: entity.URL,
      method: 'GET',
      data,
      callback: (response) => {
        return callback(response);
      }
    });
  }

  /**
   * Создаёт счёт или доход/расход с помощью запроса
   * на сервер. (в зависимости от того,
   * что наследуется от Entity)
   * */
  static create(data, callback) {
    let entity = null;
    if(this === Account){
      entity = new Account();
    } else if(this === Transaction){
      entity = new Transaction();
    } else {
      entity = new Entity();
    }
    createRequest({
      url: entity.URL,
      method: 'PUT',
      data,
      callback: (err, response) => {
        return callback(err, response);
      }
    });
  }

  /**
   * Удаляет информацию о счёте или доходе/расходе
   * (в зависимости от того, что наследуется от Entity)
   * */
  static remove(data, callback ) {
    let entity = null;
    if(this === Account){
      entity = new Account();
    } else if(this === Transaction){
      entity = new Transaction();
    } else {
      entity = new Entity();
    }
    createRequest({
      url: entity.URL,
      method: 'DELETE',
      data,
      callback: (response) => {
        return callback(response);
      }
    });
  }
}
