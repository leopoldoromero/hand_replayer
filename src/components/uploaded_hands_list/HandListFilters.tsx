'use client';
import { useState } from 'react';
import Block from '../block/Block';
import Dropdown from '../dropdown/DropDown';
import { sixMaxPositions } from '@/modules/hand/domain/hand';
import { Range } from '../range/Range';
import Text from '../text/Text';
import Toggle from '../toggle/Toggle';
import Button from '../button/Button';
import { Criteria } from '@/modules/shared/domain/criteria';
import { CriteriaFilter } from '@/modules/shared/domain/criteria_filter';

interface Props {
  filterHandsByCriteria: (criteria: Criteria) => void;
  resetFilters: () => void;
}

const HandListFilters: React.FC<Props> = ({
  filterHandsByCriteria,
  resetFilters,
}) => {
  const initialState = {
    potType: '',
    position: '',
    minPotSize: 0,
    showLosingHands: false,
  };

  const [filters, setFilters] = useState(initialState);

  const applyFilters = () => {
    const filterCriteria: Array<CriteriaFilter> = [];

    if (filters.potType !== '') {
      filterCriteria.push(new CriteriaFilter('potType', filters.potType));
    }
    if (filters.position !== '') {
      filterCriteria.push(new CriteriaFilter('position', filters.position));
    }
    if (filters.minPotSize !== 0) {
      filterCriteria.push(new CriteriaFilter('minPotSize', filters.minPotSize));
    }
    if (filters.showLosingHands) {
      filterCriteria.push(
        new CriteriaFilter('loosingHands', filters.showLosingHands)
      );
    }

    if (filterCriteria.length) {
      filterHandsByCriteria(new Criteria(filterCriteria));
    }
  };

  return (
    <Block
      display='flex'
      direction='column'
      width='100%'
      customStyles={{ maxWidth: '500px' }}
    >
      <Block
        display='flex'
        justify='space-between'
        flexWrap='wrap'
        gap='5px'
        mb='l'
        width='100%'
      >
        <Block 
          display='flex' 
          justify='center' 
          mb='m'
          customStyles={{ minWidth: '150px' }}
        >
          <Dropdown
            label='POT TYPE'
            options={['SRP', 'ROL', 'LIMPED', '3BET', 'SQUEEZE', '4BET']}
            value={filters.potType}
            onChange={(value) =>
              setFilters((prev) => ({ ...prev, potType: value }))
            }
          />
        </Block>
        <Block 
          display='flex' 
          justify='center' 
          mb='m'
          customStyles={{ minWidth: '150px' }}
        >
          <Dropdown
            label='POSITION'
            options={Object.values(sixMaxPositions)}
            value={filters.position}
            onChange={(value) =>
              setFilters((prev) => ({ ...prev, position: value }))
            }
          />
        </Block>
        <Block
          display='flex'
          direction='column'
          justify='center'
          align='flex-end'
        >
          <Range
            min={0}
            max={200}
            value={filters.minPotSize}
            onChange={(value) =>
              setFilters((prev) => ({ ...prev, minPotSize: value }))
            }
          />
          <Text>Pot size ≥ {filters.minPotSize} BB</Text>
        </Block>
        <Block
          display='flex'
          direction='column'
          justify='center'
          align='flex-start'
        >
          <Toggle
            isChecked={filters.showLosingHands}
            onToggle={() =>
              setFilters((prev) => ({
                ...prev,
                showLosingHands: !prev.showLosingHands,
              }))
            }
          />
          <Text>
            {filters.showLosingHands
              ? 'Showing only losing hands'
              : 'Showing all hands'}
          </Text>
        </Block>
      </Block>
      <Block display='flex' justify='space-evenly' mb='m'>
        <Button
          variant='default'
          size='m'
          text='Apply filters'
          color='green'
          onClick={applyFilters}
        />
        <Button
          variant='default'
          size='l'
          text='Reset filters'
          color='green'
          onClick={() => {
            setFilters(initialState);
            resetFilters();
          }}
        />
      </Block>
    </Block>
  );
};

export default HandListFilters;
