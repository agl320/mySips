import unittest
import cv2
import numpy as np
import spacy
from unittest.mock import patch, MagicMock
from parameterized import parameterized
from app.services.receipt_processing import ReceiptProcessor

# fyi inherits TestCase which gives assert, set and tear down, etc.
class TestReceiptProcessor(unittest.TestCase):

    @classmethod
    # NOTE setUpClass is for entire class
    # setUp is for individual methods
    def setUpClass(cls):
        cls.mock_nlp = MagicMock()  
        # mock receipt processor
        cls.processor = ReceiptProcessor(cls.mock_nlp) 

    def test_grayscale(self):
        """Test grayscale colour channel 255 -> 100"""
        # rainbow gradient image (100x100 three channels)
        mock_image = np.zeros((100, 100, 3), dtype=np.uint8)
        for i in range(100):
            for j in range(100):
                mock_image[i, j] = [i * 255 // 100, j * 255 // 100, (i + j) * 255 // 200]
        # gray scale
        gray_image = self.processor.grayscale(mock_image)
        # check if color channel has changed from 255 -> 100
        self.assertEqual(gray_image.shape, (100, 100))

    @patch("cv2.adaptiveThreshold")
    def test_adaptive_threshold(self, mock_adaptive_threshold):
        mock_adaptive_threshold.return_value = np.ones((100, 100), dtype=np.uint8) * 255
        mock_image = np.zeros((100, 100), dtype=np.uint8)
        result = self.processor.adaptive_threshold(mock_image)
        self.assertTrue((result == 255).all())

    @patch("cv2.morphologyEx")
    def test_noise_reduction(self, mock_morphologyEx):
        mock_morphologyEx.return_value = np.zeros((100, 100), dtype=np.uint8)
        mock_image = np.ones((100, 100), dtype=np.uint8) * 255
        result = self.processor.noise_reduction(mock_image)
        self.assertTrue((result == 0).all())

    @parameterized.expand([
        ("only_alpha", "DrinkName", "DrinkName"),
        ("alphanumeric", "Drink123!", "Drink123"),
        ("special_chars", "Dr@nk!!", "Drnk"),
        # ("spaces", "  Drink  ", "Drink"),
    ])
    def test_clean_text_alphanumeric(self, name, input_text, expected):
        result = self.processor.clean_text_alphanumeric(input_text)
        self.assertEqual(result, expected)

    def test_extract_drink_name_from_text(self):
        mock_doc = MagicMock()
        mock_doc.ents = [
            MagicMock(text="Matcha Latte", label_="drink_name"),
            MagicMock(text="Extra Sugar", label_="other"),
        ]
        self.processor.nlp_model.return_value = mock_doc
        extracted = self.processor.extract_drink_name_from_text("Matcha Latte Extra Sugar")
        self.assertEqual(len(extracted), 1)
        self.assertEqual(extracted[0]["entity"], "Matcha Latte")

if __name__ == "__main__":
    unittest.main()
