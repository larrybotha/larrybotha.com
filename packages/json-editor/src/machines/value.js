import {assign, Machine, spawn} from 'xstate';

const valueMachine = Machine(
  {
    initial: 'unknown',

    context: {
      value: undefined,
      values: [],
    },

    on: {
      SELECT_ARRAY: 'array',
      SELECT_OBJECT: 'object',
      SELECT_PRIMITIVE: 'primitive',
      SET_VALUE: {
        target: '.',
        actions: ['setValue'],
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
            SET_VALUE: 'setValue',
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
      setValue: assign(({value}) => ({value})),
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
