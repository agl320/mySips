import cv2
import numpy as np

def preprocess_image(image):
    """Preprocess the image for OCR."""
    blur = cv2.GaussianBlur(image, (1, 1), 1)
    _, otsu_result = cv2.threshold(blur, 0, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU)
    adaptive_result = cv2.adaptiveThreshold(image, 255, cv2.ADAPTIVE_THRESH_GAUSSIAN_C, cv2.THRESH_BINARY, 11, 2)
    return otsu_result, adaptive_result