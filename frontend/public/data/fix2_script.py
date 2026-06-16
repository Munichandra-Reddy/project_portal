import re

file_path = r"d:\Geonixa Platform\frontend\public\data\generate_complete_java_source.py"

with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

# Replace {@link anything} with {{@link anything}} but preserve the f-string variable inside if it's already properly formatted or just use a regex.
# Actually, the file has literal '{' and '}' in Java code that are not evaluated in f-string?
# WAIT! ALL literal braces in an f-string MUST be doubled in Python!
# Oh boy, generating Java code using Python f-strings without doubling all the { and } is a nightmare.
# Are they using triple-quoted f-strings? Yes: return f'''...'''
# But the script author might have missed some { and } escaping?
# Let's check how the script generated the Java code. If the author missed escaping ALL {} for java blocks, the whole file would be failing.
# Wait, look at line 143: public class Main {{ ... }} -> they escaped it by doubling!
# Line 120: public static void main(String[] args) {{ ... }}
# So they DID escape the Java braces.
# It seems they only missed {@link ResultSet} and {@link ...}.
# Let's find all unescaped {@link ...}.

# The problem is `{@link ResultSet}` -> `{{@link ResultSet}}`
content = content.replace("{@link ResultSet}", "{{@link ResultSet}}")
# Let's also check for {@link {e}} which was changed to {{@link {e}}}
# If the previous fix changed {@link {e}} to {{@link {e}}}, it's still missing the closing brace for the link. It should be {{@link {e}}}
content = content.replace("{{@link {e}}}", "{{@link {e}}}") # Wait, {{@link {e}}} evaluates to {@link Patient} but missing closing }
# If we want `{@link Patient}`, we need `{{@link {e}}}` -> `{@link Patient}`. Wait! `{{` produces `{`. `}}` produces `}`.
# So `{{@link {e}}}` evaluates to `{@link Patient}`.
# Wait, what was the error? `/** Maps a {@link ResultSet} row to a {{@link {e}}} instance. */`
# Error was on line 487: SyntaxError: f-string: expecting a valid expression after '{'
# Why? Because of `{@link ResultSet}` which starts with `{` and Python expects a valid expression like `@link ResultSet`, which is invalid Python.
# We just need to change `{@link ResultSet}` to `{{@link ResultSet}}`.

with open(file_path, "w", encoding="utf-8") as f:
    f.write(content)

print("Fixed {@link ResultSet}")
