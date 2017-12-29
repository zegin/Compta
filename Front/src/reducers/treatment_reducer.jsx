import { PASSED, UNPASSED } from '../actions/types';

const INITIAL_STATE = { error: '', message: '', content: '', passed: false };

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case PASSED:
      return { ...state, error: '', message: 'Case PASSED', passed: true };
    case UNPASSED:
      return { ...state, passed: false, error: action.payload };
    default:
      break;
  }
  return state;
}
