import cv2
import numpy as np

from pprint import pprint


import easyocr


import math

class Text:

    def __init__(self, top, left, height, width, value):
        self.top = top
        self.left = left
        self.height = height
        self.width = width
        self.bottom = self.top + self.height
        self.right = self.left + self.width
        self.value = value


class SingleText:

    def __init__(self, top, left, height, width, value):
        self.top = top
        self.left = left
        self.height = height
        self.width = width
        self.bottom = self.top + self.height
        self.right = self.left + self.width
        self.value = value


class RadioGroup:

    def __init__(self):
        self.top = None
        self.left = None
        self.height = None
        self.width = None
        self.bottom = None
        self.right = None
        self.initial_dims_updated = False
        self.list_of_radio_button_obj = []
        self.title = "Form"

    def __repr__(self):
        print("Start of content")
        for button_obj in self.list_of_radio_button_obj:
            pprint(button_obj)
        return "End of content"

    def add_radio_button_to_list(self, radio_button_obj):
        self.list_of_radio_button_obj.append(radio_button_obj)
        # print("call!")
        # print(self.list_of_radio_button_obj)
        if self.initial_dims_updated:
            pass

        else:
            self.top = radio_button_obj.top
            self.height = radio_button_obj.height
            self.left = radio_button_obj.left
            self.width = radio_button_obj.width
        
        self.update_bottom()
        self.update_right()

    def update_bottom(self):
        self.bottom = self.top + self.height

    def update_right(self):
        self.right = self.left + self.width

    def add_button(self, radio_button_obj):
        if len(self.list_of_radio_button_obj) == 0:
            self.add_radio_button_to_list(radio_button_obj=radio_button_obj)

        else:
            if abs(self.left - radio_button_obj.left) < 10:
                if abs(self.top - radio_button_obj.top) < 250:
                    self.add_radio_button_to_list(radio_button_obj=radio_button_obj)

    def return_json(self):
        return_dict = {
            "type":"RadioGroup",
            "title": self.title,
            "options": [radio_button_obj.value for radio_button_obj in self.list_of_radio_button_obj],
            "width": self.width,
            "height": self.height,
            "left_margin": self.left,
            "top_margin": self.top
        }
        
        return return_dict

class RadioButton:

    
    def __init__(self, top, left, height, width, value):
        self.top = top
        self.left = left
        self.height = height
        self.width = width
        self.bottom = self.top + self.height
        self.right = self.left + self.width
        self.value = value
        self.center = (self.left+0.5*self.width, self.top+0.5*self.height)


    def __repr__(self) -> str:
        return f"Center of radio button: {self.center}; text: {self.value}"

    def is_same_button(self, other_button):
        euclidean_dist = math.sqrt((self.center[0] - other_button.center[0])**2 + (self.center[1] - other_button.center[1])**2)
        pprint(f"Euclidean dist: {euclidean_dist}")
        if euclidean_dist <5:
            return True
        else:
            return False
        
    def text_belongs(self, text_obj):

        pprint(text_obj.top < self.center[1] < text_obj.bottom)
        pprint(0<(text_obj.left - self.right)<20)
        print()

        if (text_obj.top < self.center[1] < text_obj.bottom) and (0<(text_obj.left - self.right)<20):
            self.value = text_obj.value
            return True
        else:
            return False

image = cv2.imread("static/test_single_radio_group.png")



reader = easyocr.Reader(['en']) # this needs to run only once to load the model into memory
results = reader.readtext('static/test_single_radio_group.png')

pprint(results)

list_of_text_objs = []



for result in results:
    
    width = result[0][1][0] - result[0][0][0]
    # print(width)

    height = result[0][2][1] - result[0][1][1]
    # print(height)

    top = result[0][0][1]
    left = result[0][0][0]

    value = result[1]

    text_obj = Text(top=top, left=left, height=height, width=width, value=value)

    image = cv2.rectangle(image, (text_obj.left,text_obj.top), (text_obj.right,text_obj.bottom), (255,255,255), -1)


    list_of_text_objs.append(text_obj)



# Grayscale
gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
  
# Find Canny edges
edged = cv2.Canny(gray, 30, 200)
cv2.waitKey(0)
  
# Finding Contours
# Use a copy of the image e.g. edged.copy()
# since findContours alters the image
contours, hierarchy = cv2.findContours(edged, 
    cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_NONE)
  

list_of_radio_objs = []

for contour in contours:
    # pprint(len(contour))
    # pprint(contour)

    pprint(type(contour))

    left = min(contour[:,0,0])
    width = max(contour[:,0,0]) - min(contour[:,0,0])
    top = min(contour[:,0,1])
    height = max(contour[:,0,1]) - min(contour[:,0,1])

    radio_obj = RadioButton(top=top, left=left, height=height, width=width, value=None)
    pprint(radio_obj)

    if len(list_of_radio_objs) == 0:
        list_of_radio_objs.append(radio_obj)

    else:
        button_already_exists = False
        for prev_radio_obj in list_of_radio_objs:
            if radio_obj.is_same_button(prev_radio_obj):
                button_already_exists = True
                break
        if not button_already_exists:
            list_of_radio_objs.append(radio_obj)



final_radio_obj_list = []

for radio_obj in list_of_radio_objs:
    for text_obj in list_of_text_objs:
        if radio_obj.text_belongs(text_obj):
            final_radio_obj_list.append(radio_obj)
            break



print(">>>")

for radio_obj in final_radio_obj_list:
    pprint(radio_obj)


# list_of_remaining_radio_obj = []

radio_group_obj = RadioGroup()

for button_obj in final_radio_obj_list:
    radio_group_obj.add_button(button_obj)



pprint(radio_group_obj)

# radio_buttons_remaining = len(list_of_radio_objs)



pprint(radio_group_obj.return_json())

edgedS = cv2.resize(edged, (1600, 1000))
cv2.imshow("frame", edgedS)

# cv2.imshow('Canny Edges After Contouring', edged)
cv2.waitKey(0)
  
print("Number of Contours found = " + str(len(contours)))
  
# Draw all contours
# -1 signifies drawing all contours
cv2.drawContours(image, contours, -1, (0, 255, 0), 3)
  
imS = cv2.resize(image, (1600, 1000))                # Resize image


cv2.imshow('Contours', imS)
cv2.waitKey(0)
cv2.destroyAllWindows()