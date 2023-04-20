'use client';
import React from 'react';
import { SubTree } from './components/SubTree';
import { Flow } from './components/Flow';

const originalLayout = [
  { i: '1', x: 0, y: 0, w: 2, h: 3 },
  { i: '2', x: 1, y: 0, w: 2, h: 3 },
  { i: '3', x: 2, y: 0, w: 2, h: 3 },
];

export default function Home() {
  return (
    <div className='bg-gray-50 w-screen h-screen'>
      <Flow />
      {/* <SubTree originalLayout={originalLayout} /> */}
    </div>
  );
}
