import cv2 # should be as cv
import numpy as np
from imutils.perspective import four_point_transform

IMAGE_FILE = "receipts/images.png"

img = cv2.imread(IMAGE_FILE)

cv2.imshow("original image", img)
cap = cv2.waitKey(0) 

def grayscale(image):
    return cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

def adaptive_threshold(image):
    return cv2.adaptiveThreshold(image,255,cv2.ADAPTIVE_THRESH_GAUSSIAN_C, cv2.THRESH_BINARY, 11, 2)

def noise_reduction(image):
    kernel = np.ones((1, 1), np.uint8)  # Adjusted for smaller images
    erosion = cv2.erode(image, kernel, iterations=1)
    dilation = cv2.dilate(erosion, kernel, iterations=1)
    opening = cv2.morphologyEx(image, cv2.MORPH_OPEN, kernel)
    # closing = cv2.morphologyEx(opening, cv2.MORPH_CLOSE, kernel)
    return opening

def remove_small_black_dots(image):
    # Ensure the image is binary (0 and 255)
    _, binary = cv2.threshold(image, 127, 255, cv2.THRESH_BINARY)

    # Invert the binary image to treat black as foreground
    # since connected components by default treats white as foreground
    inverted = cv2.bitwise_not(binary)
    num_labels, labels, stats, _ = cv2.connectedComponentsWithStats(inverted, connectivity=8)

    # Create a mask to keep only large components
    filtered = np.zeros_like(inverted)
    min_size = 10
    for i in range(1, num_labels):  # Skip the background (label 0)
        if stats[i, cv2.CC_STAT_AREA] > min_size:  # Keep components larger than `min_size`
            filtered[labels == i] = 255

    # Invert the result back to match the original image format
    result = cv2.bitwise_not(filtered)
    return result

# Otsu's thresholding after Gaussian filtering
blur = cv2.GaussianBlur(grayscale(img),(1,1), 1)
ret3,th3 = cv2.threshold(blur,0,255,cv2.THRESH_BINARY+cv2.THRESH_OTSU)

# has contour/black background
tha = remove_small_black_dots(noise_reduction(adaptive_threshold(grayscale(img))))

# Create directory if it doesn't exist
output_dir = "preprocessed"
os.makedirs(output_dir, exist_ok=True)

# Save preprocessed images
cv2.imwrite(os.path.join(output_dir, "otsu_processed.png"), th3)
cv2.imwrite(os.path.join(output_dir, "adaptive_processed.png"), tha)