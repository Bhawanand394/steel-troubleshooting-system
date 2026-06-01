from flask import Flask, request, jsonify
from flask_cors import CORS
from openai import OpenAI
from dotenv import load_dotenv

import os

# Load environment variables

load_dotenv()

# Flask App

app = Flask(__name__)

CORS(app)

# OpenAI Client

client = OpenAI(
    api_key=os.getenv("OPENAI_API_KEY")
)

# AI Chat Route

@app.route("/chat", methods=["POST"])

def chat():

    data = request.json

    user_message = data.get("message")

    try:

        response = client.chat.completions.create(

            model="gpt-3.5-turbo",

            messages=[

                {
                    "role":"system",

                    "content":"""

                    You are SteelAI,
                    an advanced industrial troubleshooting assistant.

                    You help diagnose:

                    - compressors
                    - centrifugal pumps
                    - gearboxes
                    - CGL systems
                    - industrial machinery
                    - overheating
                    - leakage
                    - vibration
                    - pressure problems
                    - lubrication failure
                    - maintenance issues

                    Always provide:

                    1. probable causes
                    2. industrial remedies
                    3. maintenance suggestions
                    4. safety precautions

                    Give professional industrial answers.
                    """
                },

                {
                    "role":"user",

                    "content":user_message
                }

            ]

        )

        ai_reply = response.choices[0].message.content

        return jsonify({

            "reply": ai_reply

        })

    except Exception as e:

        return jsonify({

            "reply": str(e)

        })

# Run Flask Server

if __name__ == "__main__":

    app.run(debug=True)