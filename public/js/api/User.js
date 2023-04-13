class User {
  constructor(){
    this.URL = "/user";
  }

  static setCurrent(user) {
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
      callback: (err, response) =>{
        if(!err === null){
          callback(err, response);
          return;
        }
        if(response === undefined){
          callback(err, response);
          return;
        }
        if(response.success === false){
          this.user.unsetCurrent();
          callback(err, response);
          return;
        } 
        User.setCurrent(response.user);
        callback(err, response);
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
    const user = new User()
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
      callback: callback = (err, response) =>{
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
