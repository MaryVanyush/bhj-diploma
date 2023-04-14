/**
 * Класс CreateAccountForm управляет формой
 * создания нового счёта
 * */
class CreateAccountForm extends AsyncForm {
  /**
   * Создаёт счёт с помощью Account.create и закрывает
   * окно в случае успеха, а также вызывает App.update()
   * и сбрасывает форму
   * */
  onSubmit(data) {
    Account.create(data, (err, response) => {
      if(!err === null){
        return err;
      }
      if(response.success === false){
        return response.error;
      }
      App.update();
      const activeModal = document.querySelector('div[style$="display: block;"]');
      const form = activeModal.querySelector('.form');
      const modal = new Modal(activeModal);
      form.reset();
      modal.close();
    })
  }
}