import CheckboxTree from '~/app/components/checkboxTree';
import SelectedCategories from '~/app/components/selectedCategories';

import fsPromises from 'fs/promises';
import path from 'path';

async function getCategories() {
  const filePath = path.join(process.cwd(), './response.json');

  const jsonData = await new Promise<string>((resolve) => {
    setTimeout(() => {
      resolve(fsPromises.readFile(filePath, 'utf-8'));
    }, 2000);
  });

  return JSON.parse(jsonData);
}

const CheckboxView = async () => {
  const response = await getCategories();

  return (
    <>
      <CheckboxTree categories={response.data.categories} />
      <SelectedCategories categories={response.data.categories} />
    </>
  );
};

export default CheckboxView;
