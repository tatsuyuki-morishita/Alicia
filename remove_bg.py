from PIL import Image
import os

def remove_white_bg(image_path):
    try:
        img = Image.open(image_path).convert("RGBA")
        datas = img.getdata()

        new_data = []
        for item in datas:
            # Change all white (also shades of whites)
            # to transparent
            if item[0] > 240 and item[1] > 240 and item[2] > 240:
                new_data.append((255, 255, 255, 0))
            else:
                new_data.append(item)

        img.putdata(new_data)
        img.save(image_path, "PNG")
        print(f"Processed {image_path}")
    except Exception as e:
        print(f"Error processing {image_path}: {e}")

directory = "/Users/morishitatatsuyuki/Downloads/welcome_2"
files = [f for f in os.listdir(directory) if f.startswith("char") and f.endswith(".png")]

for file in files:
    remove_white_bg(os.path.join(directory, file))
