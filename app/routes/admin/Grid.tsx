"use client";
import { clsx } from 'clsx';
import { useEffect, useState } from 'react';

function Grid() {
  const [SyncfusionComponents, setSyncfusionComponents] = useState<{
    ButtonComponent?: any;
    GridComponent?: any;
    ColumnDirective?: any;
    ColumnsDirective?: any;
  }>({});

  useEffect(() => {
    async function loadSyncfusion() {
      // Dynamic import for CommonJS modules
      const basePkg = await import('@syncfusion/ej2-base');
      const buttonsPkg = await import('@syncfusion/ej2-react-buttons');
      const gridsPkg = await import('@syncfusion/ej2-react-grids');

      basePkg.registerLicense('Ngo9BigBOggjHTQxAR8/V1NNaF1cWmhIfEx1RHxQdld5ZFRHallYTnNWUj0eQnxTdEBjXHxecH1VQWJVWUNyWklfag==');

      setSyncfusionComponents({
        ButtonComponent: buttonsPkg.ButtonComponent,
        GridComponent: gridsPkg.GridComponent,
        ColumnDirective: gridsPkg.ColumnDirective,
        ColumnsDirective: gridsPkg.ColumnsDirective,
      });
    }
    loadSyncfusion();
  }, []);

  if (!SyncfusionComponents.ButtonComponent) return <div>Loading...</div>;

  const { ButtonComponent } = SyncfusionComponents;

  return (
    <div>
      <div>HOLO</div>
      {/* <div className='e-btn-group'>
        <ButtonComponent>HTML</ButtonComponent>
        <ButtonComponent>CSS</ButtonComponent>
        <ButtonComponent>Javascript</ButtonComponent>
      </div> */}
      
    </div>
  );
}

export default Grid;