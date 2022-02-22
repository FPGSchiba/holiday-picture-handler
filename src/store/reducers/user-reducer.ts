import { UserActionTypes } from '../actions/user';
import { UserState } from '../format';

const initialState: UserState = {
    currentUser: {
        username: '',
        password: ''
    }
};

export default function user(state = initialState, action: UserActionTypes): UserState {
    switch(action.type){
        default: return state;
    }
}
