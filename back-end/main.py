import google.generativeai as genai
import re

genai.configure(api_key="AIzaSyAGty07lpzqAW8gM21DZG17_g1ppw0RlE8")

# Paths to your white and black cards files
white_cards_file_path = 'back-end/white_cards.txt'
black_cards_file_path = 'back-end/black_cards.txt'

# Function to read the content of the white and black cards files
def read_cards(file_path):
    with open(file_path, 'r') as file:
        return file.read()

# Read the content of white and black cards
existing_white_cards = read_cards(white_cards_file_path)
existing_black_cards = read_cards(black_cards_file_path)


def generate_black_card():
    model = genai.GenerativeModel("gemini-1.5-flash")
    black = model.generate_content(
         f"Here are some existing black cards from the game Cards Against Humanity:\n"
        f"{existing_black_cards}\n\n"
        f"Given this, generate 1 new black card in a similar style."
    ).text
    blackParsed = black.split("**")
    text = blackParsed if len(blackParsed) <= 1 else blackParsed[1]

    return text


def generate_white_cards():
    model = genai.GenerativeModel("gemini-1.5-flash")
    white = model.generate_content(
        f"Here are some existing white cards from the game Cards Against Humanity:\n"
        f"{existing_white_cards}\n\n"
        f"Given this, generate 6 new white cards in a similar style, max 3 words each card."
    ).text
    whiteCards = white.split("**")[1:]
    for card in whiteCards:
        card = re.sub(r"\d\.\s+", "", card)
    return whiteCards

#-get 6 prompts. 
#how to recieve body 
#-out of these 6 prompts, return the funniest card 
#-store this into a 
#-give point to the person who the card came from  
#-keep track of points 



from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Update this to the origins you want to allow
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)


@app.get("/")
def read_root1():
    return {"Hello": "World"}


@app.get("/get_data_answers")
def read_root2():
    return {"Data": {"response1": "jdjkdajkfda", "response2": "adfjadfjadkjf"}}

@app.get("/get_black_card")
def read_root3():
    blackText = generate_black_card()
    return {"Data": {"BlackCard": blackText}}

@app.get("/get_white_cards")
def read_root4():
    whiteArray = generate_white_cards()
    count = len(whiteArray)
    cards = {}
    for i in range(count):
        cards[str(i)] = whiteArray[i]
    return {"Data": cards}

@app.get("/items/{item_id}")
def read_item(item_id: int, q: str = None):
    return {"item_id": item_id, "q": q}
