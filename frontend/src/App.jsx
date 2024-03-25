import { useState , useEffect} from 'react'
import './App.css'
import ContactList from './ContactList'
import ContactForm from './ContactForm'

function App() {
  //modal - we will set it to true, when we want to open the modal
  const[isModalOpen, setIsModalOpen] = useState(false)


  //state which will store our contacts
  const [contacts, setContacts] = useState([])

  const [currentContact, setCurrentContact] = useState({})




  //hookup
  // as soon as this component renders loads , call fetchContcts , - it will give us the contacts, then set in State
  useEffect(() => {
    fetchContacts()
  } , [])

  //asynchornous= going to wait a sec to fetch the contacts
  const fetchContacts = async() => {
    //send a req to backend to get the contacts
    //fetch is used to send a request (by default get req)
    const response = await fetch("http://127.0.0.1:5000/contacts") // sending aget req to /contacts endpoint
    //once we get response, we need json data associated with the response
    const data = await response.json() //will return a json like - {"contacts" : [ ] }
    setContacts(data.contacts)
    console.log(data.contacts)
  }
  
  // functions to toggle the modal
  const closeModal =() =>{
    setIsModalOpen(false)
    setCurrentContact({}) //aftering closing, we are resetting it
  }
  const openCreateModal =() =>{ 
    if (!isModalOpen) setIsModalOpen(true) //if its not open , well open it 
  }


  const openEditModal = (contact) => {
    if(isModalOpen) return //if modal is open, simply retunr
    setCurrentContact(contact)
    setIsModalOpen(true)
  }

  //fetch the contacts again, bc they might have been updated after the update
  const onUpdate = ()=> {
    closeModal()
    fetchContacts()
  }



    //render the Contact List, Contact Form
    return (
      <> 
        <ContactList contacts = {contacts} updateContact={openEditModal} updateCallback={onUpdate}/>
        <button onClick={openCreateModal}> Create new Contact</button>
        {
          //display the model
          isModalOpen && <div className='modal'>
            <div className='modal-content'>
              <span className='close' onClick={closeModal}>&times;</span>
              <ContactForm existingContact={currentContact} updateCallback={onUpdate} />
            </div>
          </div>
        }
      </>
    )
    
}

export default App
