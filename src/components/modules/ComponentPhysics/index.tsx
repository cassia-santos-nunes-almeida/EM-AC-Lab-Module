import { useState } from 'react';
import { ModuleNavigation } from '../../common/ModuleNavigation';
import {
  calculateResistance,
  calculateCapacitance,
  calculateInductance,
} from '../../../utils/componentMath';
import { ResistorSection } from './ResistorSection';
import { CapacitorSection } from './CapacitorSection';
import { InductorSection } from './InductorSection';

type ComponentType = 'resistor' | 'capacitor' | 'inductor';

export function ComponentPhysics() {
  const [activeComponent, setActiveComponent] = useState<ComponentType>('resistor');

  const [resistorLength, setResistorLength] = useState(1);
  const [resistorArea, setResistorArea] = useState(1e-6);
  const [resistorMaterial, setResistorMaterial] = useState(1.68e-8);

  const [capacitorArea, setCapacitorArea] = useState(0.01);
  const [capacitorDistance, setCapacitorDistance] = useState(0.001);
  const [capacitorPermittivity, setCapacitorPermittivity] = useState(8.854e-12);

  const [inductorTurns, setInductorTurns] = useState(100);
  const [inductorArea, setInductorArea] = useState(0.0001);
  const [inductorLength, setInductorLength] = useState(0.1);
  const [inductorPermeability, setInductorPermeability] = useState(1.257e-6);

  const resistance = calculateResistance(resistorMaterial, resistorLength, resistorArea);
  const capacitance = calculateCapacitance(capacitorPermittivity, capacitorArea, capacitorDistance);
  const inductance = calculateInductance(inductorPermeability, inductorTurns, inductorArea, inductorLength);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-2">Component Physics</h1>
        <p className="text-lg text-slate-600 dark:text-slate-400">
          Understanding the physical foundations of circuit components
        </p>
      </div>

      <div className="flex border-b-2 border-slate-200 dark:border-slate-700">
        {([
          { id: 'resistor' as const, label: 'Resistor', color: 'border-red-500 text-red-700 dark:text-red-400 bg-red-50 dark:bg-red-900/20' },
          { id: 'capacitor' as const, label: 'Capacitor', color: 'border-green-500 text-green-700 dark:text-green-400 bg-green-50 dark:bg-green-900/20' },
          { id: 'inductor' as const, label: 'Inductor', color: 'border-purple-500 text-purple-700 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/20' },
        ]).map((component) => (
          <button
            key={component.id}
            onClick={() => setActiveComponent(component.id)}
            className={`px-6 py-3 font-semibold text-sm transition-colors border-b-3 -mb-[2px] ${
              activeComponent === component.id
                ? component.color
                : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800'
            }`}
          >
            {component.label}
          </button>
        ))}
      </div>

      {activeComponent === 'resistor' && (
        <ResistorSection
          length={resistorLength}
          area={resistorArea}
          resistivity={resistorMaterial}
          resistance={resistance}
          onLengthChange={setResistorLength}
          onAreaChange={setResistorArea}
          onResistivityChange={setResistorMaterial}
        />
      )}

      {activeComponent === 'capacitor' && (
        <CapacitorSection
          area={capacitorArea}
          distance={capacitorDistance}
          permittivity={capacitorPermittivity}
          capacitance={capacitance}
          onAreaChange={setCapacitorArea}
          onDistanceChange={setCapacitorDistance}
          onPermittivityChange={setCapacitorPermittivity}
        />
      )}

      {activeComponent === 'inductor' && (
        <InductorSection
          turns={inductorTurns}
          area={inductorArea}
          length={inductorLength}
          permeability={inductorPermeability}
          inductance={inductance}
          onTurnsChange={setInductorTurns}
          onAreaChange={setInductorArea}
          onLengthChange={setInductorLength}
          onPermeabilityChange={setInductorPermeability}
        />
      )}

      <ModuleNavigation />
    </div>
  );
}
