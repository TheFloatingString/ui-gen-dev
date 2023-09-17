from flask import Flask, request, make_response, jsonify
import requests
import json

# app = Flask(__name__)
try:
    x = {"action": "test"}
    x = json.dumps(x)
    urls = "http://localhost:3000/post?data="
    urls += x
    var = requests.post(urls, json=x)
except:
    print("Error sending post request")

# @app.route("/")
# def hello_world():
#     return "<p>Hello, World!</p>"

# @app.route("/endpoint/", methods=['GET', 'POST'])
# def home():
#     data = request.get_json()
#     data = json.loads(data)
#     print(data)
#     url = data['url']
#     # print(result)
#     # result = json.loads(result)
#     # result = make_response(jsonify(result), 200)
#     result = make_response("jsonify(result)", 200)
#     return result