import easyocr

import string
import random

import json
from pprint import pprint

import time

import cv2
import numpy as np

from src.render_functions import generate_img_tag, generate_p_tag, get_instructor, get_openai_link


with open("tempfile.json", "r") as jsonfile:
    json_data = json.load(jsonfile)

# pprint(json_data)


reader = easyocr.Reader(['en']) # this needs to run only once to load the model into memory
result = reader.readtext('gray.png')

pprint(result)

main_data_dict = {"data":[]}

for item in result:
    temp_dict = {}

    pprint(item[0])

    temp_dict["p1"] = item[0][0]
    temp_dict["p2"] = item[0][1]
    temp_dict["p3"] = item[0][2]
    temp_dict["p4"] = item[0][3]

    temp_dict["text"] = item[1]
    temp_dict["confidence"] = item[2]

    main_data_dict["data"].append(temp_dict)


class Screen:

    def __init__(self):
        self.width = 2000
        self.height = 2000
        self.background_color = (255, 255, 255)

image = np.ones((Screen().height, Screen().width, 3), dtype=np.uint8)* Screen().background_color

for item in main_data_dict["data"]:
    pprint(item)
    pprint(item["text"])
    pprint(item["p1"])
    cv2.putText(image, item["text"], (int(item["p1"][0]), int(item["p1"][1])), cv2.FONT_HERSHEY_SIMPLEX, 1, color=(0,0,0))
    image = image.astype(np.uint16)

curr_string = ""

main_texts_list = []

main_json = {"data":{}}

temp_element = {
    "type": None,
    "width": None,
    "height": None,
    "left_margin": None,
    "top_margin": None,
    "font_size": 12,
    "text": ""
}

temp_element["left_margin"] = main_data_dict["data"][0]["p1"][0]
temp_element["top_margin"] = main_data_dict["data"][0]["p1"][1]


for i in range(len(main_data_dict["data"])):

    print(i)

    if main_data_dict["data"][i-1]["p4"][1] < main_data_dict["data"][i]["p1"][1]:
        main_texts_list.append(curr_string)

        res = ''.join(random.choices(string.ascii_uppercase +
                             string.digits, k=10))
        
        main_json["data"][res] = temp_element

        # if (i+1) == len(main_json["data"]):
        #     break

        curr_string=""
        temp_element = {
            "type": None,
            "width": None,
            "height": None,
            "left_margin": None,
            "top_margin": None,
            "font_size": 12,
            "text": ""
        }

        temp_element["left_margin"] = main_data_dict["data"][i]["p1"][0]
        temp_element["top_margin"] = main_data_dict["data"][i]["p1"][1]

    else:
        pass

    temp_element["text"] += f"{main_data_dict['data'][i]['text']}"
    curr_string += f"{main_data_dict['data'][i]['text']} "

main_texts_list.append(curr_string)

res = ''.join(random.choices(string.ascii_uppercase +
                        string.digits, k=10))

main_json["data"][res] = temp_element



image = image.astype(np.uint8)

cv2.imshow("Image", image)

cv2.waitKey()
cv2.destroyAllWindows()

pprint(main_json)



def generate_html(list_of_html_elements):
    generated_HTML_code = """
        <html>
            <body>
    """

    for element in list_of_html_elements:
        generated_HTML_code += element

    generated_HTML_code += "</body></html>"

    return generated_HTML_code




for key_ in main_json["data"].keys():

    pprint(key_)

    if get_instructor(main_json["data"][key_]["text"]) in ["#IMAGE", "#IMG", "#LMG"]:
        main_json["data"][key_]["type"] = "Image"

        text_prompt = main_json["data"][key_]["text"] 
        main_json["data"][key_]["src"] = get_openai_link(text_prompt)
        main_json["data"][key_]["alt"] = text_prompt

        main_json["data"][key_]["text"] = None



    else:
        main_json["data"][key_]["type"] = "Typography"

pprint("---")

pprint(main_json)






# main_elements_html = []

# pprint(main_texts_list)

# for sample_text in main_texts_list:

#     if len(sample_text)>0:

#         print(f"sample_text: {sample_text}")

#         instructor = get_instructor(sample_text)

#         if instructor is not None and instructor.upper() in ["#IMAGE", "#IMG", "#LMG"]:
#             print("hi!!!")
#             main_elements_html.append(generate_img_tag(sample_text))
#         else:
#             main_elements_html.append(generate_p_tag(sample_text))

#         print("printing `main_texts_list`")
#         print(main_texts_list)


# with open("sample_output.html", "w") as output_file:
#     output_file.write(generate_html(main_elements_html))
#     output_file.close()