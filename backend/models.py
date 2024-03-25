from config import db #this instance will give access to SQLAlechmy
#
class Contact(db.Model): # database model represted as python class ,inherit from Model
    id =db.Column(db.Integer , primary_key=True)
    first_name = db.Column(db.String(80), unique = False,nullable=False)
    last_name = db.Column(db.String(80), unique = False,nullable=False)
    email = db.Column(db.String(120), unique = True,nullable=False)

    def to_json(self): # easy for us to give it to the front end/ to anyone requesting for contacts  #convert all above fields into pytyhon dictionary which can then be converted into json whcihc can be pas from an api
        # we will be passing json back and forth
        #api will return json and we will send  json to api for creating different objects         
        return { # when using json, convention is to use camelkeys 
            "id": self.id,
            "firstName": self.first_name,
            "lastName": self.last_name,
            "email":self.email
        }










