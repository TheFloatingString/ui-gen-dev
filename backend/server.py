from flask import Flask, request, make_response, jsonify
import requests
import json
import base64
import PIL
from PIL import Image
from io import BytesIO
# from fastapi import FastAPI, Form

app = Flask(__name__)
try:
    x = {"action": "test"}
    x = json.dumps(x)
    urls = "http://localhost:3000/post?data="
    urls += x
    var = requests.post(urls, json=x)
except:
    print("Error sending post request")

@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"

@app.route("/endpoint/", methods=['POST'])
def home():
    data = request.get_json()
    print(data)
    print(data["test"])
    result = make_response("jsonify(result)", 200)
    return result