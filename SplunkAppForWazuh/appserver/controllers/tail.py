""" This is an efficient version, since it does not read the entire
file
"""
import sys
import os


class tail():
    def __init__(self, lines, file_name):
        self.lines = int(lines)
        self.fname = file_name
        self.fsize = os.stat(self.fname).st_size
        self.bufsize = 8192

    def make_tail(self):
        try:
            iter = 0
            lines = []
            with open(self.fname) as f:
                if self.bufsize > self.fsize:
                    self.bufsize = self.fsize-1
                data = []
                while True:
                    iter += 1
                    f.seek(self.fsize-self.bufsize*iter)
                    data.extend(f.readlines())
                    if len(data) >= self.lines or f.tell() == 0:
                        lines.append(''.join(data[-self.lines:]))
                        break
        except Exception as e:
            raise e
        return lines
