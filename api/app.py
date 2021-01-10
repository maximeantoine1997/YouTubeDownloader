from flask import Flask, request, render_template
from customDownloader import download_file
from flask.helpers import send_file

#CORS(app, resources={r"/*": {"origins": "*"}}

app = Flask(__name__)

@app.route("/test", methods=["GET"])
def test():
    return {"res": "Something from backend"}

@app.route("/test", methods=["POST"])
def postTest():
    try:
        idk = request.get_json()
        print(idk.get("data"))
        return {"status": 200}
    except:
        return {"status": 500}

@app.route("/youtube", methods=["POST"])
def download():
    try:
        data = request.get_json().get("data")
        print(data)
        res = download_file(data.get("link"), data.get("format"), data.get("quality"))
        return {"status": 200}
    except:
        return {"status": 500}
