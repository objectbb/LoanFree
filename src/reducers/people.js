import { RETRIEVE_PEOPLE } from "../actions";

export const people = (
    state = { people: [] },
    action
) => {
    switch (action.type) {
    case RETRIEVE_PEOPLE:
        return action.people;
    default:
        return state;
    }
};