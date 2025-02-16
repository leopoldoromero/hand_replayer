'use client';
import { Hand } from '@/modules/hand/domain/hand';
import { LocalStorageRepository } from '@/modules/shared/infrastructure/local_storage.repository';
import { createContext, useState, useContext, useEffect } from 'react';
interface HandContextState {
    currentHandIdx: number;
    setCurrentHandIdx: (idx: number) => void;
    hands: Array<Hand>;
    setHands: (newHands: Array<Hand>) => void;
    nextHand: () => void;
    prevHand: () => void;
    currentHand: Hand | null;
}

export const HandContext = createContext<HandContextState>({
    currentHandIdx: 0,
    setCurrentHandIdx: () => {},
    hands: [],
    setHands: () => {},
    nextHand: () => {},
    prevHand: () => {},
    currentHand: null,
});

export function HandContextProvider({ children }: { children: React.ReactNode }) {
    const [hands, setHands] = useState<Array<Hand>>([]);
    const [currentHandIdx, setCurrentHandIdx] = useState<number>(0);
    const localStorageRepository = new LocalStorageRepository();
  
    const nextHand = () => {
      if (currentHandIdx < hands.length - 1) {
        setCurrentHandIdx(currentHandIdx + 1);
      }
    };
  
    const prevHand = () => {
      if (currentHandIdx > 0) {
        setCurrentHandIdx(currentHandIdx - 1);
      }
    };

    const loadHand = (handId: string) => {
      const idx = hands?.findIndex((hand) => hand.id === handId);
      if (idx > -1) {
        setCurrentHandIdx(idx)
      }
      return hands[idx]
    }

    useEffect(() => {
      const existingHistory = localStorageRepository.loadHandHistory('handHistory', true);
      if (existingHistory) {
        setHands(existingHistory)
      } 
    }, [])
  
    return (
      <HandContext.Provider value={{ 
          currentHandIdx, 
          hands, 
          setHands, 
          nextHand, 
          prevHand, 
          setCurrentHandIdx,
          currentHand: hands[currentHandIdx],
      }}>
        {children}
      </HandContext.Provider>
    );
  }
  
  export function useHandContext() {
    return useContext(HandContext);
  }