import React from 'react';

import ExportDataModal from './ExportDataModal.jsx';
import SignInModal from './SignInModal.jsx';
import FeedbackModal from './FeedbackModal.jsx';
import BoxDetailsModal from './BoxDetailsModal.jsx';

const ModalConductor = props => {
  switch (props.currentModal) {
    case 'EXPORT_DATA':
      return <ExportDataModal {...props}/>;

    case 'SOCIAL_SIGN_IN':
      return <SignInModal {...props}/>;

    case 'FEEDBACK':
      return <FeedbackModal {...props}/>;

    case 'EDIT_BOX':
      return <BoxDetailsModal {...props}/>;

    default:
      return null;
  }
};

export default ModalConductor;