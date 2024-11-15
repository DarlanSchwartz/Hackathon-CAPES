import { styled } from 'styled-components';


export default function Toggle({ value, setValue }: { value: boolean, setValue: (value: boolean) => void; }) {
    return (
        <DarkButton open={value} on={value.toString()}>
            <div className='slider' onClick={() => setValue(!value)}>
                <div className="slider-btn"></div>
            </div>
        </DarkButton>
    );
}

const DarkButton = styled.button<{ open: boolean, on: string; }>`
    background-color: transparent;
    border: 0;
    border-radius: 5px;
    cursor: auto;
    transition: all 200ms;
    .slider{
        width: 40px;
        height: 28px;
        border-radius: 20px;
        background-color: ${({ theme }) => theme.colors.lightPink2};
        display: flex;
        align-items: center;
        position: relative;
        cursor: pointer;
        transition: all 200ms;
        border: 2px solid ${({ on, theme }) => on == 'true' ? '#645FC6' : theme.colors.toggleBtnBackground};

    
    }

    .slider-btn{
        width: 14px;
        height: 14px;

        position: absolute;
        left: ${(props) => props.on == 'true' ? '20px' : '2px'};
        top: 5px;

        border-radius: 50%;
        background-color:${({ theme }) => theme.colors.toggleBtnBackground};
        cursor: pointer;
        
        transition: all 200ms;
    }
`;