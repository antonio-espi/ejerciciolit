import { LitElement,css, html } from 'lit';

export class WishListComponent extends LitElement {

  static get properties(){
    return {
      miDato: {type: String},
      listaTareas : { type: Array}
    };
  }

  constructor(){
    super();
    this.miDato = ' ';
    this.listaTareas= [];
    this.timers = [];
  }

  render() {
    var listaTareasArr = [];
    this.listaTareas.forEach((tareas, index)=>{
      listaTareasArr.push(
        html`
        <input type="checkbox" class="item" id='cb_${this.miDato}' @change=${(event) => this.setTimer(event,index)}>
        <label class="label" id="label">${tareas}</label><br>
      `);
      try {
        if(index === this.listaTareas.length -1){
          this.timers[index] = {
            timeout1: setTimeout(()=>{
              console.log('1');
              this.colors(index, '#9AD576');
            },2000),
            timeout2: setTimeout(()=>{
              this.colors(index, '#F6FF99');
            },5000),
            timeout3: setTimeout(()=>{
              this.colors(index, '#F97171');
            },8000)
          };
        }
      }catch (error) {
          alert('Opps ha ocurrido un error!!!')
      } 
    });

    console.log(this.timers);

    return html`
      <div class="main-container">
      <h1 class="title">My wishlist</h1>
          
      <wishlist-input-component class="input-text" id="inputText" value=${this.miDato} @keydown="${this.inputKeyDown}">
      </wishlist-input-component>
          
      <div id="taskContainer">
          ${listaTareasArr}
      </div>

      <br>

      <div class="btn-container">
        <button class="btn-delete" @click=${this.removeCheckBox}>Limpiar Lista</button></div>
      </div>
          
    `;
  }

  inputKeyDown(e){
    if(e.key === 'Enter'){
      this.miDato = e.target.value;
      this.listaTareas.push(this.miDato);
      this.resetTexto(e);
    }
  }

  resetTexto(e){
    this.miDato = '';
    e.target.value = '';
  }

  setTimer(event, index) {
    
    const labels = this.shadowRoot.querySelectorAll('.item + label');
    const checkbox = event.target;

    if (!checkbox.checked) {
      labels[index].style.textDecoration = 'none';
    } else {
        labels[index].style.color = 'black';
        labels[index].style.textDecoration = 'line-through';
        labels[index].style.background = 'none';
        clearTimeout(this.timers[index].timeout1);
        clearTimeout(this.timers[index].timeout2);
        clearTimeout(this.timers[index].timeout3);
      
    }
  }

  colors(index, color) {
    try {
      const label = this.shadowRoot.querySelectorAll('.item + label');
      label[index].style.background = color;
    } catch (error) {
    }
    
  }

  removeCheckBox(){
    this.listaTareas = [];
  }

}