type ClickOutsideEvent = CustomEvent<void>;

export function clickOutside(node: HTMLElement, p0: () => boolean) {
  const handleClick = (event: MouseEvent) => {
    if (
      node &&
      !node.contains(event.target as Node) &&
      !event.defaultPrevented
    ) {
      node.dispatchEvent(
        new CustomEvent('click_outside', { detail: null })
      );
    }
  };

  document.addEventListener('click', handleClick, true);

  return {
    destroy() {
      document.removeEventListener('click', handleClick, true);
    }
  };
}

// Add TypeScript declaration for the custom event
declare global {
  interface HTMLElementEventMap {
    'click_outside': ClickOutsideEvent;
  }
} 