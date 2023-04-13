/**
 * Класс LoginForm управляет формой
 * входа в портал
 * */
class LoginForm extends AsyncForm {
  /**
   * Производит авторизацию с помощью User.login
   * После успешной авторизации, сбрасывает форму,
   * устанавливает состояние App.setState( 'user-logged' ) и
   * закрывает окно, в котором находится форма
   * */
  onSubmit(data) {
    User.login(data, (err, response) => {
      if(!err === null){
        return err;
      }
      if(response.success === false){
        return response.error;
      }
      const activeModal = document.querySelector('div[style$="display: block;"]')
      const form = activeModal.querySelector('.form')
      App.setState('user-logged');
      const modal = new Modal(activeModal);
      form.reset();
      modal.close();
    })
  }
}