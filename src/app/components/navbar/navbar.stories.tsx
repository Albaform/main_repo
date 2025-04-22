// 경로: app/components/navbar/navbar.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import Navbar from './navbar';

const meta: Meta<typeof Navbar> = {
  title: 'App/Components/Navbar',
  component: Navbar,
};
export default meta;

type Story = StoryObj<typeof Navbar>;

export const Default: Story = {
  args: {
    variant: 'default',
  },
};
