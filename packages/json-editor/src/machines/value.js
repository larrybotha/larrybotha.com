import {assign, Machine, send, spawn} from 'xstate';

const valueMachine = Machine(
  {
    initial: 'unknown',

    context: {
      name: undefined,
      value: undefined,
      values: [],
    },

    on: {
      SELECT_ARRAY: 'array',
      SELECT_OBJECT: 'object',
      SELECT_PRIMITIVE: 'primitive',
      SET_PROPERTY_NAME: {
        actions: ['setPropertyName'],
      },
    },

    states: {
      unknown: {},

      array: {
        on: {
          ADD_ACTOR: {
            target: '.',
            actions: ['spawnActor'],
          },
          REMOVE_ACTOR: {
            target: '.',
            actions: ['removeActor'],
          },
        },
      },

      object: {
        on: {
          SEND_PROPERTY_NAME: {
            target: '.',
            actions: ['sendPropertyName'],
          },
          ADD_ACTOR: {
            target: '.',
            actions: ['spawnActor'],
          },
          REMOVE_ACTOR: {
            target: '.',
            actions: ['removeActor'],
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
            on: {
              SET_VALUE: {
                actions: 'setValue',
              },
            },
          },

          number: {
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
      setPropertyName: assign({
        name: (_, {data}, x, z) => {
          return data;
        },
      }),

      sendPropertyName: send(
        (_, {data}) => {
          return {type: 'SET_PROPERTY_NAME', data};
        },
        {
          to: ({values}, {refId}) => values.find(({ref}) => ref.id === refId).ref,
        },
      ),

      setValue: assign({value: (_, {data}) => data}),

      setBooleanValue: assign({
        value: (_, {data}) => Boolean(data),
      }),

      setNullValue: assign({value: null}),

      setUndefinedValue: assign({value: undefined}),

      spawnActor: assign({
        values: ({values}) => [
          ...values,
          {
            ref: spawn(valueMachine),
          },
        ],
      }),

      removeActor: assign({
        values: ({values}, {data}) => values.filter(({ref}) => ref.id !== data.id),
      }),
    },
  },
);

export {valueMachine};
