import openai
from dotenv import load_dotenv
import os

load_dotenv()


openai.api_key = os.getenv("X_OPENAI_API_KEY")


def generate_p_tag(text_descriptor):
    return f"<p>{text_descriptor}</p>"

def get_instructor(text_descriptor):
    potential_instructor = text_descriptor.split(" ")[0]
    print("potential_instructor")
    print(potential_instructor)
    if potential_instructor[0] == '#':
        return potential_instructor.strip().replace(":", "")
    else:
        return None
    
def generate_img_tag(text_descriptor):

    print(f"text descriptor: {text_descriptor}")

    response = openai.Image.create(
        prompt=text_descriptor,
        n=1,
        size="256x256"
        )
    
    image_url = response['data'][0]['url']
    print(image_url)

    return f"<img src='{image_url}'>"

