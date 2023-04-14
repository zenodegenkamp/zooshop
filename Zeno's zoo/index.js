import { menuArray } from '/data.js'
let totalPrice = 0
let allOrders = []
const paymentForm = document.getElementById('input-form')


// Checks if customer wants to pay
document.getElementById('completeOrderBtn').addEventListener('click', function(){
    if(allOrders.length > 0){

        document.getElementById('modal-content').style.display = "block"
    }
})


// Checks when the data is submitted and prevents refresh
paymentForm.addEventListener('submit', function(e){
    e.preventDefault()
    
    // Receives the data from the form
    const paymentFormData = new FormData(paymentForm)
    const name = paymentFormData.get('fullname')
    const cc = paymentFormData.get('ccNumber')
    const cvv = paymentFormData.get('cvvNumber') 
    console.log(cc)

    // Shows the final message to the customers
    setTimeout(function(){
        document.getElementById('modal-content').innerHTML = 
        `
        
        <h3> Thank you for shopping <span class="higlighted">${name}</span></h3>
        <p> Now I can use your credit card number: <span class="higlighted">${cc} </span> and the cvv: <span class="higlighted"> ${cvv}</span><p>
        <h3> To buy new animals </h3>
        <img src="images/monkey.gif">
        
        `
    }, 1500)
})





// Check when an animal is added or removed to/from the order
document.addEventListener('click', function(e){
    if (e.target.dataset.animal){
        changeAnimal(e.target.dataset.animal, "add")
    }
    else if(e.target.dataset.remove){
        changeAnimal(e.target.dataset.remove, "remove")
    }
})

function changeAnimal(targetAnimalName, task){

    // Compares the target animal name with the database
    const targetAnimal = menuArray.filter(function(animal){
        return animal.name === targetAnimalName
    })[0]

    // Checks what the task should be add or remove from order
    if(task === "add" & allOrders.length < 6){

        allOrders.push(targetAnimal)
    } 
    else {
        const targetIndex = allOrders.indexOf(targetAnimal)
        allOrders.splice(targetIndex, 1)
    }
    
    renderOrder(allOrders)
}

// Function that receivers the order Array and renders it 
function renderOrder(orderlist){
    
    totalPrice = 0
    
    let orderNames = ''
    let orderPrices = ''
    
    // Loops through the order array and creates the HTML
    orderlist.forEach(function(animal){

        totalPrice += animal.price

        orderNames += 
        `
        <p> <span id="animal-name">${animal.name}</span> <button data-remove=${animal.name} id="shop-remove-btn">remove</button><p>      
        `

        orderPrices += 
        `
        <p> <span id="animal-price">${animal.price}</span><p>      
        `
    })

    // Inserts all the information for the order section
    document.getElementById('totalPrice').innerHTML = (`${totalPrice}`)
    document.getElementById('orderName').innerHTML = orderNames
    document.getElementById('orderPrice').innerHTML = orderPrices

    // Changes the display of the total price section to flex
    document.getElementById('animalsTotalprice').style.display= 'flex'

}


// Creates the animals in the shop section
function getInnerHtml(){

    let animalsString = '' 

    // Loops through each animal and adds the HTML code to a string
    menuArray.forEach(function(animal){

        animalsString += 
        `
        <div class="shop-element">
            <h1 class="animal-icon">${animal.emoji}</h1>
            <div class="shop-text">
                <h3>${animal.name}</H3>
                <p class="shop-description">${animal.description}</p>
                <h6>${animal.price}</h6>
            </div>
            <button data-animal=${animal.name} class="shop-add-btn">+</button
            </div>
        </div>
        `
        
    })

   return animalsString
     
}

// Function that uses getInnerHtml to create the shop sections
function render(){

    // const htmlString = getInnerHtml()
    
    document.getElementById("animals-section").innerHTML = getInnerHtml()
    
}

render()