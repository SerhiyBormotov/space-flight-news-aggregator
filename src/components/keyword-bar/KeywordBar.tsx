import {useState} from 'react';
import {Input, InputAdornment} from '@mui/material';
import { useDispatch } from 'react-redux/es/exports';
import { setKeywords } from './keywordBarSlice';

import './keyword-bar.scss';

const SearchIcon = () => {
    return(
        <svg className = "keyword-bar__icon" width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g filter="url(#filter0_d_466_530)">
                <path d="M19.7832 14.3911L24 18.6069L22.6069 20L18.3911 15.7832C16.8224 17.0407 14.8713 17.7246 12.8609 17.7218C7.96968 17.7218 4 13.7521 4 8.86088C4 3.96968 7.96968 0 12.8609 0C17.7521 0 21.7218 3.96968 21.7218 8.86088C21.7246 10.8713 21.0407 12.8224 19.7832 14.3911ZM17.8082 13.6605C19.0577 12.3756 19.7555 10.6532 19.7527 8.86088C19.7527 5.05267 16.6681 1.96909 12.8609 1.96909C9.05267 1.96909 5.96909 5.05267 5.96909 8.86088C5.96909 12.6681 9.05267 15.7527 12.8609 15.7527C14.6532 15.7555 16.3756 15.0577 17.6605 13.8082L17.8082 13.6605Z" fill="#575757"/>
            </g>
            <defs>
                <filter id="filter0_d_466_530" x="0" y="0" width="28" height="28" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                    <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                    <feOffset dy="4"/>
                    <feGaussianBlur stdDeviation="2"/>
                    <feComposite in2="hardAlpha" operator="out"/>
                    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_466_530"/>
                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_466_530" result="shape"/>
                </filter>
            </defs>
        </svg>
    )
}


const KeyWordBar= () => {
    const [inputText, setInputText] = useState<string>("");
    const dispatch = useDispatch();

    const handleKeywordChange = (event:React.ChangeEvent<HTMLInputElement>):void => {
        const inputText: string = event.target.value;
        setInputText(inputText);
        dispatch(setKeywords(inputText));
        
    };

    const handleKeyDown = (event:React.KeyboardEvent<HTMLInputElement>):void => {
        if (event.key === "Enter") {
            event.preventDefault();            
        }
    };

    return (
        <div className="keyword-bar">
            <div className="keyword-bar__title">Filter by keywords</div>
            <form >
                <Input
                sx ={{
                    height: 50,
                    boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
                    maxWidth: 600,
                    borderRadius: "5px",
                    border: "1px solid #EAEAEA",
                    padding: "10px 20px",
                    color: "#575757"                    
                }}
                value = {inputText}
                onChange = {handleKeywordChange}
                onKeyDown = {handleKeyDown}
                disableUnderline={true}
                fullWidth={true} 
                placeholder="Enter keywords"
                startAdornment = {
                    <InputAdornment position="start">
                            <SearchIcon />
                    </InputAdornment>
                    }
                
                />
                
            </form>
        </div>
    )
};

export default KeyWordBar;