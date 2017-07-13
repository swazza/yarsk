/*
* Usage:
*       const addTodo = makeActionCreator({
*         type: 'ADD_TODO',
*         payloadProps: ['text']
*       });
*       const action = addTodo('say hello');
*       expect(action).to.deep.equal({
*         type: 'ADD_TODO',
*         payload: { text: 'say hello' }
*       })
*/
export const makeActionCreator = ({ type, payloadProps = [] }) => (...args) => {
  let action = { type, payload: {} };
  payloadProps.forEach((prop, index) => {
    let propName = payloadProps[index],
      propVal = args[index];

    action.payload[propName] = propVal;
  });

  return action;
};

/*
* Usage:
*       const todos = createReducer({
*         initialState: [],
*         handlers: {
*           'ADD_TODO': (state, action) => {
*             const { payload } = action;
*             return [...state, payload.text];
*           }
*         }
*       })
*/
export const createReducer = ({ initialState, handlers = {} }) => (state = initialState, action) => {
  return handlers.hasOwnProperty(action.type) ? handlers[action.type](state, action) : state;
};
