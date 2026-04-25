import React from 'react';
import { Badge } from 'react-bootstrap';

/**
 * StatusBadge component renders a Bootstrap Badge with a variant based on the status.
 *
 * @param {{ status: 'Present' | 'Absent' | 'Late' }} props
 * @returns {JSX.Element}
 */
const StatusBadge = ({ status }) => {
  // Determine the appropriate variant for the given status
  const variantMap = {
    Present: 'success',
    Absent: 'danger',
    Late: 'warning',
  };

  const variant = variantMap[status] || 'secondary';

  return <Badge variant={variant}>{status}</Badge>;
};

export default StatusBadge;
