
import time
import json
import os

lyrics = []

with open('scratch') as fh:
    contents = fh.read()
    lines = contents.split("\n")

lyric_offset = 0
time_offset = 0
if os.path.exists('lyrics.json'):
    with open('lyrics.json') as fh:
        saved = json.loads(fh.read())

    for i, val in enumerate(saved):
        lyrics.append(val)
        lyric_offset += 1
        if val['newline']:
            lyric_offset += 1

    time_offset = lyrics[-1]['offset']

print([lyric['value'] for lyric in lyrics])
input("Start?")

for i in range(3):
    print(3 - i)
    time.sleep(1)

start = time.time() - time_offset
is_newline = False
lineno = 0

for i, word in enumerate(lines[lyric_offset:]):
    if word.strip() == '':
        is_newline = True
        lineno += 1
        continue

    try:
        entered = input(f"[{word}] @ : -->")
    except KeyboardInterrupt:
        break

    pressed_at = time.time()
    offset = pressed_at - start
    print(f"  at: {offset}")

    lyrics.append({
        "value": word,
        "offset": offset,
        "newline": is_newline,
        "style": {},
    })
    is_newline = False

with open('lyrics.json', 'w') as fh:
    fh.write(json.dumps(lyrics))
