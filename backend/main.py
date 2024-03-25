#creating operations for CRUD
#when we create an api - it means theres a server is running an api. 
#server is some kind of address, like localhost:5000 as we are running on localmachine
# localhost:5000/home is domain endpoint is home

#when we submiy a request to anendpoint, we are having to submit some data along with endpoint. first,lastname,email

#request - is anyting that we send to some knd of server (here api)
#request has atupe
#GET- we are trying to access fome tupe of resource
#POST- we are trying to  create something new    ex: createcontact
#PATCH- update contact
#json data - info that comes along wth request . Going to be used when handling requests
#like if we are delteing contact, we are going to pass contact data  to delete in json

#in our case front end is going to send  request to our backend 
#and backend is going to return a response
#and reponse is goingo contain fewthings like status - 200 tells if the request was successful and 404- request not found/what u requetsed didnt exist, 400,403- banned unauthrozied. many respinse statuses are there


# endpoints can handle requests which will come from external source(in our case frontend/website)
#and then api then returns a reponse which contains how that request was handled (success or not)



#building API /structure




from flask import request,jsonify #return json data
from config import app, db
from models import Contact


@app.route("/contacts" , methods=["GET"])
#specifying which route we are going to
#and we only want get method for this url


def get_contacts(): # specify how we wanna handle a get rquest that is sent to this route
    contacts = Contact.query.all()  #uses flasksqlalcehemy, to get all contacts that exists in contact database
    # till here issue is , all contacts are python objects, so we cant return python objects - we can return json data
    # so well take all these pythonobjects and convert them into json
    
    json_contacts = list(map(lambda x: x.to_json(), contacts))
    #contacts = list of contact objects , call that json method and create an newlist that just contains the json for the contacs
    # map takes elements from contacts list, and applies a function to them, and gives a result to a new list.
    #x is contacts from list, and we are calling to_json on that contact, and its going to put in the new list
    # we dont want map object we want list.

    return jsonify({"contacts": json_contacts})
    #we have contacts key, which is associated to json_contacts. And then we are converting python dict object into json data object



#route for creating the contact
@app.route("/create_contact" , methods=["POST"])

def create_contact(): #looking into json data, - get will return value from "KEY", otherwise return none, 
    first_name = request.json.get("firstName")
    last_name = request.json.get("lastName")
    email = request.json.get("email")

    if not first_name or not last_name or not email:
        return (jsonify({"message":"You must include firstname,lastname and email"}), 
        400,
        )
    
    new_contact = Contact(first_name = first_name , last_name=last_name , email = email)
    #passing in values to constructor of my Contact , creating class(Contact)
    #created new_contct object with all these fields
    # now add all these fields into DB

    #we want a new entry to the DB
    try :
        db.session.add(new_contact) 
        # after adding entry,its in the staging area,, not fully written to Db(almost ready to write to DB)
        db.session.commit() #permanatnly written to DB
    
    except Exception as e:
        return jsonify({"message":str(e)}),400
    #errors can come during this process thats why its in try except block

    return jsonify({"message":"User Created !"}), 201



@app.route("/update_contact/<int:user_id>", methods=["PATCH"] ) #can be post as well
#specify path paramter which indiciates exact contac we want to update
def update_contact(user_id):
    contact = Contact.query.get(user_id) # look in the ContactDB, and find the user that has this user_id, as to update the user, user_id needs to exist
    if not contact:
        return jsonify({"message" : "User not found"}) ,404
    
    data = request.json 
    # whatver input we get , we will update
    contact.first_name = data.get("firstName", contact.first_name)
    # this is modifying contact's object first name to be equal to whatever json data firstname is that was given to us
    # .get() looks for a key in the dictionary(data=request.json) , if key exists it will return that value
    # .get() will return first parameter if its present otherwise second parameter
    contact.last_name = data.get("lastName", contact.last_name)
    contact.email = data.get("email", contact.email)

    db.session.commit()
    return jsonify({"message":"User updated"}) , 201




@app.route("/delete_contact/<int:user_id>" , methods = ["DELETE"])
def delete_contact(user_id):

    #lets look for the contact with this user_id
    contact = Contact.query.get(user_id)
    if not contact:
        return jsonify({"message" : "User not found"}) ,404
    
    db.session.delete(contact)
    db.session.commit()

    return jsonify({"message" : "User deleted"}) , 200



if __name__== "__main__":
    with app.app_context(): # checks if do we have our DB, if not create #instanstize our DB
        db.create_all() # create all diff models that we have dfined in our DB

    app.run(debug=True)  #running our code


#1st time running it we get a json reply - empty contact list

