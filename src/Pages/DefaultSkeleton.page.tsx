import styled from "styled-components";
import { ReactNode } from "react";

type DefaultSkeletonProps = {
    children?: ReactNode;
};

export default function PageDefaultSkeleton({ children, }: DefaultSkeletonProps) {

    return (
        <SCPageDefaultSkeleton>
            {children}
        </SCPageDefaultSkeleton>
    );
}

const SCPageDefaultSkeleton = styled.div<{ $isInLoginPage?: boolean; }>`
    width: 100%;
    display: flex;
    flex-direction: column;
   
    background-color: ${({ theme }) => theme.colors.background} !important;
`;