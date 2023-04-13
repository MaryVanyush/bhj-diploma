/**
 * Класс UserWidget отвечает за
 * отображение информации о имени пользователя
 * после авторизации или его выхода из системы
 * */
/**
   * Получает информацию о текущем пользователе
   * с помощью User.current()
   * Если пользователь авторизован,
   * в элемент .user-name устанавливает имя
   * авторизованного пользователя
   * */

class UserWidget {
  constructor(element){
    if(!element){
      throw new Error("no element");
    }
    this.element = element;
  }
  
  update(){
    const data = User.current();
    const userName = document.querySelector('.user-name') 
    userName.textContent = data.name;
  }
}
