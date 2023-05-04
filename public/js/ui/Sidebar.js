/**
 * Класс Sidebar отвечает за работу боковой колонки:
 * кнопки скрытия/показа колонки в мобильной версии сайта
 * и за кнопки меню
 * */
class Sidebar {
  /**
   * Запускает initAuthLinks и initToggleButton
   * */
  static init() {
    this.initAuthLinks();
    this.initToggleButton();
  }

  static initToggleButton() {
    const toggleButton = document.querySelector(".sidebar-toggle");
    const sidebarMini = document.querySelector(".sidebar-mini");
    toggleButton.addEventListener('click', () =>{
      event.preventDefault();
      sidebarMini.classList.toggle('sidebar-open');
      sidebarMini.classList.toggle('sidebar-collapse');
    })
  }

  /**
   * При нажатии на кнопку входа, показывает окно входа
   * (через найденное в App.getModal)
   * При нажатии на кнопку регастрации показывает окно регистрации
   * При нажатии на кнопку выхода вызывает User.logout и по успешному
   * выходу устанавливает App.setState( 'init' )
   * */

  static initAuthLinks() {
    const menuRegisterBtn = [...document.querySelectorAll('.menu-item_register')][0];
    const menuLoginBtn = [...document.querySelectorAll('.menu-item_login')][0];
    const menuLogoutBtn = [...document.querySelectorAll('.menu-item_logout')][0];
    menuRegisterBtn.addEventListener('click', () => {
      event.preventDefault();
      App.getModal('register').open();
    });
    menuLoginBtn.addEventListener('click', () => {
      event.preventDefault();
      App.getModal('login').open();
    });
    menuLogoutBtn.addEventListener('click', () => {
      event.preventDefault();
      User.logout((err, response) => {
        if(!err === null){
          return err;
        }
        App.setState('init');
      })
    });
  }
}
