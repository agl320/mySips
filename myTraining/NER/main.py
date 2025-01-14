import cv2  # could be as cv
import numpy as np
import os
from os import listdir
from os.path import isfile, join

# Input/output dirs
input_dir = "./receipts/original"
output_dir = "./receipts/preprocessed"
os.makedirs(output_dir, exist_ok=True)  # Create output dir if not exist

# Get files in input dir
image_files = [f for f in listdir(input_dir) if isfile(join(input_dir, f))]

def grayscale(image):
    return cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

def adaptive_threshold(image):
    return cv2.adaptiveThreshold(image, 255, cv2.ADAPTIVE_THRESH_GAUSSIAN_C, cv2.THRESH_BINARY, 11, 2)

def noise_reduction(image):
    kernel = np.ones((1, 1), np.uint8)  # Small kernel for small images
    erosion = cv2.erode(image, kernel, iterations=1)
    dilation = cv2.dilate(erosion, kernel, iterations=1)
    opening = cv2.morphologyEx(image, cv2.MORPH_OPEN, kernel)
    return opening

def remove_small_black_dots(image):
    # Convert to binary
    _, binary = cv2.threshold(image, 127, 255, cv2.THRESH_BINARY)
    inverted = cv2.bitwise_not(binary)  # Invert for black as foreground

    # Find connected components
    num_labels, labels, stats, _ = cv2.connectedComponentsWithStats(inverted, connectivity=8)

    # Filter small components
    filtered = np.zeros_like(inverted)
    min_size = 10
    for i in range(1, num_labels):  # Skip background
        if stats[i, cv2.CC_STAT_AREA] > min_size:
            filtered[labels == i] = 255

    return cv2.bitwise_not(filtered)  # Revert inversion

# Process images
for image_file in image_files:
    input_path = join(input_dir, image_file)
    output_path_otsu = join(output_dir, f"{image_file}_otsu.png")
    output_path_adaptive = join(output_dir, f"{image_file}_adaptive.png")

    img = cv2.imread(input_path)
    if img is None:  # Skip unreadable files
        print(f"Skipping {image_file}: unable to read.")
        continue

    # Apply preprocessing
    gray = grayscale(img)
    blur = cv2.GaussianBlur(gray, (1, 1), 1)
    _, th3 = cv2.threshold(blur, 0, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU)
    tha = remove_small_black_dots(noise_reduction(adaptive_threshold(gray)))

    # Save results
    cv2.imwrite(output_path_otsu, th3)
    cv2.imwrite(output_path_adaptive, tha)
    print(f"Processed and saved: {image_file}")
