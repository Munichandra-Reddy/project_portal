import re

file_path = r"d:\Geonixa Platform\frontend\public\data\generate_complete_java_source.py"

with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

# Remove all variations of {@link ...} and replace with plain text to avoid f-string syntax errors entirely
content = re.sub(r'\{+@link\s+[^}]+\}+', r'Reference', content)

with open(file_path, "w", encoding="utf-8") as f:
    f.write(content)

print("Removed all @link to fix f-string syntax errors")
