import React, {
  Children,
  cloneElement,
  forwardRef,
  isValidElement,
  useMemo,
  useEffect,
  useRef
} from 'react';
import gsap from 'gsap';

export const Card = forwardRef(({ customClass, ...rest }, ref) => (
  <div
    ref={ref}
    {...rest}
    className={`absolute top-1/2 left-1/2 [transform-style:preserve-3d] [will-change:transform] [backface-visibility:hidden] ${customClass ?? ''} ${rest.className ?? ''}`.trim()}
  />
));
Card.displayName = 'Card';

const makeSlot = (i, distX, distY, total) => {
  const offsetX = -((total - 1) * distX) / 2;
  const offsetY = ((total - 1) * distY) / 2;
  return {
    x: offsetX + i * distX,
    y: offsetY - i * distY,
    z: -i * distX * 1.5,
    zIndex: total - i
  };
};

const placeNow = (el, slot, skew) =>
  gsap.set(el, {
    x: slot.x,
    y: slot.y,
    z: slot.z,
    xPercent: -50,
    yPercent: -50,
    skewY: skew,
    transformOrigin: 'center center',
    zIndex: slot.zIndex,
    force3D: true
  });

const CardSwap = ({
  width = 500,
  height = 400,
  cardDistance = 60,
  verticalDistance = 70,
  autoPlay = false,
  delay = 5000,
  pauseOnHover = false,
  onCardClick,
  skewAmount = 0,
  easing = 'elastic',
  children
}) => {
  const config =
    easing === 'elastic'
      ? {
          ease: 'elastic.out(0.6,0.9)',
          durDrop: 1.5,
          durMove: 1.5,
          durReturn: 1.5,
          promoteOverlap: 0.9,
          returnDelay: 0.05
        }
      : {
          ease: 'power1.inOut',
          durDrop: 0.8,
          durMove: 0.8,
          durReturn: 0.8,
          promoteOverlap: 0.45,
          returnDelay: 0.2
        };

  const childArr = useMemo(() => Children.toArray(children).filter(isValidElement), [children]);
  const refs = useMemo(() => childArr.map(() => React.createRef()), [childArr.length]);

  const order = useRef(Array.from({ length: childArr.length }, (_, i) => i));

  const tlRef = useRef(null);
  const intervalRef = useRef(0);
  const container = useRef(null);
  const isAnimating = useRef(false);

  useEffect(() => {
    const total = refs.length;
    refs.forEach((r, i) => {
      if (r.current) {
        placeNow(r.current, makeSlot(i, cardDistance, verticalDistance, total), skewAmount);
      }
    });
  }, [cardDistance, verticalDistance, skewAmount, refs]);

  const swap = () => {
    if (order.current.length < 2) return;
    if (isAnimating.current) return;
    isAnimating.current = true;

    const [front, ...rest] = order.current;
    if (!refs[front] || !refs[front].current) {
      isAnimating.current = false;
      return;
    }
    const elFront = refs[front].current;
    
    const tl = gsap.timeline({
      onComplete: () => {
        isAnimating.current = false;
      }
    });
    tlRef.current = tl;

    tl.to(elFront, {
      y: '+=500',
      duration: config.durDrop,
      ease: config.ease
    });

    tl.addLabel('promote', `-=${config.durDrop * config.promoteOverlap}`);
    rest.forEach((idx, i) => {
      if (!refs[idx] || !refs[idx].current) return;
      const el = refs[idx].current;
      const slot = makeSlot(i, cardDistance, verticalDistance, refs.length);
      tl.set(el, { zIndex: slot.zIndex }, 'promote');
      tl.to(
        el,
        {
          x: slot.x,
          y: slot.y,
          z: slot.z,
          duration: config.durMove,
          ease: config.ease
        },
        `promote+=${i * 0.15}`
      );
    });

    const backSlot = makeSlot(refs.length - 1, cardDistance, verticalDistance, refs.length);
    tl.addLabel('return', `promote+=${config.durMove * config.returnDelay}`);
    tl.call(
      () => {
        gsap.set(elFront, { zIndex: backSlot.zIndex });
      },
      undefined,
      'return'
    );
    tl.to(
      elFront,
      {
        x: backSlot.x,
        y: backSlot.y,
        z: backSlot.z,
        duration: config.durReturn,
        ease: config.ease
      },
      'return'
    );

    tl.call(() => {
      order.current = [...rest, front];
    });
  };

  const swapPrev = () => {
    if (order.current.length < 2) return;
    if (isAnimating.current) return;
    isAnimating.current = true;

    const currentOrder = [...order.current];
    const back = currentOrder[currentOrder.length - 1];
    const others = currentOrder.slice(0, -1);

    if (!refs[back] || !refs[back].current) {
      isAnimating.current = false;
      return;
    }
    const elBack = refs[back].current;

    const tl = gsap.timeline({
      onComplete: () => {
        isAnimating.current = false;
      }
    });
    tlRef.current = tl;

    tl.to(elBack, {
      y: '+=500',
      duration: config.durDrop,
      ease: config.ease
    });

    tl.addLabel('demote', `-=${config.durDrop * config.promoteOverlap}`);
    others.forEach((idx, i) => {
      if (!refs[idx] || !refs[idx].current) return;
      const el = refs[idx].current;
      const slot = makeSlot(i + 1, cardDistance, verticalDistance, refs.length);
      tl.set(el, { zIndex: slot.zIndex }, 'demote');
      tl.to(
        el,
        {
          x: slot.x,
          y: slot.y,
          z: slot.z,
          duration: config.durMove,
          ease: config.ease
        },
        `demote+=${i * 0.15}`
      );
    });

    const frontSlot = makeSlot(0, cardDistance, verticalDistance, refs.length);
    tl.addLabel('return', `demote+=${config.durMove * config.returnDelay}`);
    tl.call(
      () => {
        gsap.set(elBack, { zIndex: frontSlot.zIndex });
      },
      undefined,
      'return'
    );
    tl.to(
      elBack,
      {
        x: frontSlot.x,
        y: frontSlot.y,
        z: frontSlot.z,
        duration: config.durReturn,
        ease: config.ease
      },
      'return'
    );

    tl.call(() => {
      order.current = [back, ...others];
    });
  };

  useEffect(() => {
    if (autoPlay && delay > 0) {
      intervalRef.current = window.setInterval(swap, delay);

      if (pauseOnHover && container.current) {
        const node = container.current;
        const pause = () => {
          if (tlRef.current) tlRef.current.pause();
          clearInterval(intervalRef.current);
        };
        const resume = () => {
          if (tlRef.current) tlRef.current.play();
          intervalRef.current = window.setInterval(swap, delay);
        };
        node.addEventListener('mouseenter', pause);
        node.addEventListener('mouseleave', resume);
        return () => {
          node.removeEventListener('mouseenter', pause);
          node.removeEventListener('mouseleave', resume);
          clearInterval(intervalRef.current);
        };
      }
      return () => clearInterval(intervalRef.current);
    }
  }, [autoPlay, delay, pauseOnHover]);

  const handleNext = () => {
    swap();
  };

  const handlePrev = () => {
    swapPrev();
  };

  const rendered = childArr.map((child, i) =>
    cloneElement(child, {
      key: i,
      ref: refs[i],
      style: { width, height, ...(child.props.style ?? {}) },
      onClick: e => {
        child.props.onClick?.(e);
        onCardClick?.(i);
      }
    })
  );

  return (
    <div className="flex flex-col items-center w-full">
      <div
        ref={container}
        className="relative mx-auto origin-center perspective-[900px] overflow-visible"
        style={{ width, height }}
      >
        {rendered}
      </div>

      {/* Navigation Controls */}
      <div className="flex items-center gap-6 mt-10 select-none">
        <button
          onClick={handlePrev}
          className="border-2 border-black bg-[#046bd2] text-white p-3 hover:bg-[#0352a2] transition-all shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-[1px] active:translate-y-[1px] active:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] rounded-none flex items-center justify-center cursor-pointer"
          aria-label="Previous Testimonial"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={handleNext}
          className="border-2 border-black bg-[#e03131] text-white p-3 hover:bg-[#bd2424] transition-all shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-[1px] active:translate-y-[1px] active:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] rounded-none flex items-center justify-center cursor-pointer"
          aria-label="Next Testimonial"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default CardSwap;
