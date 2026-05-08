import pandas as pd

# Load CSV
df = pd.read_csv("dataset/final_cleaned_data.csv")

# Convert to JSON
df.to_json(
    "frontend/data.json",
    orient="records",
    indent=4
)

print("JSON file created successfully!")