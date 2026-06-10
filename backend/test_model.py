from google import genai

client = genai.Client(api_key="AIzaSyDjV9AqEIFqe3p-I-y4R30SSmUfqRrQcAg")

models = client.models.list()

for m in models:
    print(m.name)