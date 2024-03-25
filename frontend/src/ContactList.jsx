//here we will write components for rendering our contacts

import React from "react"
//take a prop , wee need to have contacts to render them
const ContactList = ({contacts,updateContact,updateCallback}) => {

    const onDelete = async(id) =>{
        try{
            const options = {
                method: "DELETE"
            }
            const response=await fetch(`http://127.0.0.1:5000/delete_contact/${id}`,options)
            //back ticks use - to embed a variable, here- id of user we want to delete
            if (response.status ===200){ //if successful we call updateCallback,
                updateCallback() //this is goingto tell App.jsx  that we should close the modal and fetch thecontacts again bc we have deleted one
            }
            else{
                console.error("Failed to delete")
            }
        } catch(error){
            alert(error)
        }

    }




    //whener weperform an update we willcall updateCallback
    //whener we want to update contact, we will just cal lthis function witth the contac we want to udpate
    //render our components in a table
//dynamically rendering all different table rows for our different contacts
// using JS and React
    return <div>
        <h2>Contacts</h2>
        <table>

            <thead>
                <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Actions</th>
                </tr>
            </thead>

            <tbody>
                
                {contacts.map((contact) =>(
                    <tr key = {contact.id}> 
                    
                        <td>{contact.firstName} </td>
                        <td>{contact.lastName} </td>
                        <td>{contact.email} </td>
                        <td>
                            <button onClick={() => updateContact(contact)}>Update</button>
                            <button onClick={() => onDelete(contact.id)}>Delete</button>
                        </td>
                    </tr>
                    //if you click on update, this func will call updatecontact, with the contacts we want to update
                ) )}
            </tbody>
        </table>
    </div>

}

//export contact list
export default ContactList