
from fastapi import UploadFile
from typing import List
from .upload_service import UploadService
from ..pandocrtf import PandocConvert

# region convertors imports
# endregion

from ..base.abstract_converter import FileConverter
from helpers import get_file_paths_with_formats

CONVERTORS = {
    '.rtf': {
        '.html': PandocConvert,
        '.md': PandocConvert,
        '.docx': PandocConvert,
        '.txt': PandocConvert,
        '.json': PandocConvert,
        '.pptx': PandocConvert,
        '.man': PandocConvert
    }
}


class ConverterService:

    def __init__(self, files: List[UploadFile], folder_name: str, from_format: str, to_format: str) -> None:
        self.files = files
        self.folder_name = folder_name
        self.from_format = from_format
        self.to_format = to_format

        self.upload_service = UploadService(folder_name, files)

    def resolve_convertor(self) -> FileConverter:
        return CONVERTORS[self.from_format][self.to_format]

    async def convert(self):
        converted_filepaths: List[str] = []
        usr_path = await self.upload_service.create_user_folder()
        file_paths = get_file_paths_with_formats(
            self.files, self.to_format, usr_path)
        file_convertor = self.resolve_convertor()
        for file in self.files:
            await self.upload_service.upload_file(file, usr_path)

        for file_path in file_paths:
            await file_convertor.convert(file_path[0], file_path[1])
            converted_filepaths.append(file_path[1])

        zipped_files = await self.upload_service.zip_files(converted_filepaths)
        await self.upload_service.destroy_user_folder()
        return zipped_files
