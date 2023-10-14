package models

import "time"

type Message struct {
    Id uint64 `json:"id"`
    Title string `json:"title"`
    Message string `json:"message"`
    Timestamp time.Time `json:"timestamp"`
}

type MessageStorage struct {
    Messages []Message `json:"messages"`
}
