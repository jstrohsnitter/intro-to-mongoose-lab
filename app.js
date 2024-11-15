const dotenv = require('dotenv')
dotenv.config()
const mongoose = require('mongoose')
console.log(process.env.MONGODB_URI)

const prompt = require('prompt-sync')(({ sigint: true }));

// const username = prompt('What is your name? ');

// console.log(`Your name is ${username}`);

const crmModel = require('./models/crm.js')

const connect = async () => {
    await mongoose.connect(process.env.MONGODB_URI)
    console.log('Connected to MongoDB')

    const welcomeUser = prompt('Welcome user! What is your name?'
    )
    console.log(`Your name is ${welcomeUser}`)
    
    const fireMain = async () => {
        let keepRunning = true; //got this while loop from chat GPT. i wanted to write if statements and functions based off that, but didn't know how to get the prompt for the main menu up again.  i figured i could go secondChoice thirdChoice for if statements after, but it would have to end somewhere
        while (keepRunning) { //this while loop will loop through a block of code as long as a specified condition is true, in this case, the keeprunning variable. will be able to shut off (false) with a quit prompt or something
        const mainMenuChoice = prompt('What Would you like to do? Type the number of the desired action. 1.) Create a customer, 2.) View a customer, 3.) Update a customer, 4.) Delete a customer, 5.) Quit? ')
   
    if (mainMenuChoice === '5'){
        keepRunning = false
        console.log('exiting...')
        mongoose.connection.close()
    }
    if(mainMenuChoice === '1') {
        const namePrompt = prompt('What is the name of the customer you would like to add?')
        const agePrompt = prompt('How old is this person?')
        const newCustomer = {
            name: `${namePrompt}`,
            age: `${agePrompt}`,
        }
        await crmModel.create(newCustomer)
    }

    if(mainMenuChoice === '2') {
        const findCustomer = await crmModel.find({})
        console.log(`Below is a list of customers: ${findCustomer}`)
    }

    if(mainMenuChoice === '3') {
        const findCustomer2 = await crmModel.find({})
        console.log(`Below is a list of customers: ${findCustomer2}`)
        const findPrompt = prompt('Copy and paste the id of the customer you would like to update here: ')
        const foundCRM = await crmModel.findById(`${findPrompt}`)
        console.log(`${foundCRM}`)
        const updateNamePrompt = prompt('What is the customers new name?')
        const updateAgePrompt = prompt('What is the customers new age?')
        const updatedCustomer = await crmModel.findByIdAndUpdate(
            `${findPrompt}`,
            {name: `${updateNamePrompt}`, age: `${updateAgePrompt}` },
            {new: true} 
        )
        console.log(updatedCustomer)
    }

    if(mainMenuChoice === '4') {
        const findCustomer3 = await crmModel.find({})
        console.log(`Below is a list of customers: ${findCustomer3}`)
        const deletePrompt = prompt('Copy and paste the ID of the customer you would like to delete. ')
        const deletedCustomer = await crmModel.findByIdAndDelete(`${deletePrompt}`)
        console.log(`Customer Deleted`)
    }

    }
    }
fireMain()
   
    

}

connect()

