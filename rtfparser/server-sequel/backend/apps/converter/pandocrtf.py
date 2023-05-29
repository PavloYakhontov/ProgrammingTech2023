from .base.abstract_converter import FileConverter
import subprocess


class PandocConvert(FileConverter):
    async def convert(from_path, to_path):
        subprocess.run(['pandoc', '-s', from_path, '-o', to_path])
