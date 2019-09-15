import React, { useEffect, useState } from "react";
import { Animate } from "react-move";

interface IAnimatedProgressProviderProps {
    duration: number;
    children: any;
    easingFunction(normalizedTime: number): number;
}

const AnimatedProgressProvider: React.FC<IAnimatedProgressProviderProps> = (props: IAnimatedProgressProviderProps) => {
    const { duration, children, easingFunction } = props;

    return (
        <Animate
            start={() => ({
                value: 0
            })}
            update={() => ({
                value: 100,
                timing: {
                    duration: duration * 10000,
                    ease: easingFunction
                }
            })}
        >
            {({ value }) => children(value)}
        </Animate>
    );
};

export default AnimatedProgressProvider;
