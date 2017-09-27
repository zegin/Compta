import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import authReducer from './auth_reducer';
import confiuredReducer from './configured_reducer';

const rootReducer = combineReducers({
  configure: confiuredReducer,
  auth: authReducer,
  form: formReducer
});

export default rootReducer;
