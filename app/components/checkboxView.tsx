import CheckboxTree from '~/app/components/checkboxTree';
import SelectedCategories from '~/app/components/selectedCategories';

import fsPromises from 'fs/promises';
import path from 'path';

async function getCategories() {
  const filePath = path.join(process.cwd(), `${process.env.NODE_ENV === 'production' ? '.' : 'public'}/response.json`);

  const jsonData = await new Promise<Buffer>((resolve) => {
    setTimeout(() => {
      resolve(fsPromises.readFile(filePath));
    }, 2000);
  });

  return JSON.parse(jsonData.toString());
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
