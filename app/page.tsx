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
        <CheckboxView categories={response.data.categories} />
      </CheckboxProvider>
    </main>
  );
}
