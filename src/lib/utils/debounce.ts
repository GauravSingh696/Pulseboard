export function debounce<T extends (...args: never[]) => void>(
  fn: T,
  wait: number,
): ((...args: Parameters<T>) => void) & { cancel: () => void } {
  let timer: ReturnType<typeof setTimeout> | undefined;

  const wrapped = (...args: Parameters<T>) => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      fn(...args);
    }, wait);
  };

  wrapped.cancel = () => {
    if (timer) clearTimeout(timer);
  };

  return wrapped;
}
