import re

file_path = r"d:\Geonixa Platform\frontend\public\data\generate_complete_java_source.py"

with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

# Replace any stray unmatched `}}}` or `}}` after Reference
content = re.sub(r'Reference\w*\}\}+\}*', r'Reference', content)

# Just to be safe, find any remaining `}}}` and see if they are part of valid Java code. Valid Java code uses `}}` for double brace, but `}}}` could be a triple brace if someone did `}} }`.
# Actually the error is: `* Unit tests for ReferenceService}}}.`
content = content.replace("ReferenceService}}}", "ReferenceService")
content = content.replace("Reference}}}", "Reference")
content = content.replace("Reference}}", "Reference")

with open(file_path, "w", encoding="utf-8") as f:
    f.write(content)

print("Fixed stray braces")
