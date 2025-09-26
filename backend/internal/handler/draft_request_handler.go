package handler

import (
	"SCoPi-backend/internal/service"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

type DraftRequestHandler struct {
	drs service.DraftRequestService
	cs  service.ContractService
	crs service.ContractRequestService
}

func NewDraftRequestHandler(db *gorm.DB) *DraftRequestHandler {
	return &DraftRequestHandler{
		drs: *service.NewDraftRequestService(db),
		cs:  *service.NewContractService(db),
		crs: *service.NewContractRequestService(db),
	}
}

func (drh *DraftRequestHandler) GenerateDraftFromContractRequest(c *gin.Context) {
	idParam := c.Param("id")
	id, err := strconv.ParseUint(idParam, 10, 64)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": "Invalid Contract Request ID",
			"data":    nil,
		})
		return
	}

	cr, err := drh.crs.GetContractRequestByID(uint(id))
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{
			"message": err.Error(),
			"data":    nil,
		})
		return
	}

	err = drh.drs.GenerateDraftFromContractRequest(*cr)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"message": err.Error(),
			"data":    nil,
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{})
}
