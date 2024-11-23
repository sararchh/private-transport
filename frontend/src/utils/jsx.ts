export const IfRender = ({ condition, children }: {
  condition: boolean;
  children: React.ReactNode;
}) => condition ? children : null;

export const MapRender = <T>({ items, render } : {
  items: T[];
  render: (item: T, index: number) => React.ReactNode;
}) => items.map((item, index) => render(item, index)); 