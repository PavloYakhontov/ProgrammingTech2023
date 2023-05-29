import os

ROOT_DIR = os.path.dirname(os.path.abspath(__file__))
USR_FOLDER = os.path.join(ROOT_DIR, "bin")

if not os.path.exists(USR_FOLDER):
    os.makedirs(USR_FOLDER)