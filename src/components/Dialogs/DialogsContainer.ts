import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { actions } from '../../redux/dialogReducer';
import { AppStateType } from '../../redux/redux-store';
import { withAuthRedirect } from '../hoc/withAuthRedirect';
import Dialogs from './Dialogs';

const mapStateToProps = (state: AppStateType) => {
  return {
    dialogsPage: state.dialogsPage,
  }
}
export default compose<React.ComponentType>(
  connect (mapStateToProps, { ...actions }),
  withAuthRedirect
) (Dialogs)