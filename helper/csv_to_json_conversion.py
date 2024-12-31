import pandas as pd
import os
import json

files_in_directory = ["./data/" +
                      f for f in os.listdir("./data") if ".csv" in f]


def converter(df):
    df.set_index(df.columns[0], inplace=True)

    final_json = {col: {idx: int(df.loc[idx, col])
                        for idx in df.index} for col in df.columns}

    return final_json


for f in files_in_directory:
    print(f)
    df = pd.read_csv(f)
    output_json = converter(df)

    file_path = f.replace("csv", "json")

    with open(file_path, "w") as json_file:
        json.dump(output_json, json_file, indent=4)
