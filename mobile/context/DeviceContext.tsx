import { createContext, useState, ReactNode } from 'react';
import { BluetoothDevice } from 'react-native-bluetooth-classic';

interface DeviceContextType {
  device: BluetoothDevice | null;
  setDevice: (device: BluetoothDevice | null) => void;
}

export const DeviceContext = createContext<DeviceContextType | undefined>(undefined);

interface Props {
  children: ReactNode;
}

export function DeviceProvider({ children }: Props) {
  const [device, setDevice] = useState<BluetoothDevice | null>(null);

  return (
    <DeviceContext.Provider value={{ device, setDevice }}>
        {children}
    </DeviceContext.Provider>
  );
}
