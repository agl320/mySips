import json

def convert_to_spacy_format(label_studio_json):
    spacy_data = []

    for item in label_studio_json:
        annotations = item['annotations'][0]['result']  # get annotation results

        for annotation in annotations:
            if annotation['type'] == 'textarea':  # extract text transcription
                transcription_text = annotation['value']['text'][0]  # get transcribed text
                
                # collect entities for the transcription
                entities = []
                for label_annotation in annotations:
                    if label_annotation['type'] == 'labels' and label_annotation['id'] == annotation['id']:
                        label = label_annotation['value']['labels'][0]  # Get the label
                        entities.append((0, len(transcription_text), label))  # Entire transcription is the entity

                spacy_data.append((transcription_text, {"entities": entities}))

    return spacy_data

with open("project-1-at-2025-01-10-17-56-f9b1f234.json", "r") as f:
    data = json.load(f)

spacy_training_data = convert_to_spacy_format(data)

unique_data = list({json.dumps(entry): entry for entry in spacy_training_data}.values())

normalized_data = []
for text, entity_dict in unique_data:
    normalized_text = " ".join(text.split())  # Normalize spacing
    normalized_data.append((normalized_text, entity_dict))

with open("spacy_training_data.json", "w") as f:
    json.dump(normalized_data, f, indent=2)

print("Converted data to spaCy format.")
