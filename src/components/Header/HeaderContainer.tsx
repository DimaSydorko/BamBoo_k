import { connect } from 'react-redux';
import { logout } from '../../redux/authReducer';
import { AppStateType } from '../../redux/redux-store';
import Header from './Header';

const mapStateToProps = (state: AppStateType) => ({
  isAuth: state.auth.isAuth,
  login: state.auth.login,
}) 

export default 
  connect(mapStateToProps, {logout}) 
  (Header);