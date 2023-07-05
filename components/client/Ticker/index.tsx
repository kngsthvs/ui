/**
 * @tutorial https://14islands.com/blog/interactive-marquee-with-framer-motion/
 */

import {
  motion,
  useMotionValue,
  useSpring,
  type MotionProps,
  type SpringOptions,
} from "framer-motion";
import normalizeWheel from "normalize-wheel";
import { Children, cloneElement, useEffect, useRef, useState } from "react";
import { useRafLoop } from "react-use";
import { generateKey, mapDataAttributes } from "../../../functions";
import { useMeasureDirty } from "../../../functions/client";

export type Direction = "down" | "left" | "right" | "up";

export function Ticker({
  children,
  config = {
    damping: 45,
    mass: 5,
    stiffness: 90,
  },
  direction = "left",
  drag,
  dragFactor = 1.2,
  gap = 0,
  mask = 0,
  source = 1,
  threshold = 0.014,
  wheel,
  wheelFactor = 1.8,
  ...props
}: React.PropsWithChildren<
  (Omit<React.HTMLProps<HTMLDivElement>, "ref"> & MotionProps) & {
    config?: SpringOptions;
    direction?: Direction;
    drag?: boolean;
    dragFactor?: number;
    gap?: number;
    mask?: number;
    source?: number;
    threshold?: number;
    wheel?: "element" | "window";
    wheelFactor?: number;
  }
>) {
  const data = mapDataAttributes({ drag, wheel });
  const dragging = useRef(false);
  const innerRef = useRef(null);
  const innerRect = useMeasureDirty(innerRef);
  const translate = useMotionValue(0);
  const itemRect = useRef({ height: 0, width: 0 });
  const itemRef = useRef([]);
  const offset = useRef(0);
  const ref = useRef(null);
  const rect = useMeasureDirty(ref);
  const scrolling = useRef(false);
  const wheeling = useRef<NodeJS.Timeout>();
  const spring = useSpring(source, config);
  const [count] = useState(Children.count(children));

  const axis = direction === "left" || direction === "right" ? "x" : "y";
  const aspect = axis === "y" ? "height" : "width";
  // The number of items needed to fill the scren
  const items =
    rect && itemRect.current[aspect]
      ? Math.ceil(rect[aspect] / itemRect.current[aspect]) * 3
      : 1;
  // The difference between the inner li elements and the outer ul element
  const difference = Math.ceil(
    innerRect[aspect] / (itemRect.current[aspect] + gap)
  );
  // Total distance the ticker needs to travel
  const distance = (itemRect.current[aspect] + (gap * count - 1)) * difference;

  const dragProps = drag
    ? {
        onDrag: (event, info) => {
          spring.set(
            dragFactor *
              (direction === "down" || direction === "right"
                ? info.delta[axis]
                : -info.delta[axis])
          );
        },
        onDragEnd: () => {
          dragging.current = false;
          ref.current.setAttribute("data-dragging", false);
          offset.current = source;
        },
        onDragStart: () => {
          dragging.current = true;
          ref.current.setAttribute("data-dragging", true);
          spring.set(0);
        },
      }
    : {};

  const wheelProps =
    wheel === "element"
      ? {
          onWheel: (event) => {
            const normalized = normalizeWheel(event);

            offset.current = normalized.pixelY * wheelFactor;

            window.clearTimeout(wheeling.current);
            wheeling.current = setTimeout(() => spring.set(source), 30);
          },
        }
      : {};

  useEffect(() => {
    if (!wheel) return;

    ref.current.addEventListener("wheel", () => (scrolling.current = true));

    return () =>
      ref.current?.removeEventListener(
        "wheel",
        () => (scrolling.current = false)
      );
  }, [ref.current, wheel]);

  useEffect(() => {
    itemRef.current?.map((item) => {
      itemRect.current.height += item.clientHeight;
      itemRect.current.width += item.clientWidth;
    });
  }, [itemRef.current]);

  // Drag
  useRafLoop(() => {
    if (dragging.current || Math.abs(offset.current) < threshold) return;

    offset.current *= 0.66;

    if (offset.current < 0) {
      offset.current = Math.min(offset.current, 0);
    } else {
      offset.current = Math.max(offset.current, 0);
    }

    spring.set(source + offset.current);
  }, true);

  // Offset
  useRafLoop(() => {
    translate.set(
      direction === "down" || direction === "right"
        ? translate.get() + spring.get()
        : translate.get() - spring.get()
    );

    if (translate.get() <= -distance) translate.set(0);
    if (translate.get() > 0) translate.set(-distance);
  }, true);

  // Scroll
  // useRafLoop(() => {
  //   if (dragging.current || Math.abs(offset.current) < threshold) return;

  //   offset.current *= 0.66;

  //   if (offset.current < 0) {
  //     offset.current = Math.min(offset.current, 0);
  //   } else {
  //     offset.current = Math.max(offset.current, 0);
  //   }

  //   spring.set(source + offset.current);
  // }, true);

  const Child = (props) => (
    <>
      {Children.map(children, (child, index) => (
        <li ref={(element) => itemRef.current.push(element)} {...props}>
          {cloneElement(child as React.ReactElement)}
        </li>
      ))}
    </>
  );

  return (
    <motion.section
      data-dragging={drag ? (dragging.current ? true : false) : undefined}
      data-scrolling={wheel ? (scrolling.current ? true : false) : undefined}
      drag={drag ? axis : undefined}
      dragConstraints={{ bottom: 0, left: 0, right: 0, top: 0 }}
      dragElastic={0.0000001}
      style={{
        display: "flex",
        height: "100%",
        justifyContent: "center",
        margin: 0,
        maxHeight: "100vh",
        maxWidth: "100vw",
        overflow: "hidden",
        padding: 0,
        placeItems: "center",
        width: "100%",
        WebkitMaskImage: `linear-gradient(to ${
          axis === "x" ? "right" : "top"
        }, rgba(0, 0, 0, 0) 0%, rgb(0, 0, 0) ${mask}%, rgb(0, 0, 0) ${
          100 - mask
        }%, rgba(0, 0, 0, 0) 100%)`,
      }}
      {...{ ref, ...dragProps, ...wheelProps, ...data, ...props }}
    >
      <motion.ul
        ref={innerRef}
        style={{
          [axis]: translate,
          display: "flex",
          flexDirection: axis === "y" ? "column" : "row",
          gap,
          listStyleType: "none",
          margin: 0,
          maxHeight: "100vh",
          maxWidth: "100vw",
          padding: 0,
          placeItems: "center",
          position: "relative",
          textIndent: "none",
          transform: "translateX(0px)",
          willChange: "transform",
        }}
      >
        {[...Array(items)].map((item, index) => (
          <Child
            aria-hidden={index > 0 ? "true" : undefined}
            key={generateKey(index)}
            // style={index > 0 ? { display: "contents" } : undefined}
          />
        ))}
      </motion.ul>
    </motion.section>
  );
}
