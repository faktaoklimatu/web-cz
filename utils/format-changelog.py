#!/usr/bin/env python3

import shlex
import subprocess
import sys

MARKER = "c1910ae4-cc7c-464b-a34f-da553f253526"

if __name__ == "__main__":
    output = subprocess.check_output([ "git", "log", "--pretty=format:%cs %aN%n%s%n%b" + MARKER, "--" ] + sys.argv[1:])
    lines = output.decode("utf-8").splitlines()

    i = 0
    entries = []
    while i < len(lines):
        head = lines[i].split(" ", 1)
        entry = {
            "date": head[0],
            "author": head[1],
            "description": [],
        }
        entries.append(entry)

        i += 1
        while i < len(lines) and lines[i] != MARKER:
            entry["description"].append(lines[i])
            i += 1
        i += 1

    print("changelog:")
    for e in entries:
        print(
"""  - date: "{date}"
    description: """.format(**e), end='')
        if len(e["description"]) <= 1:
            print('"%s"' % e["description"][0])
        else:
            desc = "\n".join([ "      " + l for l in e["description"] ])
            print("|\n" + desc)



