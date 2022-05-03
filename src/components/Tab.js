import React from "react";
import { useMyContextState } from '../context';
import MarkDown from './MarkDown';

export default function Tab() {
  const state = useMyContextState();
  return (
    <div
      style={{
        border: "#AAA 1px solid",
        overflow: 'auto',
        width: '100%',
        height: '100%',
        padding: 10,
        boxSizing: 'border-box',
        display: 'flex',
      }}
    >
      <MarkDown />
      
      {/* <pre>{JSON.stringify(ast, null, 2)}</pre> */}
      <div style={{ flex: 1}}>
        { state.key1 } 
      </div>
      <div style={{ flex: 1}}>
        key: { state.key1 } 
      </div>
    </div>
  );
}

