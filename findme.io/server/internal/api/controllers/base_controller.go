package controllers

type IBaseController interface {
	GetName() string
	GetPath() string
}

type BaseController struct {
	Name string
	Path string
}
