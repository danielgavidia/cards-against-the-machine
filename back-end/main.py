import google.generativeai as genai
import os
import re

genai.configure(api_key="AIzaSyAGty07lpzqAW8gM21DZG17_g1ppw0RlE8")

def generate_black_card():
  model = genai.GenerativeModel("gemini-1.5-flash")
  black = model.generate_content("given the game cards against humanity, generate 1 prompt").text
  return black

def generate_white_cards():
  model = genai.GenerativeModel("gemini-1.5-flash")
  white = model.generate_content("given the game cards against humanity, generate 6 new white cards in that style, max 3 words each card").text
  whiteCards = white.split("**")[1:]
  for card in whiteCards:
    card = re.sub(r'\d\.\s+', "", card)
  return whiteCards

