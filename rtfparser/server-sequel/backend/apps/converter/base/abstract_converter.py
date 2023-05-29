from abc import ABC, abstractstaticmethod

class FileConverter(ABC):

  @abstractstaticmethod
  def convert():
    pass