from flask import Flask
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route("/get_data")
def server_data():
    
    with open("data.json", "r") as file:
        contents = file.read()
        file.close()
    return contents

app.run(host="0.0.0.0", port=8000)