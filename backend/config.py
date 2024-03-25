from flask import Flask
from flask_sqlalchemy import SQLAlchemy #ORM- using normal python code we can do changes in DB  , python code will be translated to SQL automatically
from flask_cors import CORS  #cross origin request- allows to send request to backend from different url


app = Flask(__name__) #initialises flask application
CORS(app) # wrapp the applications,now we can send CORS to our app ,we want front end to be able to comminucate with the backend. so this disables any error

app.config["SQLALCHEMY_DATABASE_URI"]="sqlite:///mydatabase.db"  #specifgying location of local sqllite  DB, storing file (sqlite database)
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db = SQLAlchemy(app)  #creates a DB instance/object which gives us accss to db that we specified above, so we can do CRUD operations



