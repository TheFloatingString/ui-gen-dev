from flask import Flask, request, make_response, jsonify
import requests
import json
import base64
import PIL
from PIL import Image
from io import BytesIO

from pprint import pprint

from src import render_functions


app = Flask(__name__)
'''try:
    x = {"action": "test"}
    x = json.dumps(x)
    urls = "http://localhost:3000/post?data="
    urls += x
    var = requests.post(urls, json=x)
except:
    print("Error sending post request")
'''
@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"

@app.route("/dev/test_main_render")
def get_dev_test_main_render():

    res = render_functions.screenshot_to_json("static\\final-test-1.png")
    return {"data": res}


@app.route("/endpoint/", methods=['POST'])
def home():
    data = request.get_json()
    print(data)
    print(data["test"])
    result = make_response("jsonify(result)", 200)

    pprint(result)
    return result


if __name__ == "__main__":
    app.run(debug=True, port=8000)
