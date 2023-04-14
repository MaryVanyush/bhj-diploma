class Modal {
  constructor(element){
    if(!element){
      throw new Error("no element");
    }
    this.element = element;
    this.registerEvents = this.registerEvents.bind(this);
    this.onClose = this.onClose.bind(this);
    this.close = this.close.bind(this);
    this.registerEvents();
  }

  registerEvents() {
    const closeBtnModal = [...this.element.querySelectorAll('[data-dismiss]')]
    closeBtnModal.forEach(el => el.addEventListener('click', () => {
      event.preventDefault();
      this.onClose(this.element);
    }))
  }

  onClose(e) {
    this.close();
  }

  open() {
    this.element.style.display = "block";
  }

  close(){
    this.element.style.removeProperty("display");
  }
}
