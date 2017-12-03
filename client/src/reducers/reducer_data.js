export default function(state = [], action) {
   switch(action.type) {
      case 'NEW_VIEW':
         return action.payload
   }
   return state;
}
