import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { describe, expect } from 'vitest';
import CheckboxTree from './checkboxTree';
import { constructTree } from '~/app/lib/useCheckboxTree';
import { CheckboxProvider } from '../lib/checkboxContext';
import { ReactNode } from 'react';

const categories = constructTree([
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
]);

const wrapper = ({ children }: { children: ReactNode }) => (
  <CheckboxProvider>{children}</CheckboxProvider>
);

describe('CheckboxTree', () => {
  test('renders the CheckboxTree component', async () => {
    render(<CheckboxTree categories={categories} />, { wrapper });

    const topCategoryButton = screen.getByText('Dames');
    await userEvent.click(topCategoryButton);
    const subCategoryButton = await screen.getByText('Kleding');
    await userEvent.click(subCategoryButton);

    expect(screen.getByText('Badmode')).toBeInTheDocument();
    expect(screen.getByText('Broeken')).toBeInTheDocument();
    expect(screen.getByText('Jassen en Mantels')).toBeInTheDocument();
  });

  test('only the categories with subcatogries hav select/deselect all button', async () => {
    render(<CheckboxTree categories={categories} />, { wrapper });

    const topCategoryButton = screen.getByText('Dames');
    await userEvent.click(topCategoryButton);

    const topCategoryCheckbox = screen.getByTestId('checkbox-Dames-14100');
    expect(topCategoryCheckbox).not.toBeChecked();
    await userEvent.click(topCategoryCheckbox);
    expect(topCategoryCheckbox).toBeChecked();

    const subCategoryCheckbox = screen.getByTestId('checkbox-Kleding-14096');
    expect(subCategoryCheckbox).not.toBeChecked();
    await userEvent.click(subCategoryCheckbox);
    expect(subCategoryCheckbox).toBeChecked();

    const topCategoryToggleSelectALlButton = screen.getByTestId(
      'select-all-button-Dames-14100'
    );
    expect(topCategoryToggleSelectALlButton).toHaveTextContent('deselect all');
    await userEvent.click(topCategoryToggleSelectALlButton);
    expect(topCategoryToggleSelectALlButton).toHaveTextContent('select all');

    const subCategoryToggleSelectALlButton = screen.getByTestId(
      'select-all-button-Kleding-14096'
    );
    expect(subCategoryToggleSelectALlButton).toHaveTextContent('deselect all');
    await userEvent.click(subCategoryToggleSelectALlButton);
    expect(subCategoryToggleSelectALlButton).toHaveTextContent('select all');
  });
});
