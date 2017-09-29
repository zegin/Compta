import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import authReducer from './auth_reducer';
import confiuredReducer from './configured_reducer';
import treatmentReducer from './treatment_reducer';

const rootReducer = combineReducers({
  configure: confiuredReducer,
  auth: authReducer,
  treatment: treatmentReducer,
  form: formReducer
});

export default rootReducer;
