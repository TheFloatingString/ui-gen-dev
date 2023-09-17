import cv2
import numpy as np

import easyocr


# Let's load a simple image with 3 black squares
image = cv2.imread("static\\download-test-img.png")
cv2.waitKey(0)
  
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

# from Chat GPT
for contour in contours:
    epsilon = 0.04 * cv2.arcLength(contour, True)
    approx = cv2.approxPolyDP(contour, epsilon, True)
    if len(approx) == 4:
        x, y, w, h = cv2.boundingRect(contour)
        aspect_ratio = float(w) / h
        if 0.9 <= aspect_ratio <= 1.1:
            cv2.rectangle(image, (x, y), (x + w, y + h), (0, 255, 0), 2)
            print("here's an instance.")

cv2.imshow('frame', image)

cv2.imshow('Canny Edges After Contouring', edged)
cv2.waitKey(0)
  
print("Number of Contours found = " + str(len(contours)))
  
# Draw all contours
# -1 signifies drawing all contours
cv2.drawContours(image, contours, -1, (0, 255, 0), 3)
  
imageS = cv2.resize(image, (500,500))

cv2.imshow('Contours', imageS)
cv2.waitKey(0)
cv2.destroyAllWindows()