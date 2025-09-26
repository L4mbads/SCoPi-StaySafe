package handler

import (
	"SCoPi-backend/internal/model"
	"SCoPi-backend/internal/service"
	"net/http"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

type ContractRequestHandler struct {
	ContractRequestService service.ContractRequestService
}

func NewContractRequestHandler(db *gorm.DB) *ContractRequestHandler {
	return &ContractRequestHandler{
		ContractRequestService: *service.NewContractRequestService(db),
	}
}

func (crh *ContractRequestHandler) CreateContractRequest(c *gin.Context) {
	var input model.CreateContractRequest
	err := c.ShouldBindJSON(&input)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": err.Error(),
			"data":    nil,
		})
		return
	}

	userCtx, exists := c.Get("user")
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{
			"message": "Make sure you're logged in",
			"data":    nil,
		})
		return
	}

	user := userCtx.(model.User)

	cr, err := crh.ContractRequestService.CreateContractRequest(input, user.ID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"message": err.Error(),
			"data":    nil,
		})
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "Request created successfully",
		"data": gin.H{
			"Contract Type":   cr.ContractType,
			"Company Name":    cr.CompanyName,
			"Estimated Value": cr.EstimatedValue,
			"Start Date":      cr.StartDate,
			"End Date":        cr.EndDate,
			"Description":     cr.Description,
			"Priority":        cr.Priority,
			"Status":          cr.Status,
			"User ID":         user.ID,
			"User Name":       user.Name,
		},
	})
}

func (crh *ContractRequestHandler) GetAllContractRequests(c *gin.Context) {
	cr, err := crh.ContractRequestService.GetAllContractRequests()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"message": "Failed to fetch contract requests.",
			"data":    nil,
		})
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"message": "Get Request success",
		"data":    cr,
	})
}