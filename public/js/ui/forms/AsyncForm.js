/**
 * Класс AsyncForm управляет всеми формами
 * приложения, которые не должны быть отправлены с
 * перезагрузкой страницы. Вместо этого данные
 * с таких форм собираются и передаются в метод onSubmit
 * для последующей обработки
 * */
class AsyncForm {
  constructor(element) {
    if(!element){
      throw new Error("no element");
    }
    this.element = element;
    this.registerEvents = this.registerEvents.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.submit = this.submit.bind(this)
    this.getData = this.getData.bind(this)
    this.registerEvents()
  }

  registerEvents() {
    this.element.addEventListener('submit', () => {
      event.preventDefault()
      this.submit()
    });
  }

  getData() {
      const inputFields = [...this.element.querySelectorAll('input')];
      const data = {};
      inputFields.forEach(el => {
        data[el.name] = el.value;
      })
      return data;
  }

  onSubmit(options){

  }

  submit() {
    const data = this.getData()
    this.onSubmit(data)
  }
}
