import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import { ModuleNavigation } from '../common/ModuleNavigation';

function renderAt(path: string) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <ModuleNavigation />
    </MemoryRouter>,
  );
}

describe('ModuleNavigation', () => {
  it('shows only "Next" link on the Overview page', () => {
    renderAt('/');
    expect(screen.queryByText('Previous')).not.toBeInTheDocument();
    expect(screen.getByText('Next')).toBeInTheDocument();
    expect(screen.getByText('Component Physics')).toBeInTheDocument();
  });

  it('shows only "Previous" link on the last page', () => {
    renderAt('/interactive-lab');
    expect(screen.getByText('Previous')).toBeInTheDocument();
    expect(screen.getByText('S-Domain Theory')).toBeInTheDocument();
    expect(screen.queryByText('Next')).not.toBeInTheDocument();
  });

  it('shows both Previous and Next on a middle page', () => {
    renderAt('/circuit-analysis');
    expect(screen.getByText('Previous')).toBeInTheDocument();
    expect(screen.getByText('Component Physics')).toBeInTheDocument();
    expect(screen.getByText('Next')).toBeInTheDocument();
    expect(screen.getByText('Laplace Theory')).toBeInTheDocument();
  });

  it('renders nothing for an unknown route', () => {
    const { container } = renderAt('/unknown-route');
    expect(container.innerHTML).toBe('');
  });
});
