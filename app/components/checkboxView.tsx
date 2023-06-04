'use client';

import { useCheckboxTree } from '../lib/useCheckboxTree';
import CheckboxTree, { type Category } from './checkboxTree';

type CheckboxViewProps = {
  categories: Category[];
};

const CheckboxView: React.FC<CheckboxViewProps> = ({ categories }) => {
  const { selected, setSelected, setOpened } = useCheckboxTree(categories);
  const selectedCategories = categories
    .filter((cat) => selected.has(cat.id))
    .map((cat) => cat.name);
  return (
    <>
      <CheckboxTree categories={categories} />

      <div className="py-5">
        <button
          className="ml-2 pl-1 pr-1 bg-gray-200 hover:bg-blue-600/30 rounded text-stone-600"
          onClick={() => setSelected(new Set())}
        >
          Deselect all
        </button>

        <button
          className="ml-2 pl-1 pr-1 bg-gray-200 hover:bg-blue-600/30 rounded text-stone-600"
          onClick={() => setOpened(new Set())}
        >
          Collapse all
        </button>
      </div>
      <div className="pl-3 pb-5 -pt-1">
        {selectedCategories.length ? (
          <>
            <span className="font-semibold">Selected categories: </span>
            {selectedCategories.map((cat, index) => (
              <span
                key={index}
                className="inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-sm mx-1 mb-3 -mt-1 font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10"
              >
                {cat}
              </span>
            ))}
          </>
        ) : (
          'No categories selected'
        )}
      </div>
    </>
  );
};

export default CheckboxView;
