import pytesseract
from PIL import Image
import spacy
import re

pytesseract.pytesseract.tesseract_cmd = r"C:\Program Files\Tesseract-OCR\tesseract.exe"

custom_config = r'--oem 3 --psm 11'

nlp = spacy.load("./output/model-best")

# removes non-alphanumeric characters since they wouldn't appear in a drink name
def clean_text_alphanumeric(text):
    return re.sub(r"[^a-zA-Z0-9\s]", "", text)

# extract from picture path
def extract_drink_name_from_receipt(image_path, nlp_model):
    image = Image.open(image_path)
    extracted_text = pytesseract.image_to_string(image, config=custom_config)
    cleaned_text = clean_text_alphanumeric(extracted_text.replace('\n',' '))
    doc = nlp_model(cleaned_text)

    return [{"entity":ent.text, "label": ent.label_} for ent in doc.ents if ent.label_ in ["drink_name", "drink name"]]

# remove non-x,X
def manual_clean(entities):
    pattern = r'\b[1-9]?[xX]\b|[1-9]?[xX]\s'
    return [entity for entity in entities if re.search(pattern, entity['entity'])]


drink_names = extract_drink_name_from_receipt("./receipts/preprocessed/image_1.jpg_adaptive.png", nlp)
print(drink_names)