import re

file_path = r"d:\Geonixa Platform\frontend\public\data\generate_complete_java_source.py"

with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

# Replace any {@link ...} with {{@link ...}} if not already double braced
content = re.sub(r'(?<!\{)\{@link([^}]+)\}(?!\})', r'{{@link\1}}', content)

with open(file_path, "w", encoding="utf-8") as f:
    f.write(content)

print("Fixed all {@link ...}")
