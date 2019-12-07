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
          ADD_VALUE: {
            target: '.',
            actions: ['spawnValue'],
          },
          REMOVE_VALUE: {
            target: '.',
            actions: ['removeValue'],
          },
        },
      },

      object: {
        on: {
          SEND_PROPERTY_NAME: {
            target: '.',
            actions: ['sendPropertyName'],
          },
          ADD_VALUE: {
            target: '.',
            actions: ['spawnValue'],
          },
          REMOVE_VALUE: {
            target: '.',
            actions: ['removeValue'],
          },
        },
      },

      primitive: {
        initial: 'unknown',

        states: {
          on: {
            SELECT_STRING: 'string',
            SELECT_NUMBER: 'number',
            SELECT_BOOLEAN: 'boolean',
            SET_VALUE: {
              actions: 'setValue',
              // target: 'primitive.',
              internal: false,
            },
          },

          unknown: {},

          string: {},

          number: {},

          boolean: {},
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

      // sendPropertyName: send(({values}, {refId, data}) => ({
      //   data,
      //   to: values.find(({ref}) => ref.id === refId).ref,
      //   type: 'SET_PROPERTY_NAME',
      // })),

      sendPropertyName: send(
        (_, {data}) => {
          return {type: 'SET_PROPERTY_NAME', data};
        },
        {
          to: ({values}, {refId}) => values.find(({ref}) => ref.id === refId).ref,
        },
      ),

      setValue: assign({value: (_, {data}) => data}),

      spawnValue: assign({
        values: ({values}) => [
          ...values,
          {
            ref: spawn(valueMachine),
          },
        ],
      }),

      removeValue: assign({
        values: ({values}, {data}) => values.filter(({ref}) => ref.id !== data.id),
      }),
    },
  },
);

export {valueMachine};
