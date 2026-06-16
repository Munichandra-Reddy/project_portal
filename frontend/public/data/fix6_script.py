import re

file_path = r"d:\Geonixa Platform\frontend\public\data\generate_complete_java_source.py"

with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

# Fix gen_readme call
content = content.replace("gen_readme(title, desc, stack)", "gen_readme(title, d, stack)")

with open(file_path, "w", encoding="utf-8") as f:
    f.write(content)

print("Fixed gen_readme call")
