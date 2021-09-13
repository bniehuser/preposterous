interface MouseCoords {
  pageX: number;
  pageY: number;
  clientX: number;
  clientY: number;
}

type MouseSubscribeCallback = (mouseInfo: MouseCoords, detach?: () => void) => void;

export const mouseEventSubscribe = (
  callback: MouseSubscribeCallback,
  onEnd: () => void,
) => {
  const onMousemoveWindow = (e: MouseEvent) => {
    callback(
      {
        pageX: e.pageX,
        pageY: e.pageY,
        clientX: e.clientX,
        clientY: e.clientY,
      },
      () => {
        onMouseupWindow();
      },
    );
  };

  const onMouseupWindow = (e?: MouseEvent) => {
    window.removeEventListener('mousemove', onMousemoveWindow);
    window.removeEventListener('mouseup', onMouseupWindow);
    window.removeEventListener('mouseleave', onMouseupWindow);
    if (onEnd) {
      onEnd();
    }
  };

  window.addEventListener('mousemove', onMousemoveWindow, false);
  window.addEventListener('mouseup', onMouseupWindow);
  window.addEventListener('mouseleave', onMouseupWindow);
};
