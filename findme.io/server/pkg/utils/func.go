package utils

import (
	"strings"
)

func Includes[T comparable](list []T, item T) (bool, T, int) {
	if len(list) == 0 {
		return false, item, -1
	}
	for k, v := range list {
		if v == item {
			return true, item, k
		}
	}
	return false, item, -1
}

func HandleNilValues(val any, defaultVal any) any {
	if val == nil {
		return defaultVal
	}
	return val
}

func CheckIsValidContentType(needable string, list []string) bool {
	for _, v := range list {
		subStr := strings.Contains(v, needable)
		if subStr {
			return true
		}
	}
	return false
}

func GetFileExtensionFromFile(fileName string) string {
	splitted := strings.Split(fileName, ".")
	if len(splitted) < 2 {
		return ""
	}
	return splitted[1]
}
