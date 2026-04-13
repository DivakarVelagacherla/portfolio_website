export function animateCounter(targetValue: number, element: HTMLElement, duration: number) {
  const start = performance.now(); // record when animation started

  function tick(currentTime: number) {
    const elapsed = currentTime - start;
    const progress = Math.min(elapsed / duration, 1);

    const eased = 1 - Math.pow(1 - progress, 3);
    const currentValue = Math.floor(eased * targetValue);

    element.textContent = currentValue.toString();

    if (progress < 1) {
      requestAnimationFrame(tick);
    } else {
      element.textContent = targetValue.toString();
    }
  }

  requestAnimationFrame(tick);
}
