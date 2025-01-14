import json

def convert_to_spacy_format(label_studio_json):
    spacy_data = []

    for item in label_studio_json:
        annotations = item['annotations'][0]['result']  # Get annotation results

        for annotation in annotations:
            if annotation['type'] == 'textarea':  # Extract text transcription
                transcription_text = annotation['value']['text'][0]  # Get transcribed text
                
                # Collect entities for the transcription
                entities = []
                for label_annotation in annotations:
                    if label_annotation['type'] == 'labels' and label_annotation['id'] == annotation['id']:
                        label = label_annotation['value']['labels'][0]  # Get the label
                        entities.append((0, len(transcription_text), label))  # Entire transcription is the entity

                spacy_data.append((transcription_text, {"entities": entities}))

    return spacy_data

# Load Label Studio JSON file
with open("project-1-at-2025-01-10-17-56-f9b1f234.json", "r") as f:
    label_studio_data = json.load(f)

# Convert data to spaCy format
spacy_training_data = convert_to_spacy_format(label_studio_data)

unique_data = list({json.dumps(entry): entry for entry in spacy_training_data}.values())

normalized_data = []
for text, entity_dict in unique_data:
    normalized_text = " ".join(text.split())  # Normalize spacing
    normalized_data.append((normalized_text, entity_dict))

# Save the converted data
with open("spacy_training_data.json", "w") as f:
    json.dump(normalized_data, f, indent=2)

print("Converted data to spaCy format.")
