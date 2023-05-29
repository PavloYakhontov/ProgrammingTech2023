import os
import io
import zipfile
import shutil
import stat
from constants import USR_FOLDER
from typing import Coroutine, List
from fastapi import UploadFile
import aiofiles


class UploadService:

    def __init__(self, folder_name: str, files: List[UploadFile]) -> None:
        self.folder_name = folder_name
        self.files = files

    async def zip_files(self, file_paths: List[str]) -> io.BytesIO:
        zip_io = io.BytesIO()
        with zipfile.ZipFile(zip_io, mode='w', compression=zipfile.ZIP_DEFLATED) as temp_zip:
            for fpath in file_paths:
                fdir, fname = os.path.split(fpath)
                zip_path = os.path.join("deploy", fname)
                temp_zip.write(fpath, zip_path)
        return zip_io

    async def create_user_folder(self):
        path = os.path.join(USR_FOLDER, self.folder_name)
        os.mkdir(path)
        os.chmod(path, stat.S_IWRITE)
        return path

    async def destroy_user_folder(self) -> None:
        shutil.rmtree(os.path.join(
            USR_FOLDER, self.folder_name), ignore_errors=False)

    async def upload_file(self, file: UploadFile, out_file_path: str):
        file_path = os.path.join(out_file_path, file.filename)
        async with aiofiles.open(file_path, 'wb') as out_file:
            content = await file.read()
            await out_file.write(content)
        return out_file_path
    async def rename_file(self, file: UploadFile, name: str):
        pass
