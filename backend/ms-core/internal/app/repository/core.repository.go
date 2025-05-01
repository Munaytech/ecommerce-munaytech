package repository

import (
	"database/sql"
	"errors"
	"fmt"
	"ms-core/utils"

	"github.com/jmoiron/sqlx"
)

type CoreRepository struct {
	Db *sqlx.DB
	Tx *sqlx.Tx
}

func NewCoreRepository(db *sqlx.DB) *CoreRepository {
	return &CoreRepository{Db: db}
}

func (r *CoreRepository) TestRepository(rows *[]int) error {
	err := r.Tx.Select(rows, `SELECT 1`)

	return utils.WrapError(IgnoreNoRows(err))
	// return utils.WrapError(err)
}


func IgnoreNoRows(err error) error {
	if err == nil || errors.Is(err, sql.ErrNoRows) {
		return nil
	}
	return err
}

func (r *CoreRepository) BeginTransaction() error {
	tx, err := r.Db.Beginx()
	if err != nil {
		return err
	}
	r.Tx = tx
	return nil
}

func (r *CoreRepository) CommitTransaction() error {
	if r.Tx == nil {
		return errors.New("no hay transacción activa")
	}
	err := r.Tx.Commit()
	r.Tx = nil // Siempre liberar la transacción
	return err
}

func (r *CoreRepository) RollbackTransaction() error {
	if r.Tx == nil {
		// Si no hay transacción activa, simplemente no hay rollback que hacer
		return nil
	}
	err := r.Tx.Rollback()
	r.Tx = nil // Siempre liberar aunque falle el rollback
	if err != nil && err != sql.ErrTxDone {
		return fmt.Errorf("error al hacer rollback: %w", err)
	}
	return nil
}
