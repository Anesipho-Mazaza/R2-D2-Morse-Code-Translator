"""
Unit tests for morse_translator.py
"""
import unittest
from morse_translator import lettersToMorseCode, morseCodeToLetters

class TestMorseTranslator(unittest.TestCase):
    def test_letters_to_morse(self):
        self.assertEqual(
            lettersToMorseCode("Help me Obi-Wan!"),
            ".... . .-.. .--. / -- . / --- -... .. -....- .-- .- -. -.-.--"
        )
        self.assertEqual(
            lettersToMorseCode("I like you"),
            ".. / .-.. .. -.- . / -.-- --- ..-"
        )
        self.assertEqual(
            lettersToMorseCode("Darth Vader is Luke’s father"),
            "-.. .- .-. - .... / ...- .- -.. . .-. / .. ... / .-.. ..- -.- . .----. ... / ..-. .- - .... . .-."
        )
        self.assertEqual(lettersToMorseCode(""), "")

    def test_morse_to_letters(self):
        self.assertEqual(
            morseCodeToLetters(".... .- ...- . / -.-- --- ..- / ... . . -. / .-. --- -... --- -.. ..- ..--.."),
            "HAVE YOU SEEN ROBODU?"
        )
        self.assertEqual(
            morseCodeToLetters(".. / .- -- / .-. ..- -. -. .. -. --. / --- ..- - / --- ..-. / -.-. --- ..-. ..-. . . .-.-.-"),
            "I AM RUNNING OUT OF COFFEE."
        )
        self.assertEqual(morseCodeToLetters(""), "")

    def test_unknown_characters(self):
        # Unknown characters are ignored
        self.assertEqual(lettersToMorseCode("abc#def"), ".- -... -.-. -.. . ..-.")
        self.assertEqual(morseCodeToLetters(".- -... -.-. # -.. . ..- .-.."), "ABCDEUL")

if __name__ == "__main__":
    unittest.main()
