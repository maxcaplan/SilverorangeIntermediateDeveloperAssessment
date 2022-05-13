import React from 'react';
// Mapping of HTML tags to react components.
// For HTML generated from ReadMe markdown

interface ElementProps {
  children: React.ReactNode;
}

export const readMeComponents = {
  h1: ({ children }: ElementProps) => (
    <>
      <p className="text-2xl font-bold">{children}</p>
      <div className="w-full border-t border-slate-300 my-3" />
    </>
  ),
  h2: ({ children }: ElementProps) => (
    <>
      <p className="text-xl font-bold">{children}</p>
      <div className="w-full border-t border-slate-300 my-3" />
    </>
  ),
  h3: ({ children }: ElementProps) => (
    <p className="text-xl font-bold">{children}</p>
  ),
  h4: ({ children }: ElementProps) => (
    <p className="text-lg font-bold">{children}</p>
  ),
  h5: ({ children }: ElementProps) => <h5 className="text-lg">{children}</h5>,
  h6: ({ children }: ElementProps) => (
    <p className="font-bold italic">{children}</p>
  ),
  p: ({ children }: ElementProps) => (
    <p className="text-gray-900">{children}</p>
  ),
  code: ({ children }: ElementProps) => (
    <code className="block bg-gray-200 text-black rounded-sm overflow-auto">
      <span className="m-3 inline-block w-auto">{children}</span>
    </code>
  ),
};
