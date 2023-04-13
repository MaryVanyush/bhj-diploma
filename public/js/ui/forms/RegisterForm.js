/**
 * Класс RegisterForm управляет формой
 * регистрации
 * */
class RegisterForm extends AsyncForm {
  /**
   * Производит регистрацию с помощью User.register
   * После успешной регистрации устанавливает
   * состояние App.setState( 'user-logged' )
   * и закрывает окно, в котором находится форма
   * */
  onSubmit(data) {
    User.register(data, (err, response) => {
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
