package notifications

import (
	"context"
	"errors"
	"fmt"

	firebase "firebase.google.com/go"
	"firebase.google.com/go/messaging"
	"google.golang.org/api/option"
)

const appName = "APP_NAME"

var ctx = context.Background()

func CreateApplication() *messaging.Client {
	opts := []option.ClientOption{option.WithCredentialsFile("firebase/inspirationplatform-a3494-firebase-adminsdk-86sen-ca8df7f86a.json")}
	app, err := firebase.NewApp(ctx, nil, opts...)
	if err != nil {
		return nil
	}
	client, err := app.Messaging(ctx)
	if err != nil {
		fmt.Println(err, "ERRRR")
		return nil
	}
	return client
}

func CreateMessage(title, body, token string, data map[string]string) *messaging.Message {
	message := &messaging.Message{
		Data: data,
		Notification: &messaging.Notification{
			Title: title,
			Body:  body,
		},
		Token: token,
	}
	return message
}

func SendMessage(title, body, token string, data map[string]string) error {
	client := CreateApplication()
	if client == nil {
		return errors.New("error! sendmessage ex")
	}
	message := CreateMessage(title, body, token, data)
	client.Send(ctx, message)
	return nil
}
