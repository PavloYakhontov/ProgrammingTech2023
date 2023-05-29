package controllers

import (
	"app/services"
	"fmt"
	"net/http"
	"os"
	"pkg/fsystem"
	"pkg/utils"

	"github.com/gin-gonic/gin"
)

type FileController struct {
	*BaseController
	*services.FileService
}

func (file *FileController) GetName() string { return file.Name }
func (file *FileController) GetPath() string { return file.Path }

func (file *FileController) AddPhoto(ctx *gin.Context) {

	user, ok := ctx.Get("user")
	err := ctx.Request.ParseMultipartForm(0)
	if err != nil || !ok {
		ctx.JSON(http.StatusBadRequest, utils.GiveResponse(http.StatusBadRequest, "Bad Request_1"))
		return
	}

	formFile, fileHeader, err := ctx.Request.FormFile("image")
	if err != nil {
		ctx.JSON(http.StatusBadRequest, utils.GiveResponse(http.StatusBadRequest, "Bad Request_2"))
		return
	}

	castedFile, ok := formFile.(*os.File)
	contentType := fileHeader.Header["Content-Type"]
	isValid := utils.CheckIsValidContentType("image", contentType)
	if !ok || !isValid {
		ctx.JSON(http.StatusBadRequest, utils.GiveResponse(http.StatusBadRequest, "Bad Request_3"))
		return
	}

	defer castedFile.Close()

	uniqueFileName := file.FileService.GenerateUniqueFileName(user, fileHeader.Filename)
	err = fsystem.SendFileToBucket(castedFile, uniqueFileName)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, utils.GiveResponse(http.StatusBadRequest, "Bad Request_4"))
		return
	}
	
	ctx.JSON(http.StatusOK, utils.GiveOKResponseWithData(uniqueFileName))
}

func CreateFileController(basePath string) *FileController {
	return &FileController{
		&BaseController{
			"AuthController",
			fmt.Sprintf("%s/files", basePath),
		},
		&services.FileService{},
	}
}
