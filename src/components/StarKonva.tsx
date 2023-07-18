'use client';
import { useEffect, useRef, useState } from 'react';
import { Stage, Layer, Star, Group } from 'react-konva/lib/ReactKonvaCore';
import { getRandomColor, getRandom, randomScale } from './star-util';
import { Bezier, type Point } from 'bezier-js';
import 'konva/lib/shapes/Star';

console.log('StarKonva.tsx: loaded');

const STEP_RATIO = 0.03;

type StarConfig = {
  id: string;
  x: number;
  y: number;
  rotation?: number;
  scaleX?: number;
  scaleY?: number;
  fill: string;
  offsetX?: number;
  offsetY?: number;
};

type GroupConfig = {
  id: string;
  x: number;
  y: number;
  rotation: number;
  scaleX: number;
  scaleY: number;
  offsetX: number;
  offsetY: number;
};

type Config = [StarConfig, StarConfig, StarConfig, GroupConfig];

const WIDTH_CUTOFF = 1024;
// const WIDTH_CUTOFF = 9999;

function generateShapes(width: number, height: number): Config[] {
  const steps = Math.floor(height * STEP_RATIO);

  const mapFn = (
    idPrefix: string,
    i: number,
    point: Point
  ): [StarConfig, StarConfig, StarConfig, GroupConfig] => {
    const id = `${idPrefix}-${i}`;

    const scaleX = randomScale(0.3, 1.5);
    const scaleY = getRandom(0.6, 1.4) * scaleX;

    const lScaleX = randomScale(0.3, 0.8);
    const lScaleY = getRandom(0.7, 1.3) * lScaleX;

    const rScaleX = randomScale(0.3, 0.8);
    const rScaleY = getRandom(0.7, 1.3) * rScaleX;

    return [
      {
        id: `${id}-b`,
        x: 0,
        y: 0,
        rotation: Math.random() * 360,
        fill: getRandomColor(),
        offsetX: getRandom(-60, 60),
      },
      {
        id: `${id}-l`,
        fill: getRandomColor(),
        x: 0,
        y: 0,
        offsetX: getRandom(-120, 120),
        offsetY: getRandom(-120, 120),
        scaleX: lScaleX,
        scaleY: lScaleY,
        rotation: Math.random() * 360,
      },
      {
        id: `${id}-r`,
        fill: getRandomColor(),
        x: 0,
        y: 0,
        offsetX: getRandom(-60, 60),
        offsetY: getRandom(-60, 60),
        scaleX: rScaleX,
        scaleY: rScaleY,
        rotation: Math.random() * 360,
      },
      {
        id: `${id}-l`,
        x: point.x,
        y: point.y,
        scaleX,
        scaleY,
        rotation: Math.random() * 360,
        offsetX: getRandom(-10, 10),
        offsetY: getRandom(-10, 10),
      },
    ];
  };

  const curve1 = getCurve(steps, width, height);

  return curve1.map((point, i) => mapFn('LEFT', i, point));
}

function getCurve(steps: number, width: number, height: number) {
  let xLow: number;
  let xHigh: number;
  let xStart: number;
  let xStop: number;
  let xPointA: number;
  let xPointB: number;

  const startAtLeft = Math.random() > 0.5;

  if (width < WIDTH_CUTOFF) {
    xLow = 0;
    xHigh = width;
    xStart = 0;
    xStop = width;
    xPointA = width * 2.5;
    xPointB = 0 - width * 1.5;
  } else {
    xLow = 0;
    xHigh = width;
    xStart = getRandom(xLow, (xHigh - WIDTH_CUTOFF) / 2);
    xStop = getRandom(xHigh - (xHigh - WIDTH_CUTOFF) / 2, xHigh);
    xPointA = xHigh * 2.5;
    xPointB = 0 - xHigh * 1.5;

    // if (width > 1408) {
    //   xLow = flip ? width - (width - 1120) / 2 : 0;
    //   xHigh = flip ? width : (width - 1120) / 2;
    // } else {
    //   xLow = flip ? width - 64 : 0;
    //   xHigh = flip ? width : 64;
    // }
    // xStart = getRandom(xLow, xHigh);
    // xStop = getRandom(xLow, xHigh);
    // const xWidth = xHigh - xLow;
    // xPointA = xLow - xWidth;
    // xPointB = xHigh + xWidth;
  }

  const curve1 = new Bezier(
    { x: startAtLeft ? xStart : xStop, y: 0 },
    {
      x: startAtLeft ? xPointA : xPointB,
      y: getRandom(0, height / 2),
    },
    {
      x: startAtLeft ? xPointB : xPointA,
      y: getRandom(height / 2, height),
    },
    { x: startAtLeft ? xStop : xStart, y: height }
  );

  return curve1.getLUT(steps);
}

function ChildStar({ config }: { config: StarConfig }) {
  const savedConfig = useRef(config);
  return (
    <Star
      shadowEnabled={false}
      dashEnabled={false}
      perfectDrawEnabled={false}
      shadowForStrokeEnabled={false}
      hitStrokeWidth={0}
      listening={false}
      numPoints={5}
      innerRadius={12}
      outerRadius={24}
      strokeWidth={2}
      stroke="#292524"
      lineCap="round"
      lineJoin="round"
      {...savedConfig.current}
    />
  );
}

function AnimGroup({ config }: { config: Config }) {
  const [base, left, right, group] = config;

  return (
    <Group listening={false} {...group}>
      <ChildStar config={base} />
      <ChildStar config={left} />
      <ChildStar config={right} />
    </Group>
  );
}

export default function StarCanvas() {
  const [stars, setStars] = useState<Config[]>([]);
  const [windowSize, setWindowSize] = useState({
    width: window.document.body.offsetWidth,
    height: window.document.body.offsetHeight,
  });
  const size = useRef<{ width: number; height: number }>({
    width: window.document.body.offsetWidth,
    height: window.document.body.offsetHeight,
  });
  const oldSize = useRef<{ width: number; height: number }>({
    width: window.document.body.offsetWidth,
    height: window.document.body.offsetHeight,
  });

  useEffect(() => {
    setStars(generateShapes(size.current.width, size.current.height));

    let timeout: number;

    const interval = window.setInterval(() => {
      const height = window.document.body.offsetHeight;
      const width = window.document.body.offsetWidth;

      if (height && width) {
        if (size.current.width !== width || size.current.height !== height) {
          window.clearTimeout(timeout);
          size.current = { width, height };

          timeout = window.setTimeout(() => {
            console.log('resizing!');
            if (
              size.current.width !== oldSize.current.width ||
              size.current.height !== oldSize.current.height
            ) {
              oldSize.current = size.current;
              setStars(generateShapes(size.current.width, size.current.height));
              setWindowSize(size.current);
            }
          }, 300);
        }
      }
    }, 200);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, []);

  return (
    <div aria-hidden="true">
      <Stage
        width={windowSize.width}
        height={windowSize.height}
        listening={false}
        role="none"
      >
        <Layer listening={false}>
          {stars.map((config) => {
            return <AnimGroup config={config} key={config[3].id} />;
          })}
        </Layer>
      </Stage>
    </div>
  );
}
