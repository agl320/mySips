import cv2
import numpy as np
import re

class ReceiptProcessor:
    def __init__(self, nlp_model):
        self.nlp_model = nlp_model

    def grayscale(self, image):
        """Convert image to grayscale."""
        return cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

    def adaptive_threshold(self, image):
        """Apply adaptive thresholding to the image."""
        return cv2.adaptiveThreshold(image, 255, cv2.ADAPTIVE_THRESH_GAUSSIAN_C, cv2.THRESH_BINARY, 11, 2)

    def noise_reduction(self, image):
        """Reduce noise in the image using erosion, dilation, and morphological opening."""
        kernel = np.ones((1, 1), np.uint8)
        erosion = cv2.erode(image, kernel, iterations=1)
        dilation = cv2.dilate(erosion, kernel, iterations=1)
        opening = cv2.morphologyEx(image, cv2.MORPH_OPEN, kernel)
        return opening

    def remove_small_black_dots(self, image):
        """Remove small black dots from the image by identifying small connected components."""
        _, binary = cv2.threshold(image, 127, 255, cv2.THRESH_BINARY)
        inverted = cv2.bitwise_not(binary)  # Invert for black as foreground

        num_labels, labels, stats, _ = cv2.connectedComponentsWithStats(inverted, connectivity=8)
        filtered = np.zeros_like(inverted)
        min_size = 10

        for i in range(1, num_labels):  # Skip background
            if stats[i, cv2.CC_STAT_AREA] > min_size:
                filtered[labels == i] = 255

        return cv2.bitwise_not(filtered)  # Revert inversion

    def preprocess_image(self, image):
        """Apply a sequence of preprocessing steps including thresholding and noise reduction."""
        blur = cv2.GaussianBlur(image, (1, 1), 1)
        _, otsu_result = cv2.threshold(blur, 0, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU)
        adaptive_result = self.remove_small_black_dots(self.noise_reduction(self.adaptive_threshold(image)))
        return otsu_result, adaptive_result

    def clean_text_alphanumeric(self, text):
        """Remove non-alphanumeric characters from text."""
        return re.sub(r"[^a-zA-Z0-9\s]", "", text)

    def extract_drink_name_from_text(self, text):
        """Extract entities from text using NLP model."""
        cleaned_text = self.clean_text_alphanumeric(text.replace('\n', ' '))
        doc = self.nlp_model(cleaned_text)
        return [{"entity": ent.text, "label": ent.label_} for ent in doc.ents if ent.label_ in ["drink_name", "drink name"]]

    def manual_clean(self, entities):
        """Filter entities manually based on specific patterns."""
        pattern = r'\b[1-9]?[xX]\b|[1-9]?[xX]\s'
        return [entity for entity in entities if re.search(pattern, entity['entity'])]
