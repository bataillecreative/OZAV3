import { useEffect, useRef } from 'react';

interface UseDialogOptions {
  open: boolean;
  onClose: () => void;
  /** Element to focus when the dialog opens. Defaults to the first focusable. */
  initialFocusRef?: React.RefObject<HTMLElement | null>;
  /** Element to return focus to on close. */
  returnFocusRef?: React.RefObject<HTMLElement | null>;
  /** Selectors to mark `inert` while the dialog is open. Pass parent siblings. */
  inertSelectors?: string[];
}

const FOCUSABLE = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled]):not([type="hidden"])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(',');

/**
 * Wires up the standard dialog a11y patterns on a container element:
 *   · auto-focus an element inside the dialog on open
 *   · Escape closes
 *   · Tab loops within the dialog (focus trap)
 *   · on close, return focus to the trigger
 *   · marks sibling regions `inert` while open so screen readers and Tab
 *     skip them (replaces fragile aria-hidden + tabIndex juggling)
 *
 * Return the ref on the dialog container.
 *
 * NOTE: only `open` is included in the effect deps on purpose. The other
 * options are held in a ref so changing object identity each render does
 * not retrigger inert toggling and re-focusing.
 */
export function useDialog<T extends HTMLElement>(opts: UseDialogOptions) {
  const containerRef = useRef<T | null>(null);
  const optsRef = useRef(opts);
  optsRef.current = opts;

  useEffect(() => {
    if (!opts.open) return;
    const container = containerRef.current;
    if (!container) return;

    const { onClose, initialFocusRef, returnFocusRef, inertSelectors } = optsRef.current;

    // Mark siblings inert so AT and Tab skip them. Use the DOM property
    // (not setAttribute) so React 19's empty-string-boolean-attribute warning
    // doesn't fire on the managed siblings.
    const inerted: HTMLElement[] = [];
    if (inertSelectors) {
      for (const sel of inertSelectors) {
        for (const node of document.querySelectorAll<HTMLElement>(sel)) {
          if (node === container || container.contains(node)) continue;
          if (!node.inert) {
            node.inert = true;
            inerted.push(node);
          }
        }
      }
    }

    // Move focus inside the dialog.
    const target =
      initialFocusRef?.current ??
      container.querySelector<HTMLElement>(FOCUSABLE) ??
      container;
    const rafId = requestAnimationFrame(() => target.focus());

    // Escape closes. Tab loops inside.
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.stopPropagation();
        onClose();
        return;
      }
      if (e.key !== 'Tab') return;
      const focusables = Array.from(
        container.querySelectorAll<HTMLElement>(FOCUSABLE),
      ).filter((el) => !el.hasAttribute('disabled') && el.offsetParent !== null);
      if (focusables.length === 0) {
        e.preventDefault();
        return;
      }
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      const active = document.activeElement as HTMLElement | null;
      if (e.shiftKey && (active === first || !container.contains(active))) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && active === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener('keydown', onKeyDown);

    return () => {
      cancelAnimationFrame(rafId);
      document.removeEventListener('keydown', onKeyDown);
      for (const node of inerted) node.inert = false;
      returnFocusRef?.current?.focus();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [opts.open]);

  return containerRef;
}
