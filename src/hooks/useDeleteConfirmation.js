import { useState } from 'react';

const useDeleteConfirmation = (handleDelete) => {
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  const handleDeleteModalClick = () => {
    setShowDeleteConfirmation(true);
  };

  const handleDeleteConfirm = () => {
    handleDelete(); // Call the original handleDelete function
    setShowDeleteConfirmation(false);
  };

  const handleDeleteModalClose = () => {
    setShowDeleteConfirmation(false);
  };

  return {
    showDeleteConfirmation,
    handleDeleteModalClick,
    handleDeleteConfirm,
    handleDeleteModalClose,
  };
};

export default useDeleteConfirmation;
