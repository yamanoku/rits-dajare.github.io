import { FC } from 'react';

export const Heading: FC<{ headingLevel?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' }> =
  ({ children, headingLevel: TagName = 'h2' }) => (
    <TagName className="border-b-2 border-ritsumei dark:border-current text-2xl font-bold mt-4 mb-2">
      {children}
    </TagName>
  );
