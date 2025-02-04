
export type CustomStyles = { [key: string]: string };

export interface CustomStylesProps {
  customStyles?: CustomStyles;
}

export interface CustomStylesStyledProps {
  $customStyles?: CustomStyles;
}

export type BoxSizing = 'content-box' | 'border-box';
export type PositionType = 'relative' | 'absolute';
export type Overflow = 'visible' | 'hidden' | 'scroll' | 'auto';

export interface HTMLEvents<T extends HTMLElement> {
    onMouseOver?: (ev: React.MouseEvent<T>) => void;
    onMouseEnter?: (ev: React.MouseEvent<T>) => void;
    onMouseLeave?: (ev: React.MouseEvent<T>) => void;
    onClick?: (ev: React.MouseEvent<T>) => void;
}