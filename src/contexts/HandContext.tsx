'use client';
import { Hand } from '@/modules/hand/domain/hand';
import { MockHistoryParserApiClient } from '@/modules/shared/infrastructure/mock_history_parser_api_client';
import { createContext, useState, useContext, useEffect } from 'react';


interface HandContextState {
    currentHandIdx: number;
    hands: Array<Hand>;
    setHands: (newHands: Array<Hand>) => void;
    nextHand: () => void;
    prevHand: () => void;
    currentHand: Hand | null;
}

export const HandContext = createContext<HandContextState>({
    currentHandIdx: 0,
    hands: [],
    setHands: () => {},
    nextHand: () => {},
    prevHand: () => {},
    currentHand: null,
});

export function HandContextProvider({ children }: { children: React.ReactNode }) {
    const [hands, setHands] = useState<Array<Hand>>([]);
    const [currentHandIdx, setCurrentHandIdx] = useState<number>(0);
  
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

    useEffect(() => {
        const mockParser = new MockHistoryParserApiClient()
        setHands(mockParser.getMockData())
    }, [])
  
    return (
      <HandContext.Provider value={{ 
          currentHandIdx, 
          hands, 
          setHands, 
          nextHand, 
          prevHand, 
          currentHand: hands[currentHandIdx],
      }}>
        {children}
      </HandContext.Provider>
    );
  }
  
  export function useHandContext() {
    return useContext(HandContext);
  }