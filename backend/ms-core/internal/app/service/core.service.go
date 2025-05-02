package service

import (
	"ms-core/internal/app/repository"
	"ms-core/utils"
)

type CoreService struct {
	repo *repository.CoreRepository
}


func NewCoreService(repo *repository.CoreRepository) *CoreService {
	return &CoreService{repo: repo}
}

func (s *CoreService) Trx(fn func() *utils.ErrorResponse) *utils.ErrorResponse {
	if err := s.repo.BeginTransaction(); err != nil {
		return utils.NewErrorResponse(utils.StatusInternalServer, "Error al iniciar transacción", err)
	}

	rollback := true
	defer func() {
		if rollback {
			_ = s.repo.RollbackTransaction()
		}
	}()

	errResp := fn()
	if errResp != nil {
		return errResp
	}

	if err := s.repo.CommitTransaction(); err != nil {
		return utils.NewErrorResponse(utils.StatusInternalServer, "Error al confirmar transacción", err)
	}

	rollback = false
	return nil
}

func (s *CoreService) TestService() *utils.ErrorResponse { return s.Trx(func() *utils.ErrorResponse {
	var valores []int
	if err := s.repo.TestRepository(&valores); err != nil {
		return utils.NewErrorResponse(utils.StatusInternalServer, "Error en el repositorio", err)
	}

	return nil

})}
