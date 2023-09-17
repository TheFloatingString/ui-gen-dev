import easyocr

import json
from pprint import pprint

import time

import cv2
import numpy as np

from src.render_functions import generate_img_tag, generate_p_tag, get_instructor


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

for i in range(len(main_data_dict["data"])):

    if main_data_dict["data"][i-1]["p4"][1] < main_data_dict["data"][i]["p1"][1]:
        main_texts_list.append(curr_string)
        curr_string=""

        print("hi!")
        # main_texts_list.append(main_data_dict["data"][i]["text"])
    else:
        # main_texts_list[-1] += f" {main_data_dict["data"][i]["text"]}"
        # pass
        pass
    curr_string += f"{main_data_dict['data'][i]['text']} "

main_texts_list.append(curr_string)



image = image.astype(np.uint8)

cv2.imshow("Image", image)

cv2.waitKey()
cv2.destroyAllWindows()

def generate_html(list_of_html_elements):
    generated_HTML_code = """
        <html>
            <body>
    """

    for element in list_of_html_elements:
        generated_HTML_code += element

    generated_HTML_code += "</body></html>"

    return generated_HTML_code


main_elements_html = []

pprint(main_texts_list)

for sample_text in main_texts_list:

    if len(sample_text)>0:

        print(f"sample_text: {sample_text}")

        instructor = get_instructor(sample_text)

        if instructor is not None and instructor.upper() in ["#IMAGE", "#IMG", "#LMG"]:
            print("hi!!!")
            main_elements_html.append(generate_img_tag(sample_text))
        else:
            main_elements_html.append(generate_p_tag(sample_text))

        print("printing `main_texts_list`")
        print(main_texts_list)


with open("sample_output.html", "w") as output_file:
    output_file.write(generate_html(main_elements_html))
    output_file.close()