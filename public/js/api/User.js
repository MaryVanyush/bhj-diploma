class User {
  constructor(){
    this.URL = "/user";
  }

  static setCurrent(user) {
    if(localStorage.user){
      return;
    }
    localStorage.user = JSON.stringify(user);
  }

  static unsetCurrent() {
    localStorage.clear();
  }

  static current() {
    if(!localStorage.user){
      return undefined;
    }
    return JSON.parse(localStorage.user);
  }

  static fetch(callback) {
    const user = new User();
    createRequest({
      url: user.URL + '/current',
      method: "GET",
      callback: (response) =>{
        if(response.success === false){
          User.unsetCurrent();
          callback(response);
          return;
        } 
        User.setCurrent(response.user);
        callback(response);
      },
    })
  }

  /**
   * Производит попытку авторизации.
   * После успешной авторизации необходимо
   * сохранить пользователя через метод
   * User.setCurrent.
   * */
  static login(data, callback) {
    const user = new User();
    createRequest({
      url: user.URL + '/login',
      method: 'POST',
      data,
      callback: (err, response) => {
        if(!err === null){
          callback(err, response);
          return err;
        }
        if (response.success === false) {
          callback(err, response);
          return response.error;
        }
        User.setCurrent(response.user); 
        callback(err, response);
      }
    });
  }

  static register(data, callback) {
    const user = new User();
    createRequest({
      url: user.URL + '/register',
      method: 'POST',
      data,
      callback: (err, response) =>{
        if(!err === null){
          callback(err, response);
          return;
        }
        if(response.success === false){
          callback(err, response);
          return;
        }
        User.setCurrent(data);
        callback(err, response);
      }
    })
  }

  /**
   * Производит выход из приложения. После успешного
   * выхода необходимо вызвать метод User.unsetCurrent
   * */
  static logout(callback) {
    const user = new User();
    createRequest({
      url: user.URL + '/logout',
      method: 'POST',
      callback: (err, response) =>{
        if(!err === null){
          return callback(err, response);;
        }
        if(response.success === false){
          return callback(err, response);;
        }
        User.unsetCurrent();
        return callback(err, response);
      }
    })
  }
}
