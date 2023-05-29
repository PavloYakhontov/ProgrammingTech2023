package services

import "pkg/utils"

type FileService struct {
	*BaseService
	*CryptoService
}

func (file *FileService) GetService() any {
	return file
}

func (file *FileService) GenerateUniqueFileName(user any, serverFileName string) string {
	user_hash := user.(map[string]any)["user_hash"].(string)
	generatedHash := file.CryptoService.GenerateUniqueSha([]string{user_hash, serverFileName})
	extension := utils.GetFileExtensionFromFile(serverFileName)
	return generatedHash + "." + extension
}
