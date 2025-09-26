package ai

import (
	"context"
	"log"
	"os"

	"google.golang.org/genai"
)

type AIClient struct {
	Client *genai.Client
}

var Client *AIClient

func ConnectAI() error {
	ctx := context.Background()

	apiKey := os.Getenv("GEMINI_API_KEY")
	if apiKey == "" {
		log.Fatal("GEMINI_API_KEY is not set in environment variables")
	}

	client, err := genai.NewClient(ctx, nil)
	if err != nil {
		return err
	}

	Client = &AIClient{Client: client}
	return nil

}

func (c *AIClient) GenerateContent(ctx context.Context, model string, prompt string) (string, error) {
	thinkingBudgetVal := int32(512)
	resp, err := c.Client.Models.GenerateContent(ctx, model, genai.Text(prompt), &genai.GenerateContentConfig{
		ThinkingConfig: &genai.ThinkingConfig{
			ThinkingBudget: &thinkingBudgetVal,
		},
	})
	if err != nil {
		return "", err
	}
	return resp.Text(), nil
}
