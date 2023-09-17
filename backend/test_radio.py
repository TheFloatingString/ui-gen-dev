import cv2
import numpy as np

from pprint import pprint

image = cv2.imread("static/demo-radio-buttons.png")
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
  
for contour in contours:
    pprint(len(contour))

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