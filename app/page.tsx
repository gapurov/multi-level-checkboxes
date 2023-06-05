import CheckboxView from '~/app/components/checkboxView';
import { CheckboxProvider } from '~/app/lib/checkboxContext';
import fsPromises from 'fs/promises';
import path from 'path';

async function getCategories() {
  const filePath = path.join(process.cwd(), './response.json');
  const jsonData = await fsPromises.readFile(filePath);
  return JSON.parse(jsonData.toString());
}

export default async function Home() {
  const response = await getCategories();
  return (
    <main className="p-8">
      <CheckboxProvider>
        <CheckboxView
          categories={[
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
          ]}
        />
      </CheckboxProvider>
    </main>
  );
}
