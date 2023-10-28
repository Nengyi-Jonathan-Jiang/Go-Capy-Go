import os

def readFile(filename: str):
    res = None
    with open(filename, 'r') as file:
        res = str(file.read())
    if res is None:
        raise FileNotFoundError(f'Could not read file "{filename}"')
    return res

with open('./src/levels/levels.min.js', 'w') as out:
    levels = []
    for module in os.listdir('./src/levels/data/'):
        level = readFile(f'./src/levels/data/{module}')
        levels.append(level)

    newline = "\n"

    code = f'const levels = [{newline}{f",{newline}".join(levels)}{newline}]'
    print(code)
    out.write(code)