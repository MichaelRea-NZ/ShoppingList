




class Model {
  constructor() {
	  this.pantryList = JSON.parse(localStorage.getItem('pantryList')) || []
  }
  
  bindPantryListChanged(callback){
	  this.onPantryListChanged = callback
  }
  
  modelCommit(pantryList){
	  this.onPantryListChanged(pantryList)
	  localStorage.setItem('pantryList', JSON.stringify(pantryList))	  
  }
  
  addItem(itemText){
	  const groceryItem = {
		  id: this.pantryList.length > 0 ? this.pantryList[this.pantryList.length - 1].id + 1 : 1, 		  
		  text: itemText, 
		  complete: false,
	  }
	  
	  this.pantryList.push(groceryItem)
	  
	  this.modelCommit(this.pantryList)
  }
  
  editItem(id, updatedText){
	  this.pantryList = this.pantryList.map((groceryItem) =>
	  groceryItem.id == id ? {id: groceryItem.id, text: updatedText, complete: groceryItem.complete}: groceryItem,
	  )
	  
	  this.modelCommit(this.pantryList)
  } 
    
  deleteItem(id){
	  this.pantryList = this.pantryList.filter((groceryItem) => groceryItem.id !==id)
	  
	  this.modelCommit(this.pantryList)
  }
  
  inTheBasket(id) {
    this.pantryList = this.pantryList.map((groceryItem) =>
      groceryItem.id === id ? {id: groceryItem.id, text: groceryItem.text, complete: !groceryItem.complete} : groceryItem,
    )
	
	this.modelCommit(this.pantryList)
  } 
}






class View {
  constructor() {
	  this.app = this.getElement('#root')
	  
	  this.title = this.createElement('h1')
	  this.title.textContent = 'Shopping list' 
	  
	  this.form = this.createElement('form')
	  
	  this.input = this.createElement('input')
	  this.input.type = 'text'
	  this.input.placeholder = 'Add grocery item'
	  this.input.name = 'groceryItem'
	  
	  this.submitButton = this.createElement('button')
	  this.submitButton.textContent = 'Add to list'  	  
	  
	  this.form.append(this.input, this.submitButton)
	  
	  this.groceryList = this.createElement('ul', 'groceryItem-list')
      this.app.append(this.title, this.form, this.groceryList)
		
	this.viewTempGroceryText = ''
	this.viewInitLocalListeners()
  }
  
  get viewGroceryText(){
	  return this.input.value
  }
  
  viewInput(){
	  this.input.value = ''
  }
  
  createElement(tag, className) {
    const element = document.createElement(tag)
	
    if (className) element.classList.add(className)
		
    return element
  } 
  
   getElement(selector) {
    const element = document.querySelector(selector)
	
    return element
  }
  
  showGroceryList(pantryList){
	  
	  while(this.groceryList.firstChild){
		  this.groceryList.removeChild(this.groceryList.firstChild)
	  }
	  
	  
	  if (pantryList.length ===0){
		  const p = this.createElement('p')
		  p.textContent = 'Add a groceries to start list'
		  this.groceryList.append(p)
	  }else{
		  
		  pantryList.forEach(groceryItem =>{
			const li = this.createElement('li')
			li.id = groceryItem.id	
			
		const checkbox = this.createElement('input')
        checkbox.type = 'checkbox'
        checkbox.checked = groceryItem.complete					

		  const span = this.createElement('span')
		  span.contenEditable = true
		  span.classList.add('editable')
		  
		  if (groceryItem.complete){
			  const strike = this.createElement('s')
			  strike.textContent = groceryItem.text
			  span.append(strike)
		  }else{
			span.textContent = groceryItem.text
		  }
		  		  
		  const deleteButton = this.createElement('button', 'delete')
          deleteButton.textContent = 'Delete'
          li.append(checkbox, span, deleteButton)
		  
		  
		  this.groceryList.append(li)
		 })
	}
	
		
	console.log(pantryList)
  }
  
  viewInitLocalListeners(){
	  this.groceryList.addEventListener('input', event =>{
		  if (event.target.className === 'editable'){
			  this.viewTempGroceryText = event.target.innerText
		  }
	  })
  }
    
  bindAddItem(handler){
	  this.form.addEventListener('submit', event => {
		  event.preventDefault()
		  
		  if(this.viewGroceryText){
			  handler(this.viewGroceryText)
			  this.viewInput()
		  }
	  })
  }
   
   bindDeleteItem(handler){
	   this.groceryList.addEventListener('click', event =>{
		   if(event.target.className === 'delete'){
			   const id = parseInt(event.target.parentElement.id)
			   
			   handler(id)
		   }
	   })
   }
   
   bindEditItem(handler){
	   this.groceryList.addEventListener('focusout', event => {
		   if(this.viewTempGroceryText){
			   const id = parseInt(event.target.parentElement.id)
			   
			   handler(id, this.viewInitLocalListeners())
			   this.viewTempGroceryText = ''
		   }
	   })
   }
      
   bindInTheBasketItem(handler){
	   this.groceryList.addEventListener('change', event => {
		   if(event.target.type === 'checkbox'){
			   const id = parseInt(event.target.parentElement.id)
			   
			   handler(id)
		   }
	   })
   }  
}









class Controller {
  constructor(model, view) {
    this.model = model
    this.view = view
	
	
	this.model.bindPantryListChanged(this.onPantryListChanged)
	this.view.bindAddItem(this.handleAddItem)
	this.view.bindEditItem(this.handleEditItem)
	this.view.bindDeleteItem(this.handleDeletItem)
	this.view.bindInTheBasketItem(this.handleInTheBasket)	
		
    // Display initial todos
    this.onPantryListChanged(this.model.pantryList)
  }

  onPantryListChanged = pantryList => {
    this.view.showGroceryList(pantryList)
  }
    
  handleAddItem = itemText => {
    this.model.addItem(itemText)
  }
  
  handleEditItem = (id, itemText) =>{
	  this.model.editItem(id, itemText)
  }
  
  handleDeletItem = id =>{
	  this.model.deleteItem(id)
  }
  
  handleInTheBasket = id => {
	  this.model.inTheBasket(id)
  }  
}

const app = new Controller(new Model(), new View())

