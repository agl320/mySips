import cv2
import numpy as np
import pytesseract
import re
# This just a file for all preprocessing cleaned up so I can import and use in app

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

def preprocess_image(image):
    """Apply a sequence of preprocessing steps."""
    # gray = grayscale(image)
    blur = cv2.GaussianBlur(image, (1, 1), 1)
    _, otsu_result = cv2.threshold(blur, 0, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU)
    adaptive_result = remove_small_black_dots(noise_reduction(adaptive_threshold(image)))
    return otsu_result, adaptive_result


def clean_text_alphanumeric(text):
    """Remove non-alphanumeric characters."""
    return re.sub(r"[^a-zA-Z0-9\s]", "", text)

def extract_drink_name_from_text(text, nlp_model):
    """Extract entities from text using NLP model."""
    cleaned_text = clean_text_alphanumeric(text.replace('\n', ' '))
    doc = nlp_model(cleaned_text)
    return [{"entity": ent.text, "label": ent.label_} for ent in doc.ents if ent.label_ in ["drink_name", "drink name"]]

def manual_clean(entities):
    """Filter entities manually."""
    pattern = r'\b[1-9]?[xX]\b|[1-9]?[xX]\s'
    return [entity for entity in entities if re.search(pattern, entity['entity'])]