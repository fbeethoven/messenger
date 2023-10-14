package main

import (
    "fmt"
    "log"
     "os"
     "time"
     "net/http"
     "encoding/json"

    "github.com/gin-contrib/cors"
    "github.com/gin-gonic/gin"

    "github.com/fbeethoven/messenger/messenger-backend/models"
)

const storagePath = "messages-storage.json"
var lastMessageId uint64
var messages models.MessageStorage

func main() {

    err := initMessageStorage()

    if err != nil {
        log.Println(err)
        return 
    }

    router := gin.Default()
    
    router.Use(cors.Default())

    router.GET("/messages", getMessages)
    router.POST("/message", postMessage)

    router.Run("localhost:8080")
}

func getMessages(c *gin.Context) {
    c.IndentedJSON(http.StatusOK, messages.Messages)
}

func initMessageStorage() error {
	messagesData, err := os.ReadFile(storagePath)

    if err != nil {
        return fmt.Errorf("could not read file: %v", err)
    }

    err = json.Unmarshal([]byte(messagesData), &messages)

    if err != nil {
        return fmt.Errorf("could not parse json: %v", err)
    }

    lastMessageId = 0
    for _, message := range messages.Messages {
        if message.Id > lastMessageId {
            lastMessageId = message.Id
        }
    }

    return nil
}

func postMessage(c *gin.Context) {
    var newMessage models.Message

    err := c.BindJSON(&newMessage)

    if err != nil {
        return
    }

    newMessage, err = addMessage(newMessage)
    if err != nil {
        return
    }

    c.IndentedJSON(http.StatusCreated, newMessage)
}

func addMessage(message models.Message) (models.Message, error) {
    lastMessageId++
    message.Id = lastMessageId
    message.Timestamp = time.Now()

    messages.Messages = append(messages.Messages, message)

    messagesJson, err := json.MarshalIndent(messages, "", "  ") 

    if err != nil {
        return message, err
    }

    err = os.WriteFile(storagePath, messagesJson, 0644)

    if err != nil {
        return message, err
    }

    return message, nil
}
