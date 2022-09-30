import { ReactNode } from 'react';

export function Row(props: { children: ReactNode }) {
  return <div className="row">{props.children}</div>;
}
