package service

import (
	"ms-core/internal/app/repository"
	"ms-core/utils"
)

type CoreService struct {
	coreRepo *repository.CoreRepository
}


func NewCoreService(userRepo *repository.CoreRepository) *CoreService {
	return &CoreService{coreRepo: userRepo}
}

func (s *CoreService) Trx(fn func() *utils.ErrorResponse) *utils.ErrorResponse {
	if err := s.coreRepo.BeginTransaction(); err != nil {
		return utils.NewErrorResponse(utils.StatusInternalServer, "Error al iniciar transacción", err)
	}

	rollback := true
	defer func() {
		if rollback {
			_ = s.coreRepo.RollbackTransaction()
		}
	}()

	errResp := fn()
	if errResp != nil {
		return errResp
	}

	if err := s.coreRepo.CommitTransaction(); err != nil {
		return utils.NewErrorResponse(utils.StatusInternalServer, "Error al confirmar transacción", err)
	}

	rollback = false
	return nil
}

func (s *CoreService) TestService() *utils.ErrorResponse { return s.Trx(func() *utils.ErrorResponse {
	var valores []int
	if err := s.coreRepo.TestRepository(&valores); err != nil {
		return utils.NewErrorResponse(utils.StatusInternalServer, "Error en el repositorio", err)
	}

	return nil

})}
