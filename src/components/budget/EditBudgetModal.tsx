import React, { useState, useEffect } from 'react';
import { Budget } from '../../types/budget';
import Decimal from 'decimal.js';

interface Props {
  budget: Budget;
  setShowModal: (show: boolean) => void;
  updateBudget: (updatedBudget: Budget) => void;
}

export const EditBudgetModal: React.FC<Props> = ({ budget, setShowModal, updateBudget }) => {
  const [name, setName] = useState(budget.name);
  const [description, setDescription] = useState(budget.description);
  const [limit, setLimit] = useState(budget.limit?.toString() || '');
  const [error, setError] = useState('');

  useEffect(() => {
    setName(budget.name);
    setDescription(budget.description);
    setLimit(budget.limit?.toString() || '');
  }, [budget]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Name is required');
      return;
    }
    const updatedBudget: Budget = {
      ...budget,
      name: name.trim(),
      description: description.trim(),
      limit: limit ? new Decimal(limit) : undefined,
    };
    updateBudget(updatedBudget);
    setShowModal(false);
  };

  return (
    <div className="modal is-active">
      <div className="modal-background" onClick={() => setShowModal(false)}></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">Edit Budget</p>
          <button className="delete" aria-label="close" onClick={() => setShowModal(false)}></button>
        </header>
        <section className="modal-card-body">
          <form onSubmit={handleSubmit}>
            <div className="field">
              <label className="label">Name</label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Description</label>
              <div className="control">
                <textarea
                  className="textarea"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
              </div>
            </div>
            <div className="field">
              <label className="label">Limit</label>
              <div className="control">
                <input
                  className="input"
                  type="number"
                  step="0.01"
                  value={limit}
                  onChange={(e) => setLimit(e.target.value)}
                  placeholder="Optional"
                />
              </div>
            </div>
            {error && <p className="help is-danger">{error}</p>}
          </form>
        </section>
        <footer className="modal-card-foot is-flex is-justify-content-center">
            <div className="buttons">
          <button className="button is-success" onClick={handleSubmit}>Save changes</button>
          <button className="button" onClick={() => setShowModal(false)}>Cancel</button>
        </div>
        </footer>
      </div>
    </div>
  );
};