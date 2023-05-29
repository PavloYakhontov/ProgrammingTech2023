import os
from fastapi import UploadFile
from typing import List


def get_file_names_with_formats(files: List[UploadFile], to_format: str) -> list[list[str]]:
    return [[file.filename, f"{file.filename.split('.')[0]}{to_format}"] for file in files]


def get_file_paths_with_formats(files: List[UploadFile], to_format: str, usr_path: str) -> list[list[str]]:
    return [[os.path.join(usr_path, file.filename), os.path.join(usr_path, 
                    f"{file.filename.split('.')[0] + '_c'}{to_format}")] for file in files]
