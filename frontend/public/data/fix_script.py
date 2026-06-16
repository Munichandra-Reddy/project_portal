import re

file_path = r"d:\Geonixa Platform\frontend\public\data\generate_complete_java_source.py"

with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

# Fix invalid escape sequence in docstring
if content.startswith('"""'):
    content = 'r' + content

# Fix {@link {e}} to {{@link {e}}}
content = content.replace("{@link {e}}", "{{@link {e}}}")
content = content.replace("{@link {d[\"domain\"]}Service}", "{{@link {d[\"domain\"]}Service}}")
content = content.replace("{@link {d[\"domain\"]}}", "{{@link {d[\"domain\"]}}}")

with open(file_path, "w", encoding="utf-8") as f:
    f.write(content)

print("Fixed generate_complete_java_source.py")
