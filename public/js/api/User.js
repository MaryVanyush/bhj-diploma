class User {
  constructor(){
    this.URL = "/user";
  }

  static setCurrent(user) {
    localStorage.user = JSON.stringify(user);
  }

  static unsetCurrent() {
    delete localStorage.user;
  }

  static current() {
    if(!localStorage.user){
      return undefined;
    }
    return JSON.parse(localStorage.user);
  }

  static fetch(callback) {
    createRequest({
      url: this.URL + '/current',
      method: "GET",
      responseType: 'json',
      callback: (err, response) =>{
        if(!err === null){
          return err;
        }
        if(response === undefined){
          return
        }
        if(response.success === false){
          this.user.unsetCurrent();
          return response.error;
        } 
        this.user.setCurrent(response.user);
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
    createRequest({
      url: this.URL + '/login',
      method: 'POST',
      responseType: 'json',
      data,
      callback: (err, response) => {
        if (response && response.user) {
          this.setCurrent(response.user);
        }
        callback(err, response);
      }
    });
  }

  static register(data, callback) {
    createRequest({
      url: this.URL + '/register',
      method: 'POST',
      responseType: 'json',
      data,
      callback: (err, response) =>{
        if(!err === null){
          return err;
        }
        if(response.success === false){
          return response.error;
        } 
        this.user.setCurrent(data)
        callback(err, response);
      }
    })
  }

  /**
   * Производит выход из приложения. После успешного
   * выхода необходимо вызвать метод User.unsetCurrent
   * */
  static logout(callback) {
    createRequest({
      url: this.URL + '/logout',
      method: 'POST',
      responseType: 'json',
      callback: (err, response) =>{
        if(!err === null){
          return err;
        }
        if(response.success === false){
          return response.error;
        } 
        this.user.unsetCurrent()
        callback(err, response);
      }
    })
  }
}
