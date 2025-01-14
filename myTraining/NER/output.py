import spacy
from spacy.tokens import DocBin
import json
import random
import re

def clean_text_alphanumeric(text):
    return re.sub(r"[^a-zA-Z0-9\s]", "", text)

def save_to_spacy_format(data, output_file):
    nlp = spacy.blank("en")
    doc_bin = DocBin()

    for text, annotations in data:
        doc = nlp.make_doc(text)
        ents = []
        for start, end, label in annotations["entities"]:
            span = doc.char_span(start, end, label=label, alignment_mode='expand')
            if span is not None:
                ents.append(span)
            else:
                print("Skipping\n")
        doc.ents = ents
        doc_bin.add(doc)

    doc_bin.to_disk(output_file)

with open("spacy_training_data.json", "r") as f:
    normalized_data = json.load(f)

random.shuffle(normalized_data)
split_idx = int(len(normalized_data) * 0.8)
train_data = normalized_data[:split_idx]
val_data = normalized_data[split_idx:]

save_to_spacy_format(train_data, "training_data.spacy")
save_to_spacy_format(val_data, "validation_data.spacy")
