# beep_utils.py

import os
import platform

def beep():
    """Play a beep sound depending on the platform."""
    if platform.system() == 'Windows':
        import winsound
        winsound.Beep(1000, 150)
    else:
        os.system('printf "\a"')  # May not work on all Unix terminals
