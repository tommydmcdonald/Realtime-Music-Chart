import axios from 'axios';

export const search = (input, view) => async dispatch => {
   // const route = `/api/${view}`;
   // const res = await axios.get(route);

   dispatch({ type: 'NEW_VIEW', payload: input});
}
