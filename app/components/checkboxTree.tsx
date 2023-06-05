'use client';

import { useCheckboxTree } from '../lib/useCheckboxTree';

export type Category = {
  id: string;
  count: number;
  parent: string;
  name: string;
};

type CheckboxTreeProps = {
  categories: Category[];
};

const CheckboxTree: React.FC<CheckboxTreeProps> = ({ categories }) => {
  const {
    tree,
    opened,
    selected,
    getFacetsSelected,
    toggleSelected,
    toggleOpened,
    toggleAllFacetsInCategory,
  } = useCheckboxTree(categories);

  return (
    <ul className="pl-3">
      {tree.map((child) => (
        <Child
          key={child.id}
          child={child}
          opened={opened}
          selected={selected}
          getFacetsSelected={getFacetsSelected}
          toggleSelected={toggleSelected}
          toggleOpened={toggleOpened}
          toggleAllFacetsInCategory={toggleAllFacetsInCategory}
        />
      ))}
    </ul>
  );
};

export type Child = Category & { children?: Child[] };

type ChildProps = {
  child: Child;
  selected: Set<string>;
  opened: Set<string>;
  getFacetsSelected: (parentId: string) => {
    isAllSelected: boolean;
    facetIds: string[];
  };
  toggleSelected: (id: string) => void;
  toggleOpened: (id: string) => void;
  toggleAllFacetsInCategory: (id: string) => void;
};

const Child: React.FC<ChildProps> = ({
  child,
  opened,
  selected,
  getFacetsSelected,
  toggleSelected,
  toggleOpened,
  toggleAllFacetsInCategory,
}) => {
  const { id, name, children } = child;

  return (
    <li key={id} className="w-auto">
      <div className="pb-2 flex items-center">
        <input
          data-testid={`checkbox-${name}-${id}`}
          type="checkbox"
          className="mr-2 rounded"
          aria-checked={selected.has(id)}
          checked={selected.has(id)}
          onChange={() => toggleSelected(id)}
        />
        {children ? (
          <>
            <button
              data-testid={`button-${name}-${id}`}
              role="button"
              className="px-2 py-1 underline hover:decoration-blue-600/[.70] underline-offset-8"
              onClick={() => toggleOpened(id)}
            >
              {name}
            </button>
            —
            <button
              data-testid={`select-all-button-${name}-${id}`}
              className="ml-2 pl-1 pr-1 bg-gray-200 hover:bg-blue-600/30 rounded text-stone-600"
              onClick={() => toggleAllFacetsInCategory(id)}
            >
              {getFacetsSelected(id).isAllSelected
                ? 'deselect all'
                : 'select all'}
            </button>
          </>
        ) : (
          <span className="px-2 py-1">{name}</span>
        )}
      </div>
      {children && opened.has(id) && (
        <ul className="ml-5">
          {children.map((child: Child) => (
            <Child
              key={child.id}
              child={child}
              opened={opened}
              selected={selected}
              getFacetsSelected={getFacetsSelected}
              toggleSelected={toggleSelected}
              toggleOpened={toggleOpened}
              toggleAllFacetsInCategory={toggleAllFacetsInCategory}
            />
          ))}
        </ul>
      )}
    </li>
  );
};

export default CheckboxTree;
