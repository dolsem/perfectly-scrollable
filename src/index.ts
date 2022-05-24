import PerfectScrollbar from 'perfect-scrollbar';
import 'perfect-scrollbar/css/perfect-scrollbar.css';
import { Component, createComponent, JSX, mergeProps, onMount, splitProps } from 'solid-js';
import { template, spread } from 'solid-js/web';

const localProps = [
  'ref',
  'handlers',
  'maxScrollbarLength',
  'minScrollbarLength',
  'scrollingThreshold',
  'scrollXMarginOffset',
  'scrollYMarginOffset',
  'suppressScrollX',
  'suppressScrollY',
  'swipeEasing',
  'useBothWheelAxes',
  'wheelPropagation',
  'wheelSpeed',
] as Array<keyof PerfectScrollbar.Options|'ref'>;

const templates = Object.create(null) as Record<string, Element>;
const cache = new WeakMap<Component<any>|Element, Component<any>>();

type PropsWithRef = { ref?: JSX.IntrinsicAttributes['ref'] };

export function PerfectlyScrollable<P extends PropsWithRef, T extends keyof JSX.IntrinsicElements>(component: Component<P>): Component<P&PerfectScrollbar.Options>;
export function PerfectlyScrollable<P extends PropsWithRef, T extends keyof JSX.IntrinsicElements>(component: T): Component<P&JSX.IntrinsicElements[T]>;
export function PerfectlyScrollable<P extends PropsWithRef, T extends keyof JSX.IntrinsicElements>(
  component: Component<P>|T
) {
    let element = typeof component === 'string' && templates[component];
    if (typeof element === 'undefined') {
      element = template(`<${component}></${component}>`, 2);
      templates[component as string] = element;
    }
    const derivedComponent = element || (component as Component<P>);

    let wrappedComponent = cache.get(derivedComponent);
    if (!wrappedComponent) {
      wrappedComponent = (props: P&PerfectScrollbar.Options) => {
        let ref: any;
        const [local, others] = splitProps(props, localProps);
        const { ref: passedRef, ...scrollbarOptions } = local;
        const newProps = mergeProps({
          ref: (element: any) => {
            ref = element;
            if (typeof passedRef === 'function') passedRef(element);
          }
        }, others);

        onMount(() => {
          new PerfectScrollbar(ref, scrollbarOptions);
        });
        if (typeof component === 'string') {
          const el = (element as Element).cloneNode(true) as Element;
          spread(el, newProps, false, false);
          return el;
        }
        return createComponent(component, newProps as any);
      }

      cache.set(derivedComponent, wrappedComponent);
    }

    return wrappedComponent;
  };
