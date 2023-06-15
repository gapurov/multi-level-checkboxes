'use client';

import { useMemo } from 'react';
import { useCheckboxContext } from '~/app/lib/checkboxContext';
import type { Category, Child } from '~/app/components/checkboxTree';

export const constructTree = (categories: Category[]) =>
  categories
    .filter((c) => c.parent === '0')
    .map(function addChild(child): Child {
      const children = categories.filter((c) => c.parent === child.id);

      if (!children.length) return child;

      return {
        ...child,
        children: children.map(addChild),
      };
    });

export const useCheckboxTree = (categories: Category[]) => {
  const tree = useMemo(() => constructTree(categories), [categories]);
  const { selected, setSelected, opened, setOpened } = useCheckboxContext();

  const toggleSelected = (id: string) => {
    setSelected((prevSelected) => {
      const newSelected = new Set(prevSelected);
      if (newSelected.has(id)) {
        newSelected.delete(id);
      } else {
        newSelected.add(id);
      }
      return newSelected;
    });
  };

  const toggleOpened = (id: string) => {
    setOpened((prevOpened) => {
      const newOpened = new Set(prevOpened);
      if (newOpened.has(id)) {
        newOpened.delete(id);
      } else {
        newOpened.add(id);
      }
      return newOpened;
    });
  };

  const getFacetsSelected = (parentId: string) => {
    const facets = categories.filter((c) => c.parent === parentId);
    const facetIds = facets.map(({ id }) => id);
    const newSelected = new Set(selected);

    return {
      isAllSelected: [...facetIds, parentId].every((facetId) => newSelected.has(facetId)),
      facetIds,
    };
  };

  const toggleAllFacetsInCategory = (parentId: string) => {
    setSelected((prevSelected) => {
      const newSelected = new Set(prevSelected);
      const { isAllSelected, facetIds } = getFacetsSelected(parentId);

      if (isAllSelected) {
        newSelected.delete(parentId);
        facetIds.forEach((facetId) => newSelected.delete(facetId));
      } else {
        newSelected.add(parentId);
        facetIds.forEach((facetId) => newSelected.add(facetId));
      }

      return newSelected;
    });
  };

  return {
    tree,
    selected,
    opened,
    setSelected,
    setOpened,
    getFacetsSelected,
    toggleSelected,
    toggleOpened,
    toggleAllFacetsInCategory,
  };
};
