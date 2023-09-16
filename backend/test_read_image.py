import cv2
from pprint import pprint

IMAGE_FILEPATH = "static\\IMG_2860.jpg"

img = cv2.imread(IMAGE_FILEPATH)

# Sanity check
pprint(img)
