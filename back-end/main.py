import google.generativeai as genai
import re

genai.configure(api_key="AIzaSyAGty07lpzqAW8gM21DZG17_g1ppw0RlE8")


def generate_black_card():
    model = genai.GenerativeModel("gemini-1.5-flash")
    black = model.generate_content(
        "given the game cards against humanity, generate 1 prompt"
    ).text
    blackParsed = black.split("**")
    text = blackParsed if len(blackParsed) <= 1 else blackParsed[1]

    return text


def generate_white_cards(text):
    model = genai.GenerativeModel("gemini-1.5-flash")
    white = model.generate_content(
        "given the game cards against humanity, generate 6 new white cards in that style, max 3 words each card, no BLANK"
    ).text
    whiteCards = white.split("**")
    cardDict ={}
    count =1
    for i in range(1,len(whiteCards),2):
        card = re.sub(r"\d\.\s+", "", whiteCards[i])
        cardDict[str(count)]=card
        count+=1
    return cardDict

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

@app.get("/get_white_cards/adult")
def read_root4():
    text = "given the game cards against humanity, generate 6 new white cards in that style, max 3 words each card, complete statements only"

    return {"Data": generate_white_cards(text)}

@app.get("/get_white_cards/kids")
def read_root4():
    text = "given the game cards against humanity, generate 6 new white cards in that style, max 3 words each card, complete statements only, kids friendly"
    return {"Data": generate_white_cards(text)}

@app.get("/items/{item_id}")
def read_item(item_id: int, q: str = None):
    return {"item_id": item_id, "q": q}
