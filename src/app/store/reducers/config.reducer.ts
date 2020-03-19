import {ConfigState, initialConfigState} from '../state/config.state';
import {ConfigActions, EConfigActions} from '../actions/config.actions';

export const configReducer = (
  state = initialConfigState,
  action: ConfigActions
): ConfigState => {
  switch (action.type) {
    case EConfigActions.GetConfigSuccess: {
      return {
        ...state,
        config: action.payload
      };
    }

    default:
      return state;
  }
};
