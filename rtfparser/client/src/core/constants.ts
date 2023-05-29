// SERVER
export const BASE_URI = 'http://127.0.0.1:8000';
export const UPLOAD_URI = BASE_URI + '/upload/';
export const AUTHORIZE_PATH = BASE_URI + '/users/login/'
export const REGISTER_PATH = BASE_URI + '/users/'

// FILE FORMATS

export enum FileFormats {
  RTF = ".rtf",
  HTML = ".html",
  MD = ".md",
  DOCX = ".docx",
  TXT = ".txt",
  PDF = ".pdf",
  JSON = ".json",
  PPTX = ".pptx",
  MAN = ".man",

}
