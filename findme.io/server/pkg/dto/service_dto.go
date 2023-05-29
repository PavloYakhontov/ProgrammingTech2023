package dto

import (
	"fmt"
	"pkg/utils"
	"reflect"
	"regexp"
	"sync"
)

/*
defaultValue: "",

	type: "STRING",
	required: true,
	min: 5,
	max: 20
*/

// dto_required: "yes" or "no"
// dto_min: "500" if string then length of string and number is count
// dto_max: "100" if string then length of string and number is count
// dto_default: "aboba" || "bool(true)" || "num(10)" || "obj({})"
// dto_anyType: "true" || "false"
// dto_name: "aboba" // for errors and etc.
// dto_remove: "true" || "false"
// dto_map_flat: "true" || "false"

type ErrorDto struct {
	FieldName string   `json:"field_name"`
	ErrorMsg  []string `json:"error_msg"`
}

// ErrorList STRING | INTEGER | BOOL | NULL | OBJECT

type ErrorList = []ErrorDto
type FieldsMapping map[string]*FieldDto

var dtoWg *sync.WaitGroup

type FieldDto struct {
	Type             string
	Required         bool
	Min              any
	Max              any
	DefaultValue     any
	RegexpValidation *regexp.Regexp
	AnyType          bool
	Name             string
	Remove           bool
	Aliases          []string
	Body             FieldsMapping
}

var MapTypes = map[string]string{
	"STRING":  "string",
	"INTEGER": "int",
	"OBJECT":  "map[string]interface {}",
	"NULL":    "null",
}

var __TestBody__ = map[string]any{
	"name":     "abobobob",
	"password": 4,
	"amongus": map[string]any{
		"one": "string",
	},
}

var __TestDto__ = FieldsMapping{
	"name": {
		Type:     "STRING",
		Required: true,
		Min:      5,
		Max:      7,
	},
	"password": {
		Type:     "INTEGER",
		Required: false,
		Min:      2,
		Max:      3,
	},
	"amongus": {
		Type: "OBJECT",
		Body: FieldsMapping{
			"one": {
				Type:     "STRING",
				Required: true,
				Max:      2,
			},
		},
	},
}

func addError(errs *ErrorList, key string, errorStringList ...string) {
	*errs = append(*errs, ErrorDto{
		FieldName: key,
		ErrorMsg:  errorStringList,
	})
}
func ValidateModelWithDto(body map[string]any, typeModel *FieldsMapping, errors *ErrorList) (map[string]any, *ErrorList) {
	for k, v := range *typeModel {

		fieldFromBody := body[k]
		isIncludesAliases, _, _ := utils.Includes(v.Aliases, k)
		if fieldFromBody == nil && !isIncludesAliases && v.Required {
			addError(errors, k, fmt.Sprintf("Field %s is required.", k))
			continue
		}
		if fieldFromBody == nil {
			continue
		}
		typeOfField := reflect.TypeOf(fieldFromBody).String()
		typeEqual := MapTypes[v.Type] == typeOfField

		if MapTypes[v.Type] != typeOfField {
			addError(errors, k, fmt.Sprintf("Type mismatch, expects %s but got %s", MapTypes[v.Type], typeOfField))
			continue
		}
		if v.Type == "STRING" && typeEqual {
			fieldAsString := fieldFromBody.(string)
			l := len(fieldAsString)
			if v.RegexpValidation != nil {
				if !v.RegexpValidation.MatchString(fieldAsString) {
					addError(errors, k, fmt.Sprintf("String '%s' is not valid", fieldAsString))
				}
			}
			if v.Min != nil && l < v.Min.(int) {
				addError(errors, k, fmt.Sprintf("String should expect min length %d but got less %d", v.Min.(int), l))
			}
			if v.Max != nil && l > v.Max.(int) {
				addError(errors, k, fmt.Sprintf("String should expect max length %d but got greater: %d", v.Max.(int), l))
			}
		}
		if v.Type == "INTEGER" && typeEqual {
			cField := fieldFromBody.(int)
			if v.Min != nil && cField < v.Min.(int) {
				addError(errors, k, fmt.Sprintf("Number should expect less than %d but got: %d", v.Min.(int), cField))
			}
			if v.Max != nil && cField > v.Max.(int) {
				addError(errors, k, fmt.Sprintf("Number should expect greater than %d but got: %d", v.Max.(int), cField))
			}
		}
		if v.Type == "OBJECT" && typeEqual && v.Body != nil {
			ValidateModelWithDto(fieldFromBody.(map[string]interface{}), &v.Body, errors)
		}
	}
	return body, errors
}
