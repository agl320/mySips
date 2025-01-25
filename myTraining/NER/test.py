# import spacy

# nlp = spacy.load("./output/model-best") 

# text = "1X L Trop Special"
# doc = nlp(text)

# for ent in doc.ents:
#     print(f"Entity: {ent.text}, Label: {ent.label_}")
from fuzzywuzzy import fuzz
from fuzzywuzzy import process

print(fuzz.partial_ratio("1X fresh strby", "fresh strawberry"))