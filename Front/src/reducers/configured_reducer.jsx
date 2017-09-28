import { CONFIGURED, UNCONFIGURED } from '../actions/types';

const INITIAL_STATE = { error: '', message: '', content: '', configured: false };

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case CONFIGURED:
      return { ...state, error: '', message: '', configured: true };
    case UNCONFIGURED:
      return { ...state, configured: false, error: action.payload };
    default:
      break;
  }
  return state;
}
