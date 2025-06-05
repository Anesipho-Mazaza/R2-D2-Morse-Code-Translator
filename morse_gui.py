# morse_gui.py

import tkinter as tk
from morse_translator import lettersToMorseCode, morseCodeToLetters

def translate_text():
    input_text = entry.get()
    if var.get() == "to_morse":
        result = lettersToMorseCode(input_text)
    else:
        result = morseCodeToLetters(input_text)
    output_label.config(text=result)

# UI setup
root = tk.Tk()
root.title("Morse Code Translator")

entry = tk.Entry(root, width=50)
entry.pack(pady=10)

var = tk.StringVar(value="to_morse")
tk.Radiobutton(root, text="Text to Morse", variable=var, value="to_morse").pack()
tk.Radiobutton(root, text="Morse to Text", variable=var, value="to_text").pack()

tk.Button(root, text="Translate", command=translate_text).pack(pady=10)
output_label = tk.Label(root, text="", wraplength=400)
output_label.pack(pady=10)

root.mainloop()
