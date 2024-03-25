//create a form

import { useState } from "react";

//updateCallback will get called as soon as we perform any updates
const ContactForm = ({existingContact={} , updateCallback }) => {


    //state for the form// for the 3 variables we need
    //declare
    const [firstName, setFirstName] = useState(existingContact.firstName || "")
    const[lastName,setLastName] = useState(existingContact.lastName || "")
    const[email,setEmail] = useState(existingContact.email || "")
    //lets look at the exisitng contacts, if we have 1(meaning we are actually editing a contact) , we will put in 
    //first name last name email , otherwise well have empty string

    // if you pass an object that has atleast 1 entry inside of it, that means we are updating it, if it doesnt it means we are creating a new contact
    const updating = Object.entries(existingContact).length !==0

    

    const onSubmit = async(e) => {
        e.preventDefault()
        //e meaning we wont be refreshing the page automatically
        //start to finding the data which we want to pass with our json as request
        //this corresponds to whatever we are looking at in api when we create a new contact
        //JS object:
        const data = { //defining the data
            firstName,
            lastName,
            email
        }
        // const url = "http://127.0.0.1:5000/create_contact" //defining the url endpoint (create_contact) - removing it
       
        //apending dyanmic data which is going to be endpoint
        // basically changes the url according to if we are updating or creaiting
        const url = "http://127.0.0.1:5000/"+ (updating ? `update_contact/${existingContact.id}` : "create_contact")
        //when we are updating , well call update_contact  // path parameter
        //but to this we need to pass in id of the contact we are updating




        //for requests other than get we need to specify options
        //we are specifying - we are about to submit json data, so we need to include in the header 
        //when we send the request so that api knows that we have json data
        //basically we are setting the options for the request
        const options = {
            method: updating ? "PATCH": "POST", //dynamic rendering
            headers:{
                "Content-Type":"application/json"
            },
            //we need to convert data into JSON object
            body: JSON.stringify(data)
        }

        //now we have to send the request
        const response = await fetch(url,options)
        //if you dont give a valid response, we will alert the user 
        // we have a key named message which will alert the user
        //basically checking if it was successful
        if(response.status!==201 && response.status!==100){
            const data = await response.json()
            alert(data.message)
        }
        else{
            updateCallback() // itwill tell App.jsx component that yes we finished this, we ddnt update/create operation
            
        }
    }



    
    //get function e, set firstname,lastname,email
    return<form onSubmit= {onSubmit}>
        
        <div>
            <label htmlFor="firstName"> First Name : </label>
            
            <input type="text" id="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
        </div>
        <div>
            <label htmlFor="lastName"> Last Name : </label>
            
            <input type="text" id="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} />
        </div>
        <div>
            <label htmlFor="email"> Email: </label>
            <input type="text" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>

        <button type="submit"> {updating ? "Update" : "Create"} </button> 
        

    </form>
} 
                                    //dynamic rendering


export default ContactForm