package handler

import (
	"SCoPi-backend/internal/model"
	"SCoPi-backend/internal/service"
	"errors"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

type ContractHandler struct {
	ContractService service.ContractService
}

func NewContractHandler(db *gorm.DB) *ContractHandler {
	return &ContractHandler{
		ContractService: *service.NewContractService(db),
	}
}

func (h *ContractHandler) CreateContract(c *gin.Context) {
	var contract model.Contract
	if err := c.ShouldBindJSON(&contract); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request data: " + err.Error()})
		return
	}

	createdContract, err := h.ContractService.CreateContract(&contract)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create contract: " + err.Error()})
		return
	}

	c.JSON(http.StatusCreated, createdContract)
}

func (h *ContractHandler) GetAllContracts(c *gin.Context) {
	contracts, err := h.ContractService.GetAllContracts()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to retrieve contracts: " + err.Error()})
		return
	}
	c.JSON(http.StatusOK, contracts)
}

func (h *ContractHandler) GetContractByID(c *gin.Context) {
	id, err := strconv.ParseUint(c.Param("id"), 10, 32)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid contract ID"})
		return
	}

	contract, err := h.ContractService.GetContractByID(uint(id))
	if err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			c.JSON(http.StatusNotFound, gin.H{"error": "Contract not found"})
			return
		}
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to retrieve contract: " + err.Error()})
		return
	}

	c.JSON(http.StatusOK, contract)
}

func (h *ContractHandler) UpdateContract(c *gin.Context) {
	id, err := strconv.ParseUint(c.Param("id"), 10, 32)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid contract ID"})
		return
	}

	var contractData model.Contract
	if err := c.ShouldBindJSON(&contractData); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request data: " + err.Error()})
		return
	}

	updatedContract, err := h.ContractService.UpdateContract(uint(id), &contractData)
	if err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			c.JSON(http.StatusNotFound, gin.H{"error": "Contract not found"})
			return
		}
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update contract: " + err.Error()})
		return
	}

	c.JSON(http.StatusOK, updatedContract)
}

func (h *ContractHandler) DeleteContract(c *gin.Context) {
	id, err := strconv.ParseUint(c.Param("id"), 10, 32)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid contract ID"})
		return
	}

	err = h.ContractService.DeleteContract(uint(id))
	if err != nil {
		// Note: GORM's delete doesn't return ErrRecordNotFound, it just does nothing.
		// A check in the service layer would be needed for a 404 response here.
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete contract: " + err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Contract deleted successfully"})
}
