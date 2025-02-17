'use client';
import { Hand, positionNumberToName } from '@/modules/hand/domain/hand';
import { LocalStorageRepository } from '@/modules/shared/infrastructure/local_storage.repository';
import { createContext, useState, useContext, useEffect } from 'react';
import { useRouter } from "next/navigation";
import { Criteria } from '@/modules/shared/domain/criteria';
interface HandContextState {
    currentHandIdx: number;
    setCurrentHandIdx: (idx: number) => void;
    hands: Array<Hand>;
    setHands: (newHands: Array<Hand>) => void;
    nextHand: () => void;
    prevHand: () => void;
    currentHand: Hand | null;
    loadHand: (id: string) => void;
    filterHandsByCriteria: (criteria: Criteria) => void;
    loadHands: () => void;
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
    filterHandsByCriteria: () => {},
    loadHands: () => {},
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

    const loadHands = () => {
      const existingHistory = localStorageRepository.loadHandHistory('handHistory', true);
      if (existingHistory) {
        setHands(existingHistory)
      } 
    }

    const filterHandsByCriteria = (criteria: Criteria) => {
      const filterHands: Array<Hand> = [];
      criteria.filters?.forEach((filter) => {
        switch(filter.field) {
          case "potType":
            filterHands.push(...hands.filter((hand) => hand.potType === filter.value));
          case "position":            
            filterHands.push(...hands.filter((hand) => {
              const position = positionNumberToName(hand.hero?.seat, hand.tableType === '6-max');
              return position === filter.value;
            }));
          case "minPotSize":            
            filterHands.push(...hands.filter((hand) => (hand.potAmount / hand.bb) >= (filter.value as number)));
          case "loosingHands":            
            filterHands.push(...hands.filter((hand) => hand.looser?.name === hand.hero.nick))
          default:
            break;
        }
      })
      setHands(filterHands);
    }

    useEffect(() => {
      const existingHistory = localStorageRepository.loadHandHistory('handHistory', true);
      if (existingHistory) {
        setHands(existingHistory)
        const urlHandId = window.location.pathname.split('/').pop();
        if (urlHandId) {
            const idx = existingHistory.findIndex((hand: Hand) => hand.id === urlHandId);
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
          filterHandsByCriteria,
          loadHands,
      }}>
        {children}
      </HandContext.Provider>
    );
  }
  
  export function useHandContext() {
    return useContext(HandContext);
  }