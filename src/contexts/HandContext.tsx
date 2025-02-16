'use client';
import { Hand } from '@/modules/hand/domain/hand';
import { LocalStorageRepository } from '@/modules/shared/infrastructure/local_storage.repository';
import { createContext, useState, useContext, useEffect } from 'react';
import { useRouter } from "next/navigation";
interface HandContextState {
    currentHandIdx: number;
    setCurrentHandIdx: (idx: number) => void;
    hands: Array<Hand>;
    setHands: (newHands: Array<Hand>) => void;
    nextHand: () => void;
    prevHand: () => void;
    currentHand: Hand | null;
    loadHand: (id: string) => void;
}

export const HandContext = createContext<HandContextState>({
    currentHandIdx: 0,
    setCurrentHandIdx: () => {},
    hands: [],
    setHands: () => {},
    nextHand: () => {},
    prevHand: () => {},
    currentHand: null,
    loadHand: () => {},
});

export function HandContextProvider({ children }: { children: React.ReactNode }) {
    const [hands, setHands] = useState<Array<Hand>>([]);
    const [currentHandIdx, setCurrentHandIdx] = useState<number>(0);
    const localStorageRepository = new LocalStorageRepository();
    const router = useRouter();
  
    const nextHand = () => {
      if (currentHandIdx < hands.length - 1) {
        const nextIdx = currentHandIdx + 1;
        setCurrentHandIdx(currentHandIdx + 1);
        const next = hands[nextIdx];
        if (next) {
          router.push(`/hands/${next?.id}`, {scroll: true})
        }
      }
    };
  
    const prevHand = () => {
      if (currentHandIdx > 0) {
        const prevIdx = currentHandIdx - 1;
        setCurrentHandIdx(prevIdx);
        const prev = hands[prevIdx];
        if (prev) {
          router.push(`/hands/${prev?.id}`, {scroll: true})
        }
      }
    };

    const loadHand = (handId: string) => {
      const idx = hands?.findIndex((hand) => hand.id === handId);
      if (idx > -1) {
        setCurrentHandIdx(idx)
      }
    }

    useEffect(() => {
      const existingHistory = localStorageRepository.loadHandHistory('handHistory', true);
      if (existingHistory) {
        setHands(existingHistory)
        const urlHandId = window.location.pathname.split('/').pop(); // Get hand ID from URL
        if (urlHandId) {
            const idx = existingHistory.findIndex((hand) => hand.id === urlHandId);
            if (idx > -1) setCurrentHandIdx(idx);
        }
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
          loadHand,
      }}>
        {children}
      </HandContext.Provider>
    );
  }
  
  export function useHandContext() {
    return useContext(HandContext);
  }