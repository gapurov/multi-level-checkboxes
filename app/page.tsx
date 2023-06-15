import { Suspense } from 'react';
import Loading from '~/app/loading';
import CheckboxView from '~/app/components/checkboxView';
import { CheckboxProvider } from '~/app/lib/checkboxContext';

export default async function Home() {
  return (
    <main className="p-8">
      <h1 className="mb-5 font-semibold text-2xl">Multi-Level Checkboxes Demo</h1>
      <Suspense fallback={<Loading />}>
        <CheckboxProvider>
          <CheckboxView />
        </CheckboxProvider>
      </Suspense>
    </main>
  );
}
