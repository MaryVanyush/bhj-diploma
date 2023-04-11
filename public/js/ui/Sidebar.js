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
    const sidebarMenuItem = [...document.querySelectorAll('.menu-item')];
    sidebarMenuItem.forEach(el => el.addEventListener('click', () => {
      event.preventDefault();
      if(el.className.match('login')){
        const modalName = App.getModal('login');
        const modalOpen = modalName.element;
        const modal = new Modal(modalOpen);
        modal.open();
        return;
      } else if(el.className.match('register')) {
        const modalName = App.getModal('register');
        const modalOpen = modalName.element;
        const modal = new Modal(modalOpen);
        modal.open();
        return;
      } else if(el.className.match('logout')){
        // При нажатии на кнопку «Выйти» необходимо вызвать метод User.logout и после успешного выхода (response.success = true), нужно вызвать App.setState( 'init' )
      }
    }))
  }
}
