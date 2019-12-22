import {assign, Machine, send, spawn} from 'xstate';

const getTransitionTypeFromStateValue = state => {
  debugger;
  switch (state) {
    case 'primitive':
      return 'SELECT_PRIMITIVE';
    case 'primitive.boolean':
      return 'SELECT_BOOLEAN';
    case 'primitive.string':
      return 'SELECT_STRING';
    case 'primitive.number':
      return 'SELECT_NUMBER';
    case 'primitive.null':
      return 'SELECT_NULL';
    case 'primitive.undefined':
      return 'SELECT_UNDEFINED';
    case 'object':
      return 'SELECT_OBJECT';
    case 'array':
      return 'SELECT_ARRAY';
    default:
      return;
  }
};

const valueMachine = Machine(
  {
    initial: 'primitive',

    context: {
      key: undefined,
      value: undefined,
      values: [],
    },

    on: {
      SELECT_ARRAY: 'array',
      SELECT_OBJECT: 'object',
      SELECT_PRIMITIVE: 'primitive',
      SET_PROPERTY_KEY: {
        actions: ['setPropertyKey'],
      },
    },

    states: {
      unknown: {},

      array: {
        on: {
          ADD_ACTOR: {
            target: '.',
            actions: ['spawnActor', 'setNewActorState'],
          },
          REMOVE_ACTOR: {
            target: '.',
            actions: ['removeActor'],
          },
        },
      },

      object: {
        on: {
          SEND_PROPERTY_KEY: {
            actions: ['sendPropertyKey'],
            external: true,
            target: '.',
          },
          ADD_ACTOR: {
            actions: ['spawnActor', 'setNewActorState'],
            external: true,
            target: '.',
          },
          REMOVE_ACTOR: {
            actions: ['removeActor'],
            external: true,
            target: '.',
          },
        },
      },

      primitive: {
        initial: 'string',

        on: {
          SELECT_STRING: 'primitive.string',
          SELECT_NUMBER: 'primitive.number',
          SELECT_BOOLEAN: 'primitive.boolean',
          SELECT_NULL: 'primitive.null',
          SELECT_UNDEFINED: 'primitive.undefined',
        },

        states: {
          string: {
            entry: 'setDefaultStringValue',

            on: {
              SET_VALUE: {
                actions: 'setValue',
              },
            },
          },

          number: {
            entry: 'setDefaultNumberValue',

            on: {
              SET_VALUE: {
                actions: 'setValue',
              },
            },
          },

          boolean: {
            on: {
              SET_VALUE: {
                actions: 'setBooleanValue',
              },
            },
          },

          null: {
            entry: 'setNullValue',
          },

          undefined: {
            entry: 'setUndefinedValue',
          },
        },
      },
    },
  },
  {
    actions: {
      setPropertyKey: assign({
        key: (_, {data}) => data,
      }),

      sendPropertyKey: send((_, {data}) => ({type: 'SET_PROPERTY_KEY', data}), {
        to: ({values}, {refId}) => values.find(({ref}) => ref.id === refId).ref,
      }),

      setValue: assign({value: (_, {data}) => data}),

      setBooleanValue: assign({
        value: (_, {data}) => Boolean(data),
      }),

      setDefaultStringValue: assign({value: ''}),

      setDefaultNumberValue: assign({value: 0}),

      setNullValue: assign({value: null}),

      setUndefinedValue: assign({value: undefined}),

      spawnActor: assign({
        values: ({values}) => [...values, {ref: spawn(valueMachine, {sync: true})}],
      }),

      setNewActorState: ctx => {
        const {values} = ctx;

        /**
         * set new actor to be in same state as previous actor
         */
        if (values.length > 1) {
          const [prevActor, newActor] = values.slice(-2);
          const events = prevActor.ref.state
            .toStrings()
            .map(getTransitionTypeFromStateValue)
            .map(type => ({type: type === undefined ? undefined : type}));

          newActor.ref.send(events);
        }
      },

      removeActor: assign({
        values: ({values}, {data}) => values.filter(({ref}) => ref.id !== data.id),
      }),
    },
  },
);

export {valueMachine};
