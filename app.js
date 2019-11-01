// client-side javascript

console.log('Client side js file is loaded.')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input') // getting the input element
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e)=>{ // e for event
    e.preventDefault() // to prevent the browser from automatically refreshing the page

    const location = search.value // getting the value put into the input textbox
    messageOne.textContent = 'Loading...'
    messageTwo.textContent = '' //clearing any previous results

    fetch('http://localhost:3000/weather?address='+location).then((response)=>{
        response.json().then((data)=>{
            if(data.error) return messageOne.textContent = data.error

            messageOne.textContent = data.location
            messageTwo.textContent = data.forecast
        })
    })

})