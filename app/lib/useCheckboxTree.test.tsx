import type { ReactNode } from 'react';
import { renderHook, act } from '@testing-library/react';
import { describe, expect } from 'vitest';
import { constructTree, useCheckboxTree } from '~/app/lib/useCheckboxTree';
import { CheckboxProvider } from './checkboxContext';

const categories = [
  {
    id: '14096',
    count: 137,
    parent: '14100',
    name: 'Kleding',
  },
  {
    id: '14098',
    count: 2,
    parent: '14096',
    name: 'Badmode',
  },
  {
    id: '14100',
    count: 136,
    parent: '0',
    name: 'Dames',
  },
  {
    id: '14101',
    count: 17,
    parent: '14096',
    name: 'Broeken',
  },
  {
    id: '14104',
    count: 5,
    parent: '14096',
    name: 'Jassen en Mantels',
  },
];
describe('useCheckboxTree', () => {
  test('should construct the tree from categories', () => {
    const expectedResult = [
      {
        id: '14100',
        count: 136,
        parent: '0',
        name: 'Dames',
        children: [
          {
            id: '14096',
            count: 137,
            parent: '14100',
            name: 'Kleding',
            children: [
              {
                id: '14098',
                count: 2,
                parent: '14096',
                name: 'Badmode',
              },
              {
                id: '14101',
                count: 17,
                parent: '14096',
                name: 'Broeken',
              },
              {
                id: '14104',
                count: 5,
                parent: '14096',
                name: 'Jassen en Mantels',
              },
            ],
          },
        ],
      },
    ];

    expect(constructTree(categories)).toEqual(expectedResult);
  });

  test('useCheckboxTree initializes correctly', () => {
    const { result } = renderHook(() => useCheckboxTree(categories));
    expect(result.current.tree).toEqual(constructTree(categories));
    expect(result.current.selected.size).toBe(0);
    expect(result.current.opened.size).toBe(0);
  });

  test('useCheckboxTree toggles selected', () => {
    const wrapper = ({ children }: { children: ReactNode }) => (
      <CheckboxProvider>{children}</CheckboxProvider>
    );
    const { result } = renderHook(() => useCheckboxTree(categories), {
      wrapper,
    });
    const id = '14096';
    act(() => {
      result.current.toggleSelected(id);
    });
    expect(result.current.selected.has(id)).toBe(true);

    act(() => {
      result.current.toggleSelected(id);
    });
    expect(result.current.selected.has(id)).toBe(false);
  });

  test('useCheckboxTree toggles opened', () => {
    const wrapper = ({ children }: { children: ReactNode }) => (
      <CheckboxProvider>{children}</CheckboxProvider>
    );
    const { result } = renderHook(() => useCheckboxTree(categories), {
      wrapper,
    });
    const id = '14096';
    act(() => {
      result.current.toggleOpened(id);
    });
    expect(result.current.opened.has(id)).toBe(true);

    act(() => {
      result.current.toggleOpened(id);
    });
    expect(result.current.opened.has(id)).toBe(false);
  });
});
