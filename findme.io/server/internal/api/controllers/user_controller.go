package controllers

import (
	"fmt"
	"github.com/gin-gonic/gin"
)

type UserController struct {
	*BaseController
}

func (user *UserController) GetName() string { return user.Name }
func (user *UserController) GetPath() string { return user.Path }

func (user *UserController) SetupFields(ctx *gin.Context) {
	//data, ok := ctx.Get("body")
	//if !ok {
	//	ctx.JSON(http.StatusBadRequest, utils.GiveResponse(http.StatusBadRequest, "Bad Request!"))
	//	return
	//}
	//fmt.Println(data)
	//validatedData, errors := dto.ValidateModelWithDto(data.(map[string]any), ApplicationDto.LoginDto, &dto.ErrorList{})
}

func (user *UserController) AttachPhotos(ctx *gin.Context) {
		
}

func CreateUserController(basePath string) *UserController {
	return &UserController{
		&BaseController{
			"UserController",
			fmt.Sprintf("%s/users", basePath),
		},
	}
}
